/**
 * Kelas Router mengelola routing untuk aplikasi,
 * termasuk penanganan navigasi, pengaturan rute, dan pencocokan rute.
 */
class Router {
    /**
     * Mengatur rute yang diberikan dan membuat regex untuk pencocokan.
     *
     * @static
     * @param {Array<Object>} routes - Daftar rute yang akan diatur.
     * @param {Object|null} parent - Rute induk untuk menentukan path relatif.
     */
    static set(routes = [], parent = null) {
        for (const route of routes) {
            route.parent = parent;
            route.path = ((parent?.path || "") + "/" + route.path).replace(/\/+/g, "/");
            route.regex = new RegExp("^" + route.path.replace(/:(\w+)/g, "(?<$1>[^/]+)").replace(/\*/, "(?:.*)") + "(?:/?$)", "i");

            if (route?.children) this.set(route.children, route);
        }
    }

    /**
     * Mendapatkan rute berdasarkan path yang diberikan.
     *
     * @static
     * @param {string} path - Path yang ingin dicocokkan dengan rute.
     * @param {Array<Object>} routes - Daftar rute untuk dicocokkan (default adalah rute yang terdaftar).
     * @param {Array<Object>} stacks - Tumpukan rute yang telah dicocokkan sebelumnya.
     * @returns {Object|null} Rute yang cocok atau null jika tidak ada.
     */
    static get(path = "/", routes = this.routes, stacks = []) {
        for (const route of routes) {
            const match = path.match(route.regex);

            if (match) {
                route.params = { ...match?.groups };
                route.stacks = [...stacks, route];
                return route;
            }

            if (route?.children) {
                const result = this.get(path, route.children, [...stacks, route]);

                if (result) return result;
            }
        }
    }

    /**
     * Menangani navigasi saat elemen dengan atribut routerLink diklik.
     *
     * @static
     * @param {Event} event - Event yang dihasilkan dari klik.
     */
    static handleNavigate(event) {
        const element = event.target.closest("[routerLink]");

        if (element) {
            event.preventDefault();
            const routerLink = element.getAttribute("routerLink");
            window.history.pushState({}, "", routerLink);
        }
    }

    /**
     * Mengambil pathname dari URL saat ini.
     *
     * @static
     * @returns {string} Pathname dari URL saat ini.
     */
    static get pathname() {
        return window.location.pathname;
    }

    /**
     * Menangani navigasi berdasarkan pathname saat ini.
     *
     * @static
     * @param {Event} event - Event yang dihasilkan dari navigasi.
     */
    static async handleNavigation(event) {
        const route = this.get(this.pathname);

        if (this.controller && !this.controller.signal.aborted) this.controller.abort();

        if (!this.controller || (this.controller && this.controller.signal.aborted)) this.controller = new AbortController();

        for (const stack of route.stacks) {
            if (stack.beforeLoad) {
                try {
                    await new Promise((resolve, reject) => {
                        const next = (err) => {
                            this.controller.signal.removeEventListener("abort", next);

                            if (err) reject(err);
                            else resolve();
                        };
                        this.controller.signal.addEventListener("abort", next);
                        stack.beforeLoad(next);
                    });
                } catch (error) {
                    break;
                }
            }

            if (!stack.component) stack.component = await stack.load();
            const container = stack.parent?.component || document.body;
            const outlet = await new Promise((resolve, reject) => {
                let target = stack.outlet ? document.body : container;
                let selector = stack.outlet ? `my-outlet[name="${stack.outlet}"]` : "my-outlet";
                let outlet;
                let observer;
                const callback = () => {
                    outlet = target.querySelector(selector);

                    if (outlet) {
                        if (observer) observer.disconnect();
                        resolve(outlet);
                    }
                };
                observer = new MutationObserver(callback);
                observer.observe(target, { childList: true, subtree: true });
                callback();
            });

            if (!stack.component.isConnected) {
                outlet.parentElement.insertBefore(stack.component, outlet.nextElementSibling);
                stack.component.isComponent = true;
            }
            const outlets = [...document.querySelectorAll("my-outlet")];

            for (const outlet of outlets) {
                let nextElement = outlet.nextElementSibling;
                while (nextElement) {
                    if (!route.stacks.find((stack) => stack.component === nextElement) && nextElement.isComponent && !outlets.find((outlet) => outlet === nextElement)) nextElement.remove();
                    nextElement = nextElement.nextElementSibling;
                }
            }
        }
    }

    /**
     * Menginisialisasi router dengan rute yang diberikan dan menambahkan listener untuk navigasi.
     *
     * @static
     * @param {Array<Object>} routes - Daftar rute yang akan diatur.
     */
    static init(routes = []) {
        this.routes = routes;
        this.set(this.routes);
        const pushState = window.history.pushState;
        window.history.pushState = function () {
            pushState.apply(this, arguments);
            const event = new CustomEvent("popstate", { bubbles: true, cancelable: true, detail: {} });
            window.dispatchEvent(event);
        };
        window.addEventListener("click", this.handleNavigate.bind(this));
        window.addEventListener("DOMContentLoaded", this.handleNavigation.bind(this));
        window.addEventListener("popstate", this.handleNavigation.bind(this));
    }
}

export { Router };
