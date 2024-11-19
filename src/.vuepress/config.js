import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
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
              link: "/docs/intro.html",
            },
            {
              text: "Why Phico",
              link: "/docs/why.html",
            },
            {
              text: "Installation",
              link: "/docs/install.html",
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
              text: "Database",
              link: "/docs/phico/database.html",
            },
            {
              text: "Filesystem",
              link: "/docs/phico/filesystem.html",
            },
            {
              text: "Locale",
              link: "/docs/phico/locale.html",
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
              text: "Session",
              link: "/docs/phico/session.html",
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
      ],
    },
  }),

  bundler: viteBundler(),
});
