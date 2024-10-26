import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoMainComponent extends MdComponent {
    render() {
        return html`
            <div class="md-border">
                <div class="md-border__item--west" style="width:360px;padding:24px;">
                    <div>
                        <!-- <div routerLink="/">/</div> -->
                        <!-- <div routerLink="/users">/users</div> -->
                        <!-- <div routerLink="/users/1">/users/1</div> -->
                        <!-- <div routerLink="/users/1/xyz">/users/1/xyz</div> -->
                        <!-- <div routerLink="/blogs">/blogs</div> -->
                        <!-- <div routerLink="/blogs/1">/blogs/1</div> -->
                        <!-- <div routerLink="/blogs/1/xyz">/blogs/1/xyz</div> -->
                        <!-- <div routerLink="/xyz">/xyz</div> -->
                        <div routerLink="/icon">/icon</div>
                        <div routerLink="/button">/button</div>
                        <div routerLink="/segmented-button">/segmented-button</div>
                        <div routerLink="/icon-button">/icon-button</div>
                    </div>
                </div>
                <div class="md-border__item--center" style="padding:24px;">
                    <!-- <h1>Main</h1> -->
                    <!-- <md-outlet name="user"></md-outlet> -->
                    <md-outlet></md-outlet>
                </div>
            </div>
        `;
    }
}

customElements.define("demo-main", DemoMainComponent);

export default document.createElement("demo-main", DemoMainComponent);
