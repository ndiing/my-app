import { html, nothing } from "lit";
import { MdComponent } from "../component/component";
import { ifDefined } from "lit/directives/if-defined.js";

class MdSegmentedButtonComponent extends MdComponent {
    static properties = {
        ...MdComponent.properties,
        select: { type: String },
        items: { type: Array },
    };

    constructor() {
        super();
        this.items = [];
    }

    renderButton(item) {
        /* prettier-ignore */
        return html`
            <md-button
                .data="${item}"
                .variant="${item.variant || "outlined"}"
                .label="${ifDefined(item.label)}"
                .icon="${ifDefined(item.icon)}"
                .type="${ifDefined(item.type)}"
                .selected="${ifDefined(item.selected)}"
                @click="${this.handleSegmentedButtonClick}"
            ></md-button>
        `
    }

    render() {
        /* prettier-ignore */
        return this.items.map(item => this.renderButton(item))
    }

    handleSegmentedButtonClick(event) {
        const data = event.currentTarget.data;

        if (this.select === "multi") {
            data.selected = !data.selected;
        } else {
            this.items.forEach((item) => {
                item.selected = item === data;
            });
        }
        this.requestUpdate();

        this.emit("onSegmentedButtonClick", { event });
    }
}

customElements.define("md-segmented-button", MdSegmentedButtonComponent);

export { MdSegmentedButtonComponent };
