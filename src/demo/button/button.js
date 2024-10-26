import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoButtonComponent extends MyComponent {
    render() {
        /* prettier-ignore */
        return html`
            <div class="my-grid">
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4">
                    <my-button variant="elevated" label="Elevated button" ></my-button>
                    <my-button variant="elevated" label="Elevated button" icon="add" ></my-button>
                </div>
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4">
                    <my-button variant="filled" label="Filled button" ></my-button>
                    <my-button variant="filled" label="Filled button" icon="add" ></my-button>
                </div>
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4">
                    <my-button variant="tonal" label="Filled tonal button" ></my-button>
                    <my-button variant="tonal" label="Filled tonal button" icon="add" ></my-button>
                </div>
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4">
                    <my-button variant="outlined" label="Outlined button" ></my-button>
                    <my-button variant="outlined" label="Outlined button" icon="add" ></my-button>
                </div>
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4">
                    <my-button label="Text button" ></my-button>
                    <my-button label="Text button" icon="add" ></my-button>
                </div>
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4"></div>
                <div class="my-grid__item--expanded12 my-grid__item--medium4 my-grid__item--compact4"></div>
            </div>
        `;
    }
}

customElements.define("demo-button", DemoButtonComponent);

export default document.createElement("demo-button", DemoButtonComponent);
