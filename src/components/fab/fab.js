import { html, nothing } from "lit";
import { MdComponent } from "../component/component";
import { RippleController } from "../ripple/ripple";

class MdFabComponent extends MdComponent {
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
            trigger: ".md-fab__native",
        });

        this.type = "fab";
    }

    render() {
        /* prettier-ignore */
        return html`
            <button class="md-fab__native" .type="${this.type}">fab</button>
            ${this.icon ? html`<md-icon class="md-fab__icon">${this.icon}</md-icon>` : nothing}
            ${this.label ? html`<div class="md-fab__label">${this.label}</div>` : nothing}
        `
    }
}

customElements.define("md-fab", MdFabComponent);

export { MdFabComponent };
