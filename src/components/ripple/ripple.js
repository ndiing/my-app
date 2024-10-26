class RippleController {
    constructor(host, options = {}) {
        this.options = {
            container: null,
            animation: false,
            centered: false,
            color: null,
            disabled: false,
            radius: false,
            trigger: null,
            unbounded: false,
            ...options,
        };
        (this.host = host).addController(this);
    }

    handlePointerenter() {
        this.container.classList.add("md-ripple--hover");
    }

    handlePointerleave() {
        this.container.classList.remove("md-ripple--hover");
    }

    handlePointerdown(event) {
        window.addEventListener("pointerup", this.handlePointerup.bind(this));
        this.container.classList.add("md-ripple--press");

        const rect = this.container.getBoundingClientRect();

        if (!this.options.centered) {
            const radius = this.radius;
            const left = (event.clientX - rect.left) / rect.width;
            const top = (event.clientY - rect.top) / rect.height;
            const translateX = (0.5 - left) * (100 / radius);
            const translateY = (0.5 - top) * ((100 / radius) * (rect.height / rect.width));

            this.container.style.setProperty("--md-comp-ripple-radius", radius + "%");
            this.container.style.setProperty("--md-comp-ripple-left", left * 100 + "%");
            this.container.style.setProperty("--md-comp-ripple-top", top * 100 + "%");
            this.container.style.setProperty("--md-comp-ripple-translateX", translateX * 100 + "%");
            this.container.style.setProperty("--md-comp-ripple-translateY", translateY * 100 + "%");
        }
    }

    handlePointerup() {
        this.container.classList.remove("md-ripple--press");
        window.removeEventListener("pointerup", this.handlePointerup.bind(this));
    }

    handleFocus() {
        this.container.classList.add("md-ripple--focus");
    }

    handleBlur() {
        this.container.classList.remove("md-ripple--focus");
    }

    async hostConnected() {
        await this.host.updateComplete;

        this.container = this.host;

        this.trigger = this.container;
        if (this.options.trigger) {
            this.trigger = this.host.querySelector(this.options.trigger);
        }

        this.container.classList.add("md-ripple");
        this.container.classList.toggle("md-ripple--bounded", !this.options.unbounded);
        this.radius = 141.4213562373095;

        this.trigger.setAttribute("tabIndex", 0);
        this.trigger.classList.add("md-ripple--trigger");

        this.trigger.addEventListener("pointerenter", this.handlePointerenter.bind(this));
        this.trigger.addEventListener("pointerleave", this.handlePointerleave.bind(this));
        this.trigger.addEventListener("pointerdown", this.handlePointerdown.bind(this));
        this.trigger.addEventListener("focus", this.handleFocus.bind(this));
        this.trigger.addEventListener("blur", this.handleBlur.bind(this));
    }

    hostDisconnected() {}
}

export { RippleController };
