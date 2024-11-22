::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

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

Connect to the configured `memory` database:
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
The `use()` method switches between configured connections.
The `using()` method returns the name of the current connection.
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

#### Connection attributes
The connection PDO attibutes can be accessed through the `attr()` and `attrs()` methods.
```php
// fetch an attribute using the PDO constant
$driver = db()->attr(PDO::ATTR_DRIVER_NAME);

// fetch all connection attributes
foreach (db()->attrs() as $k=>$v) {
    ...
}
```

### Queries
Database has two methods for querying the database, `execute()` and `raw()`.
The `raw()` method is best used for modifying the database structure and executing queries without parameters.
For everything else use the `execute()` method which will secure the parameters.

See the documentation for [Query](/docs/library/query/index.html) to easily generate SQL statements.

#### Raw
Raw accepts one argument, the SQL to execute.

The response is an integer denoting the number of affected rows.
```php
$num = db()->raw("update table users set active = 0");
```
#### Execute
Execute accepts two arguments, the SQL to execute and an optional array of parameters.
Parameters can be a list when using `?` in your SQL or an associative array when using named parameters e.g. `:name`
The SQL and parameters are prepared by PDO before being executed to prevent SQL injection attacks.

The response is a [PDOStatement](https://www.php.net/manual/en/class.pdostatement.php) instance.
```php
$stmt = db()->execute("select & from users where id = ?", [456]);
if ($stmt->rowCount()) {
    $user = new User($stmt->fetch());
}
```
#### Last insert ID
Returns the last insert id on the current connection.
```php
$db->execute("INSERT INTO users (name, email) VALUES (?, ?)", ["Bob", "bob@example.com"]);
$id = $db->getInsertId();

// NOTE: For PostgreSQL connections the sequence is required:
$id = $db->getInsertId("users_id_seq");
```

### Transactions
Transactions ensure consistency when dealing with multiple queries.
- **Begin()** Starts a block of changes that can be rolled back.
- **Commit()** Commits the changes to the database.
- **Rollback()** Cancels the transaction, effectively 'undoing' any changes.

Transactions should be used inside a `try .. catch` structure.
```php
try {
    $db->begin();
    $db->execute('update users set active=0 where id=?', [456]);
    $db->execute('delete from history where user_id=?', [456]);
    $db->commit();

} catch (DatabaseException $e) {
    $db->rollback();
    // log error etc..
}
```

### Savepoints
Savepoint allow you to partially roll back to a specific point without undoing the entire transaction.
- **savepoint(name)** Create a named save point
- **rollbackTo(name)** Rollback to a named savepoint

Savepoints must be used inside a transaction.
```php
try {
    $db->begin();
    $db->execute('update users set active=0 where id=?', [456]);
    $bd->savepoint('deactivated-user');
    try {
        // errors in these two queries should not fail the entire transaction
        $db->execute('delete from comments where user_id=?', [456]);
        $db->execute('delete from history where user_id=?', [456]);
    } catch (DatabaseException $e) {
        $db->rollbackTo('deactivated-user');
    }
    $db->commit();

} catch (DatabaseException $e) {
    $db->rollback();
    // log error etc..
}
```

## Migrations
The migrations CLI tool creates and applies database migrations in batches.

### Config
The migrations config expects a `migrations` key in the `config/database.php` file.
- **table** The name of the table to track migrtions in, defaults to `_migrations`
- **path** The path to the folder containing the migrations files.
- **connection** The database connection to use, which must have permission to modify the database schema.

```php
<?php
return [
    "use" => "default",
    "connections" => [
        ...
    ],

    "migrations" => [
        "table" => env("DATABASE_MIGRATIONS_TABLE", "_migrations"),
        "path" => env("DATABASE_MIGRATIONS_PATH"", "resources/database/migrations"),
        "connection" => env("DATABASE_MIGRATIONS_CONNECTION"", env("DATABASE_USE", "default")),
    ],
];
```

Once the migrations connection is configured correctly initialise the migrations table via the CLI
```sh
phico database migrations init
```
This will create the migrations table in the database.
To reverse this run the `drop` command.
```sh
phico database migrations init
```

### CLI
Migrations are handled through the `database migrations` command.

#### Create
Create a new migration file
```sh
phico database migrations create name-of-the-migration
```
#### Done
List migrations have been run
```sh
phico database migrations done
```
#### Todo
List migrations that have not been run yet
```sh
phico database migrations todo
```
#### Do
Run the migrations in a batch together.
```sh
phico database migrations do
```
#### Undo
Revert the last batch of migrations.
This can be repeated until no batches remain.
```sh
phico database migrations undo
```


## Seeds
The seeds CLI tool creates and run seeds on the database.
**Note** Seeds can be run multiple times creating duplicate data.
If you wish to remove seeded data at some point in the future consider adding an `is_seeded` flag in your table.

### Config
The seeds config expects a `seeds` key in the `config/database.php` file.
- **path** The path to the folder containing the seed files.
- **connection** The database connection to use, which must have permission to insert data.

```php
<?php
return [
    "use" => "default",
    "connections" => [
        ...
    ],
    "migrations" => [
        ...
    ],

    "seeds" => [
        "path" => env("DATABASE_SEEDS_PATH", "resources/database/seeds"),
        "connection" => env("DATABASE_SEEDS_CONNECTION"", env("DATABASE_USE", "default")),
    ],
];
```

### CLI
Seeds are handled through the `database seeds` command.

#### Create
Create a new seed file
```sh
phico database seeds create name-of-the-seed
```
#### Run
Run all seed files
```sh
phico database seeds run
```
Run a named seed file
```sh
phico database seeds run name-of-the-file.php
```
