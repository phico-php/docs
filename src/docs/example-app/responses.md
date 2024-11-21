# Responses
When you app code returns back to Phico it should return a _Response_.
Use the `response()` helper to create a new _Response_ instance.

The helper accepts a single argument, the HTTP status code to respond with.

By default it responds with 200 OK.

```php
return response()->text("everything is okay");
```

Response methods are chainable
```php
return response(422)->json([
    "status" => "invalid",
])->noCache();
```

The most useful methods are detailed below, for more detailed information see the [Response documentation](/docs/phico/response.html).

## Media types

### Html
```php
return response()->html("<h1>Hello world!</h1>");
```

### Json
```php
// set an invalid status code
return response(422)->json([
    "status" => "invalid",
    "errors" => [
        "name" => "Please enter your name"
    ]
]);
```

### Text
```php
return response()->text("really, everything is okay");
```

## Cookies
Attach cookies to responses
```php
response()->cookie("session", "abc1234");
```
Set the cookie options by passing a config array.
```php
// these are the default options
response()->cookie("session", "abc1234", [
    "expires" => 0,
    "path" => "/",
    "domain" => "",
    "secure" => true,
    "httponly" => true,
    "samesite" => "Lax",
    "prefix" => "",
    "encode" => false,
]);
```

## Helpers

### Download
Provide a path to a file to download it.
```php
return response()->download("/path/to/file.txt");
```
You may also provide a different filename.
```php
return response()->download("/path/to/file.txt", "Important.txt");
```
### Empty
Sets an empty response with a 204 status code.
```php
response()->empty();
```
## Redirect
Sets the location header to redirect the client.
```php
response()->redirect("https://example.com/path/to");
// the default status code is 302 (temporary), override it as needed
response()->redirect("/new/path", 301);
```
