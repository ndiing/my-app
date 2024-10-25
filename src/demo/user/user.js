import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoUserComponent extends MyComponent {
    render() {
        return html`
            <h1>User</h1>
            <my-outlet></my-outlet>
        `;
    }
}

customElements.define("demo-user", DemoUserComponent);

export default document.createElement("demo-user", DemoUserComponent);
