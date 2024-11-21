# Cache
Lightweight cache support.

## Installation
Using composer
```sh
composer require phico/cache
```

## Config
Cache requires a specific config format for each driver
```php
[

    'use' => env('CACHE_USE', 'default'),

    'drivers' => [

        'file' => [
            'path' => env('CACHE_FILESYSTEM_PATH', '/storage/cache'),
        ],

        'redis' => [
            'scheme' => env('CACHE_REDIS_SCHEME', 'tcp'),
            'host' => env('CACHE_REDIS_HOST', '127.0.0.1'),
            'port' => env('CACHE_REDIS_PORT', 6379),
        ],

    ],
];
```

## Usage
Cache provides quick and simple access to cache servers such as Redis, KeyDB and Valkey.
```php
$use = $config['use'];
$cache = new Cache($config['drivers'][$use]);
// set an item in the cache
$cache->set('foo', 'bar');

// get an item from the cache
$value = $cache->get('foo');
// $value = 'bar'

// remove an item from cache
$cache->delete('foo');

// check existence
$exists = $cache->exists('foo'):
// $exists = false
```
