import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoUserComponent extends MdComponent {
    render() {
        return html`
            <h1>User</h1>
            <md-outlet></md-outlet>
        `;
    }
}

customElements.define("demo-user", DemoUserComponent);

export default document.createElement("demo-user", DemoUserComponent);
