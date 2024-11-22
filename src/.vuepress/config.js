import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
    bundler: viteBundler(),
    lang: "en-GB",
    description: "Phico PHP",
    head: [
        [
            "script",
            {
                defer: true,
                src: "https://cloud.umami.is/script.js",
                "data-website-id": "36a4fd22-7688-43fb-bb61-173d2131de80",
            },
        ],
    ],
    theme: defaultTheme({
        editLink: false,
        logo: "https://phico-php.net/img/phico-colour.svg",
        repo: "https://github.com/phico-php",
        navbar: [
            {
                text: "Home",
                link: "/",
            },
            {
                text: "Quick start",
                link: "/quick-start.html",
            },
            {
                text: "Documentation",
                link: "/docs/index.html",
            },
            {
                text: "Forum",
                link: "https://forum.phico-php.net",
            },
        ],
        // Sidebar setup for the docs/ folder
        sidebar: {
            // Define sidebar to show only under the /docs/ route
            "/docs/": [
                {
                    collapsable: true,
                    text: "Quick Start",
                    children: [
                        {
                            text: "Introduction",
                            link: "/docs/quick-start/intro.html",
                        },
                        {
                            text: "Why Phico",
                            link: "/docs/quick-start/why.html",
                        },
                        {
                            text: "Installation",
                            link: "/docs/quick-start/install.html",
                        },
                    ],
                },
                {
                    collapsable: true,
                    text: "Example app",
                    children: [
                        {
                            text: "Scaffolding",
                            link: "/docs/example-app/scaffolding.html",
                        },
                        {
                            text: "Routes",
                            link: "/docs/example-app/routes.html",
                        },
                        {
                            text: "Requests",
                            link: "/docs/example-app/requests.html",
                        },
                        {
                            text: "Responses",
                            link: "/docs/example-app/responses.html",
                        },
                        {
                            text: "Events",
                            link: "/docs/example-app/events.html",
                        },
                    ],
                },
                {
                    collapsable: true,
                    text: "Phico",
                    children: [
                        {
                            text: "CLI",
                            link: "/docs/phico/cli.html",
                        },
                        {
                            text: "Config",
                            link: "/docs/phico/config.html",
                        },
                        {
                            text: "Container",
                            link: "/docs/phico/container.html",
                        },
                        {
                            text: "Filesystem",
                            link: "/docs/phico/filesystem.html",
                        },
                        {
                            text: "Logger",
                            link: "/docs/phico/logger.html",
                        },
                        {
                            text: "Middleware",
                            link: "/docs/phico/middleware.html",
                        },
                        {
                            text: "Request",
                            link: "/docs/phico/request.html",
                        },
                        {
                            text: "Response",
                            link: "/docs/phico/response.html",
                        },
                        {
                            text: "Router",
                            link: "/docs/phico/router.html",
                        },
                        {
                            text: "Support",
                            link: "/docs/phico/support.html",
                        },
                        {
                            text: "View",
                            link: "/docs/phico/view.html",
                        },
                    ],
                },
                {
                    collapsable: true,
                    text: "Libraries",
                    children: [
                        {
                            text: "Authentication",
                            link: "/docs/library/auth/index.html",
                        },
                        {
                            text: "Cache",
                            link: "/docs/library/cache/index.html",
                        },
                        {
                            text: "CDN",
                            link: "/docs/library/cdn/index.html",
                        },
                        {
                            text: "Database",
                            link: "/docs/library/database/index.html",
                        },
                        {
                            text: "Http client",
                            link: "/docs/library/http-client/index.html",
                        },
                        {
                            text: "Locale",
                            link: "/docs/library/locale/index.html",
                        },
                        {
                            text: "Mailer",
                            link: "/docs/library/mailer/index.html",
                        },
                        {
                            text: "Profiler",
                            link: "/docs/library/profiler/index.html",
                        },
                        {
                            text: "Query",
                            link: "/docs/library/query/index.html",
                        },
                        {
                            text: "Queue",
                            link: "/docs/library/queue/index.html",
                        },
                        {
                            text: "Validation",
                            link: "/docs/library/validation/index.html",
                        },
                        {
                            text: "Session",
                            link: "/docs/library/session/index.html",
                        },
                        {
                            text: "View",
                            link: "/docs/library/view/index.html",
                        },
                    ],
                },
                {
                    collapsable: true,
                    text: "Works",
                    children: [
                        {
                            text: "Introduction",
                            link: "/docs/works/",
                        },
                    ],
                },
            ],
        },
    }),
});
