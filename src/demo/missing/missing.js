import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoMissingComponent extends MdComponent {
    render() {
        return html`
            <h1>Missing</h1>
            <md-outlet></md-outlet>
        `;
    }
}

customElements.define("demo-missing", DemoMissingComponent);

export default document.createElement("demo-missing", DemoMissingComponent);
