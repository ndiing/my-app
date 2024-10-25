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
        ],
    },
    {
        path: "*",
        load: DemoMissingComponent,
        children: [],
    },
]);
