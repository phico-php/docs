::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# CLI

Lightweight terminal support.

## Installation

Using composer

```sh
composer require phico/cli
```

## Usage

CLI provides a handful of useful methods for terminal interaction.

It is useful when creating your own commands.

### Cli

#### Write a line to the terminal

```php
write('Hello world');
```

##### Continue on the same line

```php
write(', this is Phico', $newline = false);
```

##### Colour support

Use `error()`, `info()`, `success()`, `warning()` to display different highlight colours.

#### Request user input

```php
$input = prompt('What is your name? ');
```

##### Limit choices in response

```php
// only one of red, blue or green is accepted
$input = prompt('What is your favourite colour? ', [
    'red',
    'blue',
    'green
]);
```

#### Write a title

```php
$input = title('This will be underlined');

// This will be underlined
// =======================
```

#### Draw a table

```php

$data = [
    ['Kermit', 'Green'],
    ['Fozzy Bear', 'Brown'],
    ['Miss Piggy', 'Pink'],
    ['Gonzo', 'Blue'],
];
$headings = [ 'Name', 'Colour' ];

table($data, $headings);
```

## Args

Args handles terminal input by organising it into flags (short or long), arguments and values.

### Flags

Specify single character flags with a single dash

```sh
phico -v
```

Multiple single flags can be set with a single dash

```sh
phico -vrt
```

Use has() to check if a flag is set

```sh
phico -vrt
```

```php
$args->has('v'); // true
$args->has('r'); // true
$args->has('t'); // true

$args->has('a'); // false
```
