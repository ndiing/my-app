import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoMainComponent extends MyComponent {
    render() {
        return html`
            <h1>Main</h1>
            <div>
                <div routerLink="/">/</div>
                <div routerLink="/users">/users</div>
                <div routerLink="/users/1">/users/1</div>
                <div routerLink="/users/1/xyz">/users/1/xyz</div>
                <div routerLink="/blogs">/blogs</div>
                <div routerLink="/blogs/1">/blogs/1</div>
                <div routerLink="/blogs/1/xyz">/blogs/1/xyz</div>
                <div routerLink="/xyz">/xyz</div>
            </div>
            <my-outlet name="user"></my-outlet>
            <my-outlet></my-outlet>
        `;
    }
}

customElements.define("demo-main", DemoMainComponent);

export default document.createElement("demo-main", DemoMainComponent);