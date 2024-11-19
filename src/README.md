---
home: true
betaBanner: true
title: PhicoPHP - Lightweight, dependency free framework
heroImage: https://phico-php.net/img/phico-colour.svg
heroText: Simple, Easy, Fast
tagline: Lightweight, dependency free framework
actions:
  - text: Quick start
    link: /quick-start.html
    type: primary
  - text: Documentation
    link: /docs/index.html
    type: secondary

# Phico is a lightweight, dependency free PHP framework.

# It can be thought of as a simple Request-Response handler, all Phico does is
# accept Requests from a client and Routes them to your code via the built-in
# Router.

# Your code must respond with a Response which is returned to the client.

# If you need any further functionality you can add middleware to adjust the
# Request on it's way to your code, or adjust the Reponse on it's way back to the
# client.

# Though Phico follows a similar pattern to many PSRs it is not directly compatible,
# Phico is designed to follow it's own path and is not encumbered by external projects.

# Phico is entirely dependency free* and will remain that way by keeping it's
# purpose laser focused. Additional functionality can be handled by additional
# packages or your custom code.

# *Except dev dependencies and reliance on some 3rd party packages in the addons


features:
  - title: Simple
    details: Phico is small and laser focused, the code is obviously structured and easy to read and understand.
  - title: Easy
    details: Phico APIs aim to be consistent and obvious so you don't have to think about it.
  - title: Fast
    details: Phico is built to respond to standard FPM requests quickly and to handle large numbers of simultaneous connections via Workerman.
  - title: Dependency free
    details: Phico is stable and has no dependencies to ease your long term support concerns.
  - title: Architecture agnostic
    details: Phico can support traditional MVC, ADR, DDD or s/tried and tested spaghetti code/s.. choose your poison.
  - title: Modular
    details: Phico is extremely modular, the core is less than 150 lines of code so most functionality is provided by packages or your own middleware and services.

footer: Copyright ©2024 indgy.uk
---

::: warning Phico is in BETA
Phico is currently in BETA, this means breakage is expected and not all project packages are public.
:::
