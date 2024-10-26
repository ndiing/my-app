import { html, nothing } from "lit";
import { MdComponent } from "../component/component";
import { RippleController } from "../ripple/ripple";

class MdButtonComponent extends MdComponent {
    static properties = {
        ...MdComponent.properties,
        label: { type: String },
        icon: { type: String },
        type: { type: String },
        selected: { type: Boolean, reflect: true },
    };

    variants = ["elevated", "filled", "tonal", "outlined", "text"];

    constructor() {
        super();

        this.variant = "text";

        new RippleController(this, {
            trigger: ".md-button__native",
        });

        this.type = "button";
    }

    render() {
        /* prettier-ignore */
        return html`
            <button class="md-button__native" .type="${this.type}">button</button>
            ${this.icon ? html`<md-icon class="md-button__icon">${this.icon}</md-icon>` : nothing}
            ${this.label ? html`<div class="md-button__label">${this.label}</div>` : nothing}
        `
    }
}

customElements.define("md-button", MdButtonComponent);

export { MdButtonComponent };
