# Database

Database provides solutions for managing typical database operations including:

- Managing multiple connections
- Handling query execution
- Transactions &amp; savepoints
- Schema generation
- Migrations

Database uses PDO so any supported database can be used, however only MySQL, PostgreSql and SQLite have been tested.

## Installation

Install via composer:

```sh
composer require phico/database
```

## Config

Database expects a structured config array containing two keys, _use_ and _connections_.

```php
return [
    // the name of the default connection
    'use' => 'remote',
    // list of configured connections
    'connections' => [
        // the default connection
        'remote' => [
            'driver' => 'mysql',
            'database' => 'example-db',
            'charset' => 'utf-8',
            'host' => 'my.database.server.net',
            'port' => 3306,
            'username' => 'username',
            'password' => 'password',
         ],
         // a PostgreSQL server on a local socket
         'socket' => [
            'driver' => 'pgsql',
            'socket' => '/var/run/pgsql.sock',
            'username' => 'username',
            'password' => 'password',
            'database' => 'example-db',
         ],
         // local sqlite database file
         'local' => [
            'driver' => 'sqlite',
            'database' => 'storage/database/local.sqlite'
         ],
         // in memory sqlite database
         'memory' => [
            'driver' => 'sqlite',
            'database' => ':memory:'
         ],
    ],
];
```

## CLI

Database has one CLI method `use` which connects the terminal to a configured database.

Connects to the configured `memory` database:

```sh
phico database use memory
```

## Usage

### Helper

Database has a helper `db()` which returns a configured `Database` instance.

```php
$db = db();
```

### Connections

Database supports multiple connections, in the example config above there are four available connections `remote`, `socket`, `local` and `memory` where `remote` is specified as the default connection by the `use` option.

**NOTE** Database will lazy-load the default connection on instantiation, the connection instance is created but a PDO connection to the database server is not created until it is required.

#### Changing connections

The `use()` method switches between configured connections. The `using()` method returns the name of the current connection.

```php
// create a Database instance using the default connection
$db = db();
echo $db->using();
// returns 'remote' as that is defined as the default connection in the config above.

// create a Database instance using the `local` connection
$db = db('local');

// switch connections from the default (remote) to the local connection
$db = db();
// using() = remote
$db->use('local');
// using() = local
```

### Queries

### Transactions

### Savepoints
