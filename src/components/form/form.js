import { html, nothing } from "lit";
import { MdComponent } from "../component/component";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref } from "lit/directives/ref.js";

class MdFormComponent extends MdComponent {
    static properties = {
        acceptCharset: { type: String },
        action: { type: String },
        autocomplete: { type: String },
        encoding: { type: String },
        enctype: { type: String },
        method: { type: String },
        name: { type: String },
        target: { type: String },
    };

    formNative = createRef();

    constructor() {
        super();
        this.acceptCharset = "UTF-8";
        this.action = "/";
        this.autocomplete = "off";
        this.enctype = "application/x-www-form-urlencoded";
        this.method = "post";
        this.childNodes_ = Array.from(this.childNodes);
    }
    render() {
        /* prettier-ignore */
        return html`
            <form 
                ${ref(this.formNative)}
                class="md-form__native"
                .name="${ifDefined(this.name)}"
                .method="${ifDefined(this.method)}"
                .target="${ifDefined(this.target)}"
                .action="${ifDefined(this.action)}"
                .enctype="${ifDefined(this.enctype)}"
                .acceptCharset="${ifDefined(this.acceptCharset)}"
                .autocomplete="${ifDefined(this.autocomplete)}"
                @formdata="${this.handleFormData}"
                @reset="${this.handleFormReset}"
                @submit="${this.handleFormSubmit}"
            >${this.childNodes_}</form>
        `
    }

    reset() {
        this.formNative.value.reset();
    }

    submit(submitButton) {
        let myForm = this.formNative.value;

        if (myForm.requestSubmit) {
            if (submitButton) {
                myForm.requestSubmit(submitButton);
            } else {
                myForm.requestSubmit();
            }
        } else {
            myForm.submit();
        }
    }

    handleFormData(event) {
        const body = {};

        for (const [name, value] of event.formData.entries()) {
            if (body[name]) {
                if (Array.isArray(body[name])) {
                    body[name].push(value);
                } else {
                    body[name] = [body[name], value];
                }
            } else {
                body[name] = value;
            }
        }
        event.body = body;

        this.emit("onFormData", { event });
    }

    handleFormReset(event) {
        for (const element of this.formNative.value.elements) {
            const event = new CustomEvent("reset", {
                bubbles: true,
                cancelable: true,
                detail: {},
            });
            element.dispatchEvent(event);
        }

        this.emit("onFormReset", { event });
    }

    handleFormSubmit(event) {
        event.preventDefault();

        new FormData(event.currentTarget);

        this.emit("onFormSubmit", { event });
    }
}

customElements.define("md-form", MdFormComponent);

export { MdFormComponent };
