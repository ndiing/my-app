import { html, nothing } from "lit";
import { MdComponent } from "../component/component";
import { RippleController } from "../ripple/ripple";

class MdIconButtonComponent extends MdComponent {
    static properties = {
        variant: { type: String },
        icon: { type: String },
        type: { type: String },
        selected: { type: Boolean, reflect: true },
        toggle: { type: Boolean, reflect: true },
    };

    variants = ["filled", "tonal", "outlined", "standard"];

    constructor() {
        super();

        this.variant = "standard";

        new RippleController(this, {
            trigger: ".md-icon-button__native",
            unbounded: true,
            radius: 40,
        });

        this.type = "button";
    }

    render() {
        /* prettier-ignore */
        return html`
            <button class="md-icon-button__native" .type="${this.type}">icon-button</button>
            ${this.icon ? html`<md-icon class="md-icon-button__icon">${this.icon}</md-icon>` : nothing}
        `
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("click", this.handleIconButtonClick.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("click", this.handleIconButtonClick.bind(this));
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        if (changedProperties.has("variant")) {
            for (const variant of this.variants) {
                this.classList.toggle(this.localName + "--" + variant, this.variant === variant);
            }
        }
    }

    handleIconButtonClick(event) {
        if (this.toggle) {
            this.selected = !this.selected;
        }
        this.emit("onIconButtonClick", { event });
    }
}

customElements.define("md-icon-button", MdIconButtonComponent);

export { MdIconButtonComponent };
