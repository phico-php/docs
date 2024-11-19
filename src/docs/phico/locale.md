# Locale

Locale provides multi language support.

## Installation

Install using composer

```sh
composer require phico/locale
```

## Config

Create a config file

```php
return array [
    // set the defaut locale
    'default' => 'en',
    // set the supported locales
    'supported' => [
        'en',
    ],
    // set paths
    'paths' => [
        '/path/to/folder',
    ],
    // set namespaces
    'namespaces' => [
        'name' => 'path/to/namespace',
    ]
];
```

## Usage

Every request has a unique `Translation` instance which is added to the `Request` attributes by the `TranslationMiddleware`, this ensures that Translation instances are not shared across concurrent requests.

::: info Workerman speedup
To avoid parsing and loading translation files on every request the `Mapper` instance is shared to each Translation. The translation files are loaded on demand, as Mapper can remain in the workers memory the translation maps will build up over time and will increasingly serve from memory rather than disk.
:::

### Middleware

The Translation middleware will pass a translation class instance to each request.

```php
// container.php

// create a definition for the Mapper passing in your config
$container->set(\Phico\Locale\Mapper::class, function() use ($config) {
    return new \Phico\Locale\Mapper($config->get('locale'));
})->share(true);
```

```php
// /path/to/your/middleware.php

// attach the TranslationMiddleware instance with the Mapper
$app->use([
    // other middleware...
    new \Phico\Locale\TranslationMiddleware(container()->get(\Phico\Locale\Mapper::class)),
    // other middleware...
]);
```

### Requests

If you have configured the middleware each request will receive a Translator configured with the current locale and shared Mapper instance.

Get the `Translator` instance from the `Request` attributes.

```php
// use the getter
$t = $request->attrs->get('translator');
// or
$t = $request->attr('translator');
```

### Translating strings

Assuming you have a file named `pages.php` in one of the configured paths.

```php
// pages.php
return [
    'welcome' => [
        'title' => 'Hello and welcome'
    ]
];

$str = $t->translate('pages.welcome.title');
// $str = 'Hello and welcome'
```

### Pluralisation

Pluralisation supports binary or range pluralisation.

#### Binary (singlular|plural)

Binary pluralisation supports singular and plural choices, it expects the passed count to be 1 or more.

```php
// apples.php
return [
    'quantity' => 'One apple|Many apples'
];

$str = $t->choice('apples.quantity', 1);
// $str = 'One apple'

$str = $t->choice('apples.quantity', 2);
// $str = 'Many apples'
$str = $t->choice('apples.quantity', 99);
// $str = 'Many apples'
```

#### Ranges

Range pluralisation supports multiple choices, it expects the passed count to be 0 (zero) or more.

```php
// apples.php
return [
    'quantity' => '[0] No apples|[1] One apple| [2,*] Many apples'
];

$str = $t->choice('apples.quantity', 0);
// $str = 'No apples'

$str = $t->choice('apples.quantity', 1);
// $str = 'One apple'

$str = $t->choice('apples.quantity', 2);
// $str = 'Many apples'
$str = $t->choice('apples.quantity', 99);
// $str = 'Many apples'
```

### Placeholders &amp; substitutions

Pass an array of substitutions as the second parameter to `translate()` to swap placeholders with the substitution values.

Note the `:` (colon) at the start of the placeholders, you do not need to add the colon to your substitutions array.

```php
// pages.php
return [
    'title' => 'Hello :name!'
];

$str = $t->translate('pages.title', ['name'=>'world']);
// $str = 'Hello world!'
```

If you want to capitalise the first letter of the substitution then capitalise the first letter of the placeholder.

```php
// pages.php
return [
    // the first letter of the substitution will be capitalised
    'title' => 'Hello :Name!'
];

$str = $t->translate('pages.title', ['name'=>'world']);
// $str = 'Hello World!'
$str = $t->translate('pages.title', ['name'=>'bob']);
// $str = 'Hello Bob!'
```

If you want to capitalise the entire substitution then capitalise the entire placeholder.

```php
// pages.php
return [
    // the first letter of the substitution will be capitalised
    'title' => 'Hello :NAME!'
];

$str = $t->translate('pages.title', ['name'=>'world']);
// $str = 'Hello WORLD!'
$str = $t->translate('pages.title', ['name'=>'bob']);
// $str = 'Hello BOB!'
```

### Switching locales on the fly

Set the locale using the `use()` method passing in one of the supported the locale codes (from your config).

**Unsupported locales are ignored.**

```php
$t->use('zn')->translate('pages.welcome.title');
```

### Setting a locale switching route

@TODO This will be replace by the `SetLocaleMiddleware` which will intercept a special locale route and handle this automatically.

```php
// routes.php
$routes->get('/locale/{lang:[a-z]{2,}}', \Phico\Locale\Actions\SetLocale::class);
```
