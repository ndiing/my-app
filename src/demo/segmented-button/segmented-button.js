import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoSegmentedButtonComponent extends MyComponent {
    render() {
        /* prettier-ignore */
        return html`
            <div class="my-grid">
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4">
                    <my-segmented-button>
                        <my-button></my-button>
                    </my-segmented-button>
                </div>
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4"></div>
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4"></div>
            </div>
        `;
    }
}

customElements.define("demo-segmented-button", DemoSegmentedButtonComponent);

export default document.createElement("demo-segmented-button", DemoSegmentedButtonComponent);
