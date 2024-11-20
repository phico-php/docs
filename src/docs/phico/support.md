::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Support
Support classes and functions.

## Strings
`str()` Returns a new `String` instance to quickly manipulate strings.
These methods are for internal use by Phico but exposed here in case they are useful.

For more complex string manipulation consider an external package such as [Stringy](https://github.com/voku/Stringy).

### Convert json to string
```php
// optionally pass boolean as_array as the second argument
$json = str()->toJson($object, $as_array=false);
```

### Decode json from string
```php
// optionally pass any flag constants as the second argument
$object = str()->fromJson($json, $flags = null);
```

### Sanitise a string
```php
$clean = str()->sanitise($input);
// older alias str()->sanitize($input);
```

### split a string on capitals
```php
$str = str()->splitOnCaps('ACapitalisedString);
// A Capitalised String
```

### convert a string to camel case
```php
$str = str()->toCamelCase('This is Camel case);
// thisIsCamelCase
```
### convert a string to kebab case
```php
$str = str()->toKebabCase('This is Kebab case);
// this-is-kebab-case
```

### convert a string to pascal case
```php
$str = str()->toPascalCase('This is pascal case);
// This Is Pascal Case
```

### convert a string to train case
```php
$str = str()->toTrainCase('This is train case);
// This-Is-Train-Case
```

## Capsule

The _Capsule_ class is a generic class that encapsulates properties and their values and standardises access to them through getters and setters.
Capsule objects expose all their properties when json encoded, override the `jsonSerialize()` method to change this behaviour.

### All
Returns a map of all the class properties and values.
```php
$input = new Capsule($request->input());
foreach ($input->all() as $k=>$v) {
    ...
}
```

### Only
Returns a map of the requested class properties and values.
```php
$input = new Capsule($request->input());
foreach ($input->only(['name','email']) as $k=>$v) {
    ...
}
// string definitions are supported too
foreach ($input->only('name, email') as $k=>$v) {
    ...
}
```

### Except
Returns a map of all the class properties and values, except those specified.
```php
$input = new Capsule($request->input());

// use a comma separated string
$fields = $input->except('password,token,hash');
// or an array
$fields = $input->except(['password','token','hash']);
```

### Get
Returns a property value, or the default if it is not set.
```php
$obj->get("created_at", Date::now());
// will return the value of "created_at" or Date::now() if it's not set
```

### Set
Sets a property value, normalising the property name.
```php
$obj->set("created_at", Date::now());
```

### Has
Returns true if the named property is set, false if not.
```php
if ( ! $obj->has("created_at", Date::now()) {
    $obj->set("created_at", Date::now());
}
```


### Normalise
Override the `normalise()` method to normalise property names
```php
<?php

use Phico\Capsule;

class Stuff extends Capsule
{
    // normalise the property names to lowercase
    protected function normalise(string $name): string
    {
        return strtolower($name);
    }
}
```

## DotAccess
@TODO finish DotAccess examples

The DotAccess trait provides dotted access to nested array values
```
class MyClass
{
  // require the trait
  use \Phico\DotAccess;
}
```

### dotHas
Returns true if a key is found in the passed array, false if not.


### dotGet
Returns a value by key from the passed array, or a default if not found

### dotSet
Sets a key value in the passed array

### dotUnset
Removes a key and value from the passed array
