::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Logger

Logger writes messages and context to files.

## Config

Use the `config/logger.php` file to adjust behaviour by setting the `level` and `filepath` options.

```php
<?php

return [
    // set the log level, anything below this level will not be logged
    'level' => 'debug',
    // set the path to the log file, relative to your project root
    'filepath' => 'storage/logs/app.log',
];
```

## Helper

Logger has a helper function `logger()` which returns a `Logger` instance using the default configuration file.

## Writing to the log

Logger uses the PSR3 methods, `emergency`, `alert`, `critical`, `error`, `warning`, `notice`, `info`, `debug`.

Each method requires a message (string) as the first argument and an optional second argument for context.

```php
// log an alert
logger()->alert('Oops something has gone wrong, better take a look', [
    'exception' => $e->toArray()
]);
```
