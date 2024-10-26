import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoButtonComponent extends MyComponent {
    render() {
        /* prettier-ignore */
        return html`
            <div class="my-grid" style="margin:24px;">
                <div class="my-grid__item--expanded4 my-grid__item--medium4 my-grid__item--compact4">
                    <my-button
                        label="Text Button"
                        icon="add"
                    ></my-button>
                </div>
                <div class="my-grid__item--expanded4 my-grid__item--medium4 my-grid__item--compact4"></div>
                <div class="my-grid__item--expanded4 my-grid__item--medium4 my-grid__item--compact4"></div>
            </div>
        `;
    }
}

customElements.define("demo-button", DemoButtonComponent);

export default document.createElement("demo-button", DemoButtonComponent);
