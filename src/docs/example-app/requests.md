# Requests
Phico is compatible with _Workerman_ for high performance simultaneous request environments, and the traditional _PHP-FPM CGI_ process manager.

The Phico _Request_ class normalises the raw HTTP request data from either environment into one with consistent api and behaviour allowing you to flip easily between environments.

:::info Phico is different to other frameworks
**It is crucial to understand that in Phico nothing can be shared globally.**

For example in other frameworks Sessions may be accessed through the global $_SESSION variable and this works as when the environment is a short lived process that dies when the connection is closed.

However Phico is designed for use with Workerman where each Phico instance is long lived and will share state amongst many requests.

This speeds up the app as it's not being built up and discarded with every request which is great.

However it does mean that the only unique thing in Phico is the _Request_.

You **do not** want to share your users sessions between users!

Therefore _everything must_ be attached to each request.
:::



## Request
The _Request_ object is populated from the raw HTTP request data which is readonly (immutable) apart from the `attributes` which may be populated as needed.
For example the `session` and `translation` classes may be added to the _Request_ attributes and accessed later on in your code.

The most useful methods are detailed below, for more detailed information see the [Request documentation](/docs/phico/request.html).

### Input
Grab the request body using the `input()` method which returns a _Capsule_ instance.
```php
$input = $request->input();
$name = $input->get("name");
// the standard capsule methods are available
$data = $input->only("name, email");
```

### Route parameters
Routes defined with placeholders can be accessed through the `route()->param()` method.
```php
// pass a second argument as a default
$name = $request->route()->param("name", "anonymous coward");
```

### Query parameters
Url query parameters can be accessed through the `uri()->param()` method
```php
// pass a second argument as a default
$page = $request->uri()->param("page", 1);
```

@TODO change this confusion to query() and param() ?

### Attributes
Use the _Request_ attributes to attach context to the request.
This is most useful when attaching behaviours through middleware.
For example, the `LocaleMiddleware` will attach a `Translation` object configured for the current users locale.
Or the `SessionMiddleware` will attach a `Session` object to the Request representing the current users Session.
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
