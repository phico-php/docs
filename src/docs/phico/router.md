::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Router
Router provides support for _named routes_, route middleware and the `pathFor()` helper function.

## Installation
Install via composer if required.
```sh
composer require phico/router
```

## Middleware
Add the middleware to your application
```php
// boot/middleware.php

// RouteHandler requires a Router instance, which requires the defined routes
$router = (new \Phico\Router\Router())->add($routes);

// middleware is called top to bottom
$app->use[

    // other middleware ...

    // the route handling middleware should be last
    new \Phico\Router\RouteHandler($router),
];
```

## Usage
### Routing
Use the `routes()` helper to get the Route collector instance.
```php
$routes = routes();
```
Then define your routes.

#### Methods
The Route Collector defines routes using the HTTP method verb `delete`, `get`, `head`, `options`, `patch`, `post`, `put`.

```php
$routes->delete("/users/{user_id}", "UsersController@delete");
$routes->get("/users", "UsersController@browse");
$routes->post("/users", "UsersController@create");
$routes->patch("/users/{user_id}", "UsersController@update");
$routes->put("/users/{user_id}", "UsersController@replace");

// head responses do not return a body
$routes->head("/users", fn() => response(200));
```

There are two additional methods, `all()` which matches all the above HTTP verbs and `any()` which accepts an array of HTTP verbs to match:

```php
// match all HTTP verbs
$routes->all("/admin", function() {
    echo "This route matches all HTTP methods";
});

// match only the GET and POST HTTP methods (case insensitive)
$routes->any(["get","post"], "/all", function() {
    echo "This route matches the GET and POST HTTP methods";
});
```

#### Placeholders
Router uses the same regex as FastRoute and is broadly compatible with the syntax of [Slim](https://www.slimframework.com/docs/v4/objects/routing.html#route-placeholders).
```php
// a named parameter
$routes->get("/hello/{name}", function($request) {
    // get the 'name' parameter from the Route parameters
    $name = $request->route()->param("name");
});
```

##### Optional placeholders
Use square brackets to identify optional placeholders.
```php
$routes->get("/hello[/{name}]", Hello::class);
// optional segments can be nested
$routes->get("/blog[/{year}[/{month}]]", Blog\Browse::class);
```

##### Regex matching
Placeholders can be restricted by regex to provide basic input filtering.
```php
// only allow digits for the user 'id'
$routes->get("/user/{id:[0-9]+}", User\View::class);
```
#### Catchall route
Use `*` as a catchall route.

**NOTE:** Place this last in your routes.
```php
$app->get("*", function($request) {
    return response()->text([
        "Hmm, we can't find that, try this..."
    ]);
});
```

#### Naming routes
_Routes_ can be named using the `name()` method after defining the route:
```php
$routes->get("/", "HomeController@index")->name("home");
```

#### Redirects
Use the `redirect()` method to quickly return a redirect response.
```php
// enter the path to match and the url to redirect to
$routes->redirect("/from/this/url", "https://example.com/to/here");

// by default the status code defaults to 302 (temporary redirect)
// change it using the third argument
$routes->redirect("/from/this/url", "https://example.com/to/here", 301);
```

#### Groups
_Routes_ can be organised into groups using the `group()` method.
**Note:** The routes collector is named `$group` inside the closure.
```php
$routes->group("/session", function() {
    $group->post("/", CreateSessionAction::class)->name("session.create");
    $group->delete("/", DeleteSessionAction::class)->name("session.delete");
});
```

#### Middleware
_Routes_ and _Route Groups_ support the `use()` method to attach middleware, this middleware will be called after the app middleware defined in `boot/middleware.php`.
```php
// attach middleware to a single route
$routes->get("/private", function() {
    return response()->json([
        "message"" => "This route is private and guarded by the PrivateGuardMiddleware",
    ]);
})->use([
    new PrivateGuardMiddleware::class
]);

// attach middleware to a route group
$routes->group("/admin/blog", function() {
    $group->get("/", BrowsePostsAction::class)->name("admin.blog.browse");
    $group->post("/", CreatePostAction::class)->name("admin.blog.create");
    $group->get("/{public_id}", ShowPostAction::class)->name("admin.blog.show");
    $group->patch("/{public_id}", UpdatePostAction::class)->name("admin.blog.update");
    $group->delete("/{public_id}", DeletePostAction::class)->name("admin.blog.delete");
})->use([
    new AuthMiddleware::class
]);
```

### Route
The matched _Route_ instance is attached to the _Request_ and can be accessed using the `route()` method on the Request_ instance.

#### Params
Returns a _Capsule_ containing the route parameters.
```php
// example route definition
$routes->get("/blog[/{year}[/{month}]]", Blog\Browse::class);

...

// in your code
$params = $request->route()->params();
echo "Results for {$params->year} during {$params->month}";
```

#### Param
Returns a single parameter or a default.
```php
// example route definition
$routes->get("/blog[/{year}[/{month}]]", Blog\Browse::class);

...

// in your code
$params = $request->route()->params();
if ($params->year and $params->month) {
    // filter by year and month
} elseif ($params->year) {
    // filter by year
} else {
    // no filter
}
```

#### Name
Returns the name of the Route.
```php
$route->name(); // home
```

#### PathFor
Returns the path to the route, any required placeholders must be provided.
```php
// route definition
$routes->get("/blog[/{year}[/{month}]]", Blog\Browse::class)->name("blog.browse");

// returns /blog
$route->pathFor("blog.browse", []);

// returns /blog/2024
$route->pathFor("blog.browse", ["year" => 2024]);

// returns /blog/2024/dec
$route->pathFor("blog.browse", [
    "year" => 2024,
    "month" => "dec"
]);
```
