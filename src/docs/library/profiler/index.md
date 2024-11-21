# Profiler

Lightweight app timer and profiling middleware, provides timings in your browser developer console.

## Installation

Using composer

```sh
composer require phico/profiler
```

## Usage

Add the middleware to your application

```php
// /app/middleware.php

$app->use[
    ...
    new \Phico\Profiler\ProfilerMiddleware,
    ...
];

```

#### Start a timer
```php
$timer = $request->attr('timer');
$timer->start('account-action', 'You may add a description');
```

#### Stop a timer
```php
$timer = $request->attr('timer');
$timer->stop('account-action');
```

Check the response timing pane in your browser developer console.
