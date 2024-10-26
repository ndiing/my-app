import { html, nothing } from "lit";
import { MyComponent } from "../component/component";
import { RippleController } from "../ripple/ripple";

class MyButtonComponent extends MyComponent {
    static properties = {
        ...MyComponent.properties,
        label: { type: String },
        icon: { type: String },
    };

    variants = ["elevated", "filled", "tonal", "outlined", "text"];

    constructor() {
        super();

        this.variant = "text";

        new RippleController(this, {
            trigger: ".my-button__native",
        });
    }

    render() {
        /* prettier-ignore */
        return html`
            <button class="my-button__native">button</button>
            ${this.icon ? html`<my-icon class="my-button__icon">${this.icon}</my-icon>` : nothing}
            ${this.label ? html`<div class="my-button__label">${this.label}</div>` : nothing}
        `
    }
}

customElements.define("my-button", MyButtonComponent);

export { MyButtonComponent };
