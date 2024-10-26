import { html, nothing } from "lit";
import { MdComponent } from "../component/component";
import { RippleController } from "../ripple/ripple";

class MdFabComponent extends MdComponent {
    static properties = {
        variant: { type: String },
        size: { type: String },
        label: { type: String },
        icon: { type: String },
        type: { type: String },
        selected: { type: Boolean, reflect: true },
        extended: { type: Boolean, reflect: true },
    };

    variants = ["surface", "secondary", "tertiary"];
    sizes = ["small", "large"];

    constructor() {
        super();

        this.variant = "text";

        new RippleController(this, {
            trigger: ".md-fab__native",
        });

        this.type = "button";

        // fab
        // required icon

        // extended fab
        // required label
        // optional icon
    }

    render() {
        /* prettier-ignore */
        return html`
            <button class="md-fab__native" .type="${this.type}">fab</button>
            ${this.icon ? html`<md-icon class="md-fab__icon">${this.icon}</md-icon>` : nothing}
            ${this.label ? html`<div class="md-fab__label">${this.label}</div>` : nothing}
        `
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        if (changedProperties.has("variant")) {
            for (const variant of this.variants) {
                this.classList.toggle(this.localName + "--" + variant, this.variant === variant);
            }
        }

        if (changedProperties.has("size")) {
            for (const size of this.sizes) {
                this.classList.toggle(this.localName + "--" + size, this.size === size);
            }
        }
    }
}

customElements.define("md-fab", MdFabComponent);

export { MdFabComponent };
