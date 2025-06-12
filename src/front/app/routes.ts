import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
    route("", "routes/home.tsx", [
        route("create", "./routes/home/create.tsx"),
        route("routines", "./routes/home/routines.tsx"),
        //route("historic", "routes/home/historic.tsx"),
        route("groups", "./routes/home/groups.tsx")
    ]),
    route("*", "routes/not_found.tsx"),
] satisfies RouteConfig;