::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Session
Phico requires specialised session support to adapt to PHP-FPM and Workerman environments.
The standard PHP sessions will not work and should not be used.

## Installation
Install using composer.

```sh
composer require phico/session
```

## Config
Session config should be passed as an array
```php
$config = [

    // set the cookie parameters
    'cookie' => [

        'name' => 'ssn',

        'options' => [
            'expires' => 0,
            'path' => '/',
            'domain' => '',
            'secure' => false,
            'httponly' => true,
            'samesite' => 'Lax',
            'prefix' => '',
            'encode' => false,
        ],

    ],

    // set the Time To Live in seconds, sessions will expire after this time
    'ttl' => 3600
];
```

## Usage

### Instantiating the Session
Use the session middleware to pass the session through the Request.

```php
public function use(): array
{
    return [
        \Phico\Session\SessionMiddleware::class
    ]
}

```

### Storing Data
To store data in the session, use the `set` method.

```php
$session->set('key', 'value');

// or shorthand
$session->key = $value;
```

### Retrieving Data
To retrieve data from the session, use the `get` method. You can provide a default value that will be returned if the key does not exist.

```php
$value = $session->get('key');

// optionally specify a default value if key is not in the session
$value = $session->get('key', 'default');

// or shorthand without specifying a default
$value = $session->key;

```

### Checking for Data
To check if a key exists in the session, use the `has` method.

```php
$exists = $session->has('key');
```

### Flash Messages
Flash messages are used to store data that should be available for only the next request.

#### Setting Flash Messages
```php
$session->flash('flash_key', 'flash_value');
```

#### Retrieving Flash Messages
Flash messages are retrieved using the same `get` method.
```php
$flashValue = $session->get('flash_key');
```

### Deleting the Session
To delete a session, use the `delete` method. This removes the session data from the storage.
```php
$session->delete();
```

### Accessing the Session ID
The session id is readonly
```php
$id = $session->id;
```

### Regenerating the Session ID
To create a new session id use the `regenerate` method, this will remove the old session from storage.
```php
$session->regenerate();
```
