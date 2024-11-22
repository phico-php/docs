## Seeds
The seeds CLI tool creates and run seeds on the database.
**Note** Seeds can be run multiple times creating duplicate data.
If you wish to remove seeded data at some point in the future consider adding an `is_seeded` flag in your table.

### Config
The seeds config expects a `seeds` key in the `config/database.php` file.
-**path** The path to the folder containing the seeds files.
-**connection** The database connection to use, which must have permission to insert data.

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
]
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
