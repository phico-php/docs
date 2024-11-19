# Router

Router provides support for `named routes`, route middleware and the `pathFor()` helper function.

## Installation

Install via composer if required.

```sh
composer require phico/router
```

## Usage

Add the middleware to your application

```php
// boot/middleware.php

$app->use[
    // other middleware ...
    new \Phico\Router\RoutingMiddleware,
    // other middleware ...
];
```

@TODO document router
