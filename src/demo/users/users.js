import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoUsersComponent extends MyComponent {
    render() {
        return html`
            <h1>Users</h1>
            <my-outlet></my-outlet>
        `;
    }
}

customElements.define("demo-users", DemoUsersComponent);

export default document.createElement("demo-users", DemoUsersComponent);
