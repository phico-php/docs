::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Request

Request standardises CGI and Workerman requests in a consistent API.
The current Request instance will be passed as the first argument to your Action or Controller classes.

## Request

### methodIs
Checks the current Request method against the passed argument.
Returns true on a match, false otherwise.
```php
$request->methodIs('get'); // true/false
// the argument is case insensitive
```

### isAjax / isXhr
Returns true if the `X-Requested-With` header is present.
```php
$request->isAjax(); // true/false
$request->isXhr(); // true/false
```

### Accepts

### Attrs

### Attr

### Cookie

### Cookies
The `cookies()` method returns a list of Request Cookies.
```php
foreach ($request->cookies as $cookie) {
    // cookie is a string
    ...
}
```

### Header

### Headers
The `headers()` method returns a list of HTTP headers.
```php
foreach ($request-->headers() as $header => $content) {
    ...
}
```
#### First
Returns the first header value if value is an array, or the only value if a single header was sent.
```php
$lang = $request-->headers()->first("accept-language");
// en-GB, en;q=0.9, en-US;q=0.8, pt;q=0.7, *;q=0.5
```
#### Sort
Returns an array in order of request preference, useful for accept headers
```php
$lang = $request-->headers()->sort("accept-language");
// en-GB
```

### Input

### Method

## Route
The matched _Route_ instance is attached to the _Request_ and can be accessed using the `route()` method on the Request_ instance.

### Params
Returns a _Capsule_ containing the route parameters.
```php
// example route definition
$routes->get("/blog[/{year}[/{month}]]", Blog\Browse::class);

...

// in your code
$params = $request->route()->params();
echo "Results for {$params->year} during {$params->month}";
```

### Param
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

### Name
Returns the name of the Route.
```php
$route->name(); // home
```

### PathFor
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


### Uploads

## Upload
Returns an _Upload_ instance representing an uploaded file.

### hasError

### isImage

### Mime

### MoveTo

### clientFilename

### clientFileType

### filename

### filepath

### path

### uploadFilepath

### size

### error

### errorCode

### errorMessage


## Uri
Returns the Request URI instance.

### Param

### Params

### Segment

### Fragment

### Host

### Port

### Path

### Query

### Scheme

### Raw

### Url

### User

### Password
