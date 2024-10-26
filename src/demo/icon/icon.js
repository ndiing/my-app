import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoIconComponent extends MyComponent {
    render() {
        /* prettier-ignore */
        return html`
            <div class="my-grid">
                <div class="my-grid__item--expanded4 my-grid__item--medium4 my-grid__item--compact4">
                    <my-icon>add</my-icon>
                </div>
                <div class="my-grid__item--expanded4 my-grid__item--medium4 my-grid__item--compact4"></div>
                <div class="my-grid__item--expanded4 my-grid__item--medium4 my-grid__item--compact4"></div>
            </div>
        `;
    }
}

customElements.define("demo-icon", DemoIconComponent);

export default document.createElement("demo-icon", DemoIconComponent);
