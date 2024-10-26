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

    static navigate(url) {
        if (this.historyApiFallback) {
            window.history.pushState({}, "", url);
        } else {
            window.location.hash = url;
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
            const url = element.getAttribute("routerLink");
            Router.navigate(url);
        }
    }

    /**
     * Mengambil pathname dari URL saat ini.
     *
     * @static
     * @returns {string} Pathname dari URL saat ini.
     */
    static get pathname() {
        if (this.historyApiFallback) {
            return window.location.pathname;
        } else {
            return window.location.hash.replace(/^#/, "").replace(/\?.*?$/, "") || "/";
        }
    }

    /**
     * Menangani navigasi berdasarkan pathname saat ini.
     *
     * @static
     * @param {Event} event - Event yang dihasilkan dari navigasi.
     */
    static async handleNavigation() {
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
                    console.error(error);
                    break;
                }
            }

            if (!stack.component) stack.component = await stack.load();
            const container = stack.parent?.component || document.body;
            const outlet = await new Promise((resolve) => {
                const target = stack.outlet ? document.body : container;
                const selector = stack.outlet ? `md-outlet[name="${stack.outlet}"]` : "md-outlet";
                let outlet = null;
                let observer = null;
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
            const outlets = [...document.querySelectorAll("md-outlet")];

            for (const outlet of outlets) {
                let nextElement = outlet.nextElementSibling;
                while (nextElement) {
                    if (!route.stacks.find((stack) => stack.component === nextElement) && nextElement.isComponent && !outlets.find((outlet) => outlet === nextElement)) nextElement.remove();
                    nextElement = nextElement.nextElementSibling;
                }
            }
        }
    }

    static historyApiFallback = false;

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
        if (this.historyApiFallback) {
            window.addEventListener("popstate", this.handleNavigation.bind(this));
        } else {
            window.addEventListener("hashchange", this.handleNavigation.bind(this));
        }
    }
}

export { Router };
