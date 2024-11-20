::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Container

Container handles dependency injection for your application classes. Define your dependencies using the `set()` method

## Config

Use the `config/container.php` file to adjust behaviour.

```php
<?php

return [
    // set the path to the container definitions
    'path' => 'boot/container.php',
    // set the autowiring preference
    'autowire' => true,
    // set the default sharing preference
    'share' => false,
];
```

## Helper

Container has a helper function container() which returns a `Container` instance using the configuration file above.

```php
$c = container();
```

**Note** Use of the `container()` helper and `Container` instance should be avoided wherever possible.

## Quick reference

Set a definition describing how to create the class

```php
set(string $classname, callable|string $defintion, array $args = [])
```

Set a shortcut alias on a definition

```php
alias(string $name)
```

Set the share flag on a definition

```php
share(bool $toggle)
```

Returns an instatiated class

```php
get(string $classname or $alias)
```

## Usage

Create a container instance, the constructor accepts an optional config array.
Currently `autowiring` and `sharing` are supported, both set the default behaviour for those options.

```php
<?php
use Phico\Container;

// pass an optional array of parameters through the constructor
$c = new Container([
    'autowiring' => false, // default is true
    'sharing' => false, // default is true
]);
```

### Define a dependency

```php
<?php

use Phico\Container;
use Phico\Database\Database;

$container = new Container();
$container->set(Database::class, function (): Database {
    return new Database(config()->get('database'));
});
```

### Autowiring

With autowiring enabled, Container will do it's best to find and construct the class without any explicit instructions.
When autowiring is disabled, Container will need all definitions creating using `set()`

```php
<?php

use Phico\Container;

$container = new Container();

// set() accepts a string for simple cases
$container->set(Foo::class, Foo::class);

// or callables for classes that have constructor arguments
$container->set(Foo::class, function() {
    return new Foo::class(
        // pass arguments here
    )
});

// shorter function syntax is fine too
$container->set(Foo::class, fn() => new Foo());
```

### Aliases

To avoid keyboard wear add an alias using `alias()` after the call to `set()`;

```php
<?php

use Phico\Database\Database;

$container->set(Database::class, function (): Database {
    return new Database(config()->get('database'));
})->alias('DB');

// the following calls will return the Database class
$db = container()->get(Database::class);
$db = container()->get('DB');
```

### Sharing

By default container will always share instances once they have been created, so every call to `get()` will return the same instance.
If a unique instance is required then use the `share()` method after the `set()` definition.
`share()` expects a single boolean argument, `true` to share the dependency, `false` to return a unique instance every call.

```php
<?php

use Phico\Database\Database;

$container->set(Database::class, function (): Database {
    return new Database(config()->get('database'));
})->alias('DB')->share(false);

// the following calls will return unique instances of the Database class
$db = container()->get(Database::class);
$db = container()->get('DB');
```
