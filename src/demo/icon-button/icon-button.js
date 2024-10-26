import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoIconButtonComponent extends MdComponent {
    render() {
        /* prettier-ignore */
        return html`
            <div class="md-grid">
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button variant="filled" icon="add"></md-icon-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button variant="tonal" icon="add"></md-icon-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button variant="outlined" icon="add"></md-icon-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button icon="add"></md-icon-button>
                </div>
                
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button toggle variant="filled" icon="add"></md-icon-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button toggle variant="tonal" icon="add"></md-icon-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button toggle variant="outlined" icon="add"></md-icon-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button toggle icon="add"></md-icon-button>
                </div>

                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button toggle selected variant="filled" icon="add"></md-icon-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button toggle selected variant="tonal" icon="add"></md-icon-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button toggle selected variant="outlined" icon="add"></md-icon-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon-button toggle selected icon="add"></md-icon-button>
                </div>

                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4"></div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4"></div>
            </div>
        `;
    }
}

customElements.define("demo-icon-button", DemoIconButtonComponent);

export default document.createElement("demo-icon-button", DemoIconButtonComponent);
