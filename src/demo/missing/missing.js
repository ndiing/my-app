import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoMissingComponent extends MyComponent {
    render() {
        return html`
            <h1>Missing</h1>
            <my-outlet></my-outlet>
        `;
    }
}

customElements.define("demo-missing", DemoMissingComponent);

export default document.createElement("demo-missing", DemoMissingComponent);
