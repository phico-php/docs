# Auth
Lightweight authentication support.
@TODO finish auth documentation


## Installation
Using composer
```sh
composer require phico/auth
```

## Usage
Use the AuthMiddleware to guard any routes as needed
```php
$routes->get('/account', AccountAction::class)->use([
    new \Phico\Auth\AuthMiddleware::class
]);
```
