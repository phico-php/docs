# Middleware

Middleware is a fundamental part of Phico, in fact one of Phicos three public methods is the `use()` method which attaches middleware to every request.

### Available middleware

Phico provides some useful middleware out of the box:

- **CorsHeaders** Sets appropriate CORS headers
- **JsonParser** Parses JSON input into the Request instance
- **RemoveTrailingSlash** Removes trailing slashes from the Request URI Path
- **SecureHeaders** Sets CSP headers
- **TrimInputs** Trims whitespace from Request input
- **ErrorHandler** Handles uncaught errors
- **RateLimiter** Simple request rate limiter
- **ResponseHandler** Handles responses
- **SetRequestId** Adds a unique id to every request, useful for logging


## Usage

App Middleware is defined in `/boot/middleware.php` inside the `$app->use()` method.
These middlewares will be attached to _every_ request.

```php
<?php

// middleware is called top to bottom
$app->use([
    \Phico\Middleware\SetRequestId::class,
    \Phico\Middleware\ResponseHandler::class,
    \Phico\Middleware\JsonParser::class,

    ...

    // the route handling middleware should be last
    new \Phico\Router\RouteHandler($router),
]);
```
**Note:** Middleware is called top to bottom:
<br>The Request instance traverses its way down the middleware stack.
<br>Once the list is complete the Request is passed to your Actions or Controllers.
<br>The returned Response then traverses its way back up the middleware stack from bottom to the top.

## Custom middleware

### CLI

Middleware classes can be scaffolded using phico cli:

```sh
phico make middleware
```
