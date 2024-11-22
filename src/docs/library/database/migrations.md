## Migrations
The migrations CLI tool creates and applies database migrations in batches.

### Config
The migrations config expects a `migrations` key in the `config/database.php` file.
-**table** The name of the table to track migrtions in, defaults to `_migrations`
-**path** The path to the folder containing the migrations files.
-**connection** The database connection to use, which must have permission to modify the database schema.

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
]
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
