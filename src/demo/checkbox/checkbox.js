import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoCheckboxComponent extends MdComponent {
    render() {
        /* prettier-ignore */
        return html`
            <div class="md-grid">
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                    <md-form
                        @onFormReset="${console.log}"
                        @onFormSubmit="${console.log}"
                        @onFormData="${event=>console.log(event.detail.event.body)}"
                    >
                        <div class="md-grid">
                            <div class="md-grid__item--expanded4 md-grid__item--medium4 md-grid__item--compact4">
                                <md-checkbox name="checkbox"></md-checkbox>
                            </div>
                            <div class="md-grid__item--expanded4 md-grid__item--medium4 md-grid__item--compact4">
                                <md-checkbox name="checkbox" indeterminate></md-checkbox>
                            </div>
                            <div class="md-grid__item--expanded4 md-grid__item--medium4 md-grid__item--compact4">
                                <md-checkbox name="checkbox" checked></md-checkbox>
                            </div>
                            <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4">
                                <md-button variant="tonal" label="Reset" type="reset"></md-button>
                                <md-button variant="filled" label="Submit" type="submit"></md-button>
                            </div>
                        </div>
                    </md-form>
                </div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4"></div>
                <div class="md-grid__item--expanded12 md-grid__item--medium4 md-grid__item--compact4"></div>
            </div>
        `;
    }
}

customElements.define("demo-checkbox", DemoCheckboxComponent);

export default document.createElement("demo-checkbox", DemoCheckboxComponent);
