import { html } from "lit";
import { MdComponent } from "../component/component";
import { ifDefined } from "lit/directives/if-defined.js";
import { RippleController } from "../ripple/ripple";
import { createRef, ref } from "lit/directives/ref.js";

class MdCheckboxComponent extends MdComponent {
    static properties = {
        name: { type: String },
        checked: { type: Boolean },
        defaultChecked: { type: Boolean },
        value: { type: String },
        defaultValue: { type: String },
        indeterminate: { type: Boolean },
    };

    checkboxNative = createRef();

    constructor() {
        super();
        new RippleController(this, {
            container: ".md-checkbox__track",
            trigger: ".md-checkbox__native",
            unbounded: true,
            radius: 40,
            centered: true,
        });
    }

    render() {
        return html`
            <input ${ref(this.checkboxNative)} type="checkbox" .name="${ifDefined(this.name)}" .checked="${ifDefined(this.checked)}" .defaultChecked="${ifDefined(this.defaultChecked)}" .value="${ifDefined(this.value)}" .defaultValue="${ifDefined(this.defaultValue)}" .indeterminate="${ifDefined(this.indeterminate)}" class="md-checkbox__native" @input="${this.handleCheckboxInput}" @reset="${this.handleCheckboxReset}" />
            <div class="md-checkbox__track">
                <div class="md-checkbox__thumb"></div>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.defaultChecked = this.checked;
        this.defaultValue = this.value || "on";
        this.defaultIndeterminate = this.indeterminate;
    }

    handleCheckboxInput(event) {
        this.checked = this.checkboxNative.value.checked;
        this.value = this.checkboxNative.value.value;
        this.indeterminate = this.checkboxNative.value.indeterminate;

        this.emit("onCheckboxInput", { event });
    }

    handleCheckboxReset(event) {
        this.checkboxNative.value.checked = this.defaultChecked;
        this.checkboxNative.value.value = this.defaultValue;
        this.checkboxNative.value.indeterminate = this.defaultIndeterminate;

        this.checked = this.defaultChecked;
        this.value = this.defaultValue;
        this.indeterminate = this.defaultIndeterminate;

        this.emit("onCheckboxReset", { event });
    }
}

customElements.define("md-checkbox", MdCheckboxComponent);

export { MdCheckboxComponent };
