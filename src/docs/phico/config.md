::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Config

Config fetches config values from arrays using `dot.notation.syntax`.

## Helper

Use the `config()` helper to get a _Config_ instance.

### Fetching values

Use the `get()` method to fetch a value:

```php
echo config()->get('app.env');
// local
```

### Setting values

Config does not support writing to files, however you may set values during execution.

Use the `set()` method to set a value:

```php
config()->set('app.env', 'test');
echo config()->get('app.env');
// test
```

**NOTE** Setting values _will not save_ them to file.

## Env files

Phico supports `.env` files and provides the `env()` helper to fetch env values.
The `.env` file should be saved in your project root.
This can be seen in the default `config/app.php` file:

```php
<?php

return [
    "env" => env('APP_ENV', 'local'),
    "host" => env('APP_HOST', 'http://api.local.phico-php.net:4040'),
    "version" => env('APP_VERSION'),
];
```

The `env()` helper will search the `.env` file variables for the first argument and return the matched value.
If the key cannot be found then the second argument is returned.

### Example .env file

```sh
APP_KEY=abc123def456ghi789
APP_ENV=local
APP_HOST=localhost:4040
APP_VERSION=0.1.0
```

#### Value types

Env will parse nearly all values as strings, except for the following:

Integer strings matching [0-9] will be converted to integers.
`true`, `on`, `yes` or `false`, `off`, `no` strings (not case sensitive) will be converted to booleans.
