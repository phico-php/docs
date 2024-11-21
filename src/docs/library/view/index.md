# View
Phico supports multiple template renderers at once.
This makes it very easy to mix and match template syntax, gradually swapping between templating engines as needed.

## Supported renderers
### Blates (Blade)
Blades is a fork of the Plates renderer (see below) which caches templates to disk before converting them to plain PHP syntax for processing via Plates.
See the [Blates](https://github.com/indgy/blates) package repo for more details.

### Latte
The first truly secure and intuitive templates for PHP.
See the [Latte](https://github.com/phico-php/latte) package repo for more details.

### Plates
Plates is a native PHP template system that’s fast, easy to use and easy to extend.
See the [Plates](https://github.com/phico-php/plates) package repo for more details.

### Twig
Twig is a modern template engine for PHP.
See the [Twig](https://github.com/phico-php/twig) package repo for more details.

## Config
```php
<?php

return [

    'use' => env('VIEWS_USE', 'plates'),

    'renderers' => [
        // configure the plates renderer
        'plates' => [
            'file_extension' => env('VIEWS_FILE_EXTENSION', 'plates.php'),
            'default_path' => env('VIEWS_DEFAULT_PATH', 'app/Common/Views'),
            'folders' => [
                'account' => 'app/Account/Views',
                'auth' => 'app/Auth/Views',
            ],
            'functions' => [],
            'extensions' => [],
        ],

        // configure the twig renderer
        'twig' => [
            'file_extension' => env('VIEWS_FILE_EXTENSION', 'twig.html'),
            'default_path' => env('VIEWS_DEFAULT_PATH', 'app/Common/Views'),
            'folders' => [
                'account' => 'app/Account/Views',
                'auth' => 'app/Auth/Views',
            ],
            'functions' => [],
            'extensions' => [],
        ],

    ],

];
```
## Helper
Use the `view()` helper to render templates with data.
```php
// return a response containing the rendered HTML
return response()->html(
    view()->render("auth::login", $this->input($request));
);
```

### Switching renderers
The _View_ instance can switch between configured templating engines using the `use()` method.
```php
view()->use("twig")->render()
```

### Rendering templates
Call the `render()` or `template()` method to render a template file.
```php
view("blade")->render("users::welcome", ["name" => "Phico"]);
// will render welcome.blade.php in the configured users module folder
```

### Rendering strings
_View_ can render plain strings if needed.
<br>Take extreme care where the string has come from, **do not use untrusted input**.
```php
view()->string("Hello {{ name }}", ["name" => "World"]);
```


@TODO document View
