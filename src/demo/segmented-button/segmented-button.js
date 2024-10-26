import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoSegmentedButtonComponent extends MdComponent {
    render() {
        /* prettier-ignore */
        return html`
            <div class="md-grid">
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-segmented-button 
                        select="single"
                        .items="${[
                            {label:"Label",selected:true},
                            {label:"Label"},
                            {label:"Label"},
                        ]}"
                    ></md-segmented-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-segmented-button 
                        select="multi"
                        .items="${[
                            {label:"Label",selected:true},
                            {label:"Label",selected:true},
                            {label:"Label"},
                        ]}"
                    ></md-segmented-button>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4"></div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4"></div>
            </div>
        `;
    }
}

customElements.define("demo-segmented-button", DemoSegmentedButtonComponent);

export default document.createElement("demo-segmented-button", DemoSegmentedButtonComponent);
