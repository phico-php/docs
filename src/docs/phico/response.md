::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Response

A _Response_ should be returned by your app code in response to a _Request_.
The _Response_ is then handled by the _ResponseHandler_ middleware.



```php
response()->json([
    "message" => "Are we there yet?"
]);
```

## Status codes
You can set the HTTP status code in the `response()` helper.
```php
response(422)->json([
    "message" => "Please fix these errors",
    "errors" => [
        "name" => "Please enter your name"
    ]
]);
```

## Body

### Html
Sets an HTML response
```php
response()->html("<h1>Hello World</h1>");
```

### Json
Sets a JSON response
```php
response()->json([
    "status" => "success",
    "message" => "Saved successfully"
    "data" => [
        "id" => 456123
    ]
]);
```

### Text
Sets a text response
```php
response()->text("This is a plain text response, good for a CLI app?");
```

#### Inspecting the body
Once the body has been set it can be accesed by the `body()` method.
```php
$body = $response->body();
```


## Helpers

### Download
Sets download headers for a file.
```php
response()->download("/path/to/file", "filename-for-browser.md");
```

### Empty
Sets an empty response with a 204 status code.
```php
response()->empty();
```

## Redirect
Sets the location header for the response
```php
response()->redirect("https://example.com/path/to");
// the default status code is 302 (temporary), override it as needed
response()->redirect("/new/path", 301);
```


## Caching

### Cache
Sets the `cache-control` headers for the response.
```php
// use a timestamp
response()->cache(time() + 36400);
// or a DateTime instance
response()->cache(new DateTime("+1 hour");
```

### Expires
Sets an expiry date for the response.
```php
// use a timestamp
response()->expires(time() + 36400);
// or a DateTime instance
response()->expires(new DateTime("2025-01-01: 00:00:01");
```

## No cache
Sets the no-cache headers for the response
```php
response()->noCache();
```

## Cookies
Returns the list of Cookies attached to the _Response_.
```php
foreach ($response->cookies() as $cookie) {
    // $cookie is an instance of Phico\Http\Response\Cookie
}
```
### Cookie
Sets a _Cookie_ in the response.
```php
response()->cookie("hide-popup", 1);
```


## Headers
Returns the Response Headers instance
```php
foreach (response()->headers() as $header => $content) {
    ...
}
// the headers object supports has()
if ($response->headers()->has("set-cookie")) {
    ...
}
```

### Header
Returns the matching header content or null
```php
if (response()->header("content-type") === "text/text") {
    ...
}
```
