import "./components/components.scss";
import "./components/components.js";

import { Router } from "./components/router/router.js";

import DemoMainComponent from "./demo/main/main.js";
const DemoUsersComponent = () => import("./demo/users/users.js").then((m) => m.default);
const DemoUserComponent = () => import("./demo/user/user.js").then((m) => m.default);
const DemoBlogsComponent = () => import("./demo/blogs/blogs.js").then((m) => m.default);
const DemoBlogComponent = () => import("./demo/blog/blog.js").then((m) => m.default);
const DemoMissingComponent = () => import("./demo/missing/missing.js").then((m) => m.default);

const beforeLoad = (next) => {
    next();
};

Router.init([
    {
        path: "",
        component: DemoMainComponent,
        children: [
            {
                path: "users",
                beforeLoad,
                load: DemoUsersComponent,
                children: [
                    {
                        path: ":id",
                        outlet: "user",
                        load: DemoUserComponent,
                        children: [],
                    },
                ],
            },
            {
                path: "blogs",
                load: DemoBlogsComponent,
                children: [
                    {
                        path: ":id",
                        load: DemoBlogComponent,
                        children: [],
                    },
                ],
            },
            { path: "icon", load: () => import("./demo/icon/icon.js").then((m) => m.default) },
            { path: "button", load: () => import("./demo/button/button.js").then((m) => m.default) },
            { path: "segmented-button", load: () => import("./demo/segmented-button/segmented-button.js").then((m) => m.default) },
            { path: "icon-button", load: () => import("./demo/icon-button/icon-button.js").then((m) => m.default) },
            { path: "fab", load: () => import("./demo/fab/fab.js").then((m) => m.default) },
            { path: "extended-fab", load: () => import("./demo/extended-fab/extended-fab.js").then((m) => m.default) },
            { path: "checkbox", load: () => import("./demo/checkbox/checkbox.js").then((m) => m.default) },
            { path: "form", load: () => import("./demo/form/form.js").then((m) => m.default) },
        ],
    },
    {
        path: "*",
        load: DemoMissingComponent,
        children: [],
    },
]);

/* 
card hanya panel
sheet hanya docked panel
dialog hanya panel window
*/
