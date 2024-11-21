# Database

Database provides solutions for managing typical database operations including:

- Managing multiple connections
- Handling query execution
- Transactions &amp; savepoints
- Schema generation
- Migrations

Database uses PDO so any supported database can be used, however only MySQL, PostgreSql and SQLite have been tested.

## Installation

Require via composer:

```sh
composer require phico/database
```

## Config

Database expects a structure config array containing two keys, _use_ and _connections_.

```php
return [
    // the name of the default connection
    'use' => 'default',
    // list of configured connections
    'connections' => [
        // the default connection
        'default' => [
            'driver' => 'mysql',
            'database' => 'example-db',
            'charset' => 'utf-8',
            'host' => 'my.database.server.net',
            'port' => 3306,
            'username' => 'username',
            'password' => 'password',
         ],
         // a PostgreSQL server on a local socket
         'local' => [
            'driver' => 'pgsql',
            'socket' => '/var/run/pgsql.sock',
            'username' => 'username',
            'password' => 'password',
            'database' => 'example-db',
         ],
         // in memory sqlite database
         'local' => [
            'driver' => 'sqlite',
            'database' => ':memory:'
         ],
    ],
];
```

## Usage
