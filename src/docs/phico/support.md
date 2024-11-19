# Support

Support classes and functions.

## Quick Reference

### String helper

`str()` Returns a new `String` instance to quickly manipulate strings.
These methods are for internal use by Phico but exposed here in case they are useful.

For more complex string manipulation consider an external package such as [Stringy](https://github.com/voku/Stringy).

#### Convert json to string

```php
// optionally pass boolean as_array as the second argument
$json = str()->toJson($object, $as_array=false);
```

#### Decode json from string

```php
// optionally pass any flag constants as the second argument
$object = str()->fromJson($json, $flags = null);
```

#### Sanitise a string

```php
$clean = str()->sanitise($input);
// older alias str()->sanitize($input);
```

#### split a string on capitals

```php
$str = str()->splitOnCaps('ACapitalisedString);
// A Capitalised String
```

#### convert a string to camel case

```php
$str = str()->toCamelCase('This is Camel case);
// thisIsCamelCase
```

#### convert a string to kebab case

```php
$str = str()->toKebabCase('This is Kebab case);
// this-is-kebab-case
```

#### convert a string to pascal case

```php
$str = str()->toPascalCase('This is pascal case);
// This Is Pascal Case
```

#### convert a string to train case

```php
$str = str()->toTrainCase('This is train case);
// This-Is-Train-Case
```
