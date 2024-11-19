---
title: Quick start
---

# Quick start

## TL;DR

```sh
git clone git@github.com:phico-php/app.git
composer init
composer serve
```

## Clone one of the app skeletons

Phico offers three starter skeletons, they are minimally different so it doesn't matter too much which one you start with.

Every skeleton includes an identical suggested filesystem:

- **app-lite** pulls in the _minimal required_ packages.
- **app** pulls in all _required_ and _recommended_ packages.
- **app-example** pulls in all _required and recommended_ packages and provides additional code examples.

If it's your first time installing Phico then try the **app-example** install

```sh
git clone git@github.com:phico-php/app-example.git
```

Choose **app-lite** if you prefer to choose other packages.

```sh
git clone git@github.com:phico-php/app-lite.git
```

Choose **app** if you want to use the Phico library packages (Recommended):

```sh
git clone git@github.com:phico-php/app.git
```

### The suggested file structure

Each of the above skeletons provides the following folder structure:

```sh
app/                -- Application code, actions, controllers, events, models ...
boot/               -- All setup files live here
    container.php   -- define your complex objects here
    events.php      -- app event listeners live here
    functions.php   -- override the built in Phico functions
    middleware.php  -- app middleware lives here
    routes.php      -- app routes live here
config/             -- All config files live here
    app.php         -- configure app variables
    container.php   -- set container path and options
    logger.php      -- set logger level and filepath
    view.php        -- set view renderer and options
public/             -- Ensure your server webroot is pointing here
    favicon.ico     -- Avoids spamming logs with 404s
    index.php       -- entry point to the app
storage/            -- All writes are contained here, make sure permissions are set correctly
    logs/           -- check here for the app logs
    uploads/        -- temporary storage for uploaded files
    views/          -- view templates are cached here
boot.php            -- sets up the environment and starts Phico
```

**NOTE:** You are free to to follow any structure you prefer by adjusting the `index.php` file and `boot.php` files as needed for your application.

#### Storage permissions

NB: Make sure that the `storage` folder can be written to by the user your webserver is running under.

## Initialise the app

Creates the inital `.env` file and generates a unique application key

```sh
composer init
```

## Create your first route

Open the `boot/routes.php` file, normally you might want to include other routes files here.

For now we'll create a simple hello world example route which returns a JSON response.

```php
# /app/routes.php
$app->get('/hello/{name}', function ($request) {

    return response()->json([
        'status' => 'ok',
        'message' => "Hello {$name}"
    ]);

});
```

## Serve the app

Serve the app using the built-in PHP websever

```sh
composer serve
```

Check it in your browser [here](http://localhost:8080/hello/phico)

## Next steps

Once you have the install working you might want to familiarise yourelf with the core Phico code and it the available library packages.
