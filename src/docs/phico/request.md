::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Request

Request standardises CGI and Workerman requests in a consistent API.
The current Request instance will be passed as the first argument to your Action or Controller classes.

**NOTE:** Requests are essentially immutable, where they return _Capsule_ instances these will be readonly.
The only properties that can be set on a _Request_ is via the `attr()` method.

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
Provides access to the _accepts_ headers.
With no arguments it will return all the _accepts_ headers.
```php
$request->accepts();
// returns an array of accepts headers
```
If the first argument is provided then any matching headers are returned.
```php
$request->accepts("language");
// returns the accepts-language header content

// use 'media' to scan the media types header
$request->accepts("media");
// returns the media type, e.g. */*, text/html, application/json ...

```
If the first and second arguments are provided then bool true is returned if a match is found, false if no match is found.
```php
$request->accepts("charset", "utf-8");
// returns true if accepts-charset header content is utf-8

// use 'media' to scan the media types header
$request->accepts("media", "application/json");
// returns true if the accepts media type is application/json
```

### Attributes
Use the _Request_ attributes to attach context to the request.
This is most useful when attaching behaviours through middleware.
For example, the `LocaleMiddleware` will attach a `Translation` object configured for the current users locale.
Or the `SessionMiddleware` will attach a `Session` object to the Request representing the current users Session.

#### Attr
Get or set a Request attribute.
```php
// set a request attribute
$request->attr("locale" "en-GB");
...
// get a request attribute
$locale = $request->attr("locale");
```
#### Attrs
Returns a map of defined _Request_ attributes.
```php
foreach ($attrs as $k => $v) {
    echo "Got request attribute $k";
}
```

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
Returns a new immutable _Capsule_ instance containing the request body.
The `has()`, `get()`, `only()`, `except()` and `all()` methods can be used on the returned object.
```php
$input = $request->input();
$input->has("agreed_terms") {
    process($input->except("agreed_terms"));
}
```



### Method
Returns the http request method, GET, POST etc..
**NOTE** Phico does not support custom request methods.
```php
$method = $request->method();
```

## Route
The matched _Route_ instance is attached to the _Request_ and can be accessed using the `route()` method on the Request_ instance.
```php
$route = $request->route();
```

The _Route_ class has the following methods:

### Params
Returns a _Capsule_ containing the route parameters.
```php
// example route definition
$routes->get("/blog[/{year}[/{month}]]", Blog\Browse::class);
...
// in your code
$params = $route()->params();
echo "Results for {$params->year} during {$params->month}";
```

### Param
Returns a single parameter or a default.
```php
// example route definition
$routes->get("/blog[/{year}[/{month}]]", Blog\Browse::class);
...
// in your code
$params = $route->params();
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
Returns true if the upload has an error, false if not.

### isImage
Returns true if the upload is an image.
**NOTE** The file extension is ignored, this uses getimagesize() under the hood so can be trusted.

### Mime
Returns a Mime instance for the uploaded file.

### MoveTo
Moves the file to a new location, pass the second parameter to also rename the file.

### clientFilename
Returns the filename of the upload as specified by the client (not to be trusted).

### clientFileType
Returns the file type of the upload as specified by the client (not to be trusted).

### path
Returns the path to the folder containing the uploaded file.

### filename
Returns the filename of the uploaded file.

### filepath
Returns the complete filepath of the uploaded file (path and filename).

### uploadFilepath
Returns the temporary filepath of the uploaded file (as placed by the PHP process).

### size
Returns the size of the file

### error
Returns the error code and message as an associative array.

### errorCode
Returns the error code.

### errorMessage
Returns the error message.


## Uri
Returns the Request URI instance.
```php
$uri = $request->uri();
```

The URI object has the following methods.

### Param
Returns a named query parameter or the default if not found.

### Params
Returns a readonly _Capsule_ instance containing all the query parameters
The `has()` and `get()` methods can be used to check named query parameters.

### Segment
Returns the path segment at the specified index
**NOTE** This is a 1 based index

### Fragment
Returns the URI fragment

### Host
Returns the connection host

### Port
Returns the connection port

### Path
Returns the full path without the trailing slash

### Query
Returns the query string

### Scheme
Returns the HTTP scheme, normally http or https

### Raw
Returns the full uri as received by the class

### Url
Returns the host and path without the query and fragment

### User
Returns the connection user

### Password
Returns the connection password
