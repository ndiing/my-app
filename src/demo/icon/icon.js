import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoIconComponent extends MdComponent {
    render() {
        /* prettier-ignore */
        return html`
            <div class="md-grid">
                <div class="md-grid__item--expanded4 md-grid__item--medium4 md-grid__item--compact4">
                    <md-icon>add</md-icon>
                </div>
                <div class="md-grid__item--expanded4 md-grid__item--medium4 md-grid__item--compact4"></div>
                <div class="md-grid__item--expanded4 md-grid__item--medium4 md-grid__item--compact4"></div>
            </div>
        `;
    }
}

customElements.define("demo-icon", DemoIconComponent);

export default document.createElement("demo-icon", DemoIconComponent);
