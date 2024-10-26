import { html, nothing } from "lit";
import { MyComponent } from "../component/component";

class MyButtonComponent extends MyComponent {
    static properties = {
        label: { type: String },
        icon: { type: String },
    };

    render() {
        /* prettier-ignore */
        return html`
            ${this.icon ? html`<my-icon class="my-button__icon">${this.icon}</my-icon>` : nothing}
            ${this.label ? html`<div class="my-button__label">${this.label}</div>` : nothing}
        `
    }
}

customElements.define("my-button", MyButtonComponent);

export { MyButtonComponent };
