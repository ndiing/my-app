import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoUsersComponent extends MdComponent {
    render() {
        return html`
            <h1>Users</h1>
            <md-outlet></md-outlet>
        `;
    }
}

customElements.define("demo-users", DemoUsersComponent);

export default document.createElement("demo-users", DemoUsersComponent);
