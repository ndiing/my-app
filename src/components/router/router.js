/**
 * Class representing a Router for managing routes.
 */
class Router {
    /**
     * Sets the routes and prepares their properties.
     * @param {Array<Object>} routes - The list of route objects.
     * @param {Object|null} parent - The parent route object, if any.
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
     * Gets the route matching the given path.
     * @param {string} path - The path to match against the routes.
     * @param {Array<Object>} routes - The list of routes to search.
     * @param {Array<Object>} stacks - The stack of matched routes.
     * @returns {Object|null} The matching route object, or null if no match is found.
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
     * Handles navigation events triggered by click actions.
     * @param {MouseEvent} event - The click event.
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
     * Gets the current pathname from the window location.
     * @returns {string} The current pathname.
     */
    static get pathname() {
        return window.location.pathname;
    }

    /**
     * Handles navigation to the matched route and loads the appropriate components.
     * @param {MouseEvent} event - The navigation event.
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
     * Initializes the router with the given routes and sets up event listeners.
     * @param {Array<Object>} routes - The list of route objects.
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
