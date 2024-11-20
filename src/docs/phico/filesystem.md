# Filesystem

Filesystem provides two helpers to manage `files()` and `folders()`.

## Files

The `files()` helper manages files on the local system providing the functionality for creating, reading, writing, copying, moving, and deleting files, as well as modifying file metadata including permissions and owner.

### Helper
Use the `files()` helper to get a _File_ instance, the helper requires the path to the file, which may not exist yet.
The _File_ methods are chainable.
```php
$file = files("logs/app.log");
$file->create()
    ->write("Log file turned over\n")
    ->append(date("Y-m-d H:i:s"));
```

### Exists
Verifies if the file exists in the specified path.
```php
if (files("/tmp/cache.out")->exists()) {
    echo "File '$file' exists.";
}
```
**NOTE:** Casting a file to string returns the full path to the file.

### Create
Creates the file and its parent directories if they do not exist.
```php
files("storage/logs/error.log")->create();
```

### Write
Writes content to a file, overwriting any existing content.
Creates the file and folder path if necessary.
```php
files("storage/logs/error.log")->write("Error: Something went wrong!");
```

### Append
Appends content to an existing file, creating it if it does not exist.
```php
files("storage/logs/app.log")->append("Log entry: Action completed.");
```

### Read
Reads the entire file content into a string.
```php
$content = $file->read();
echo $content;
```

### Read lines
Reads the file content line by line into an array.
```php
foreach (files("storage/logs/app.log")->lines() as $line) {
    echo $line . PHP_EOL;
}
```

### Copy
Copies the file to a specified destination, creating the destination folder path if necessary..
Prevents overwriting unless explicitly allowed.
```php
files("logs/app.log")->copy("backup/app.log");
```
Pass `true` as the second argument to allow overwriting the destination file if it exists.
```php
// Overwrites the destination file if it exists.
files("logs/app.log")->copy("backup/app.log", true);
```

### Move
Moves the file to a different directory, creating the destination folder path if necessary.
Prevents overwriting unless explicitly allowed.
```php
files("logs/app.log")->move("archive/app.log");
```
Pass `true` as the second argument to allow overwriting the destination file if it exists.
```php
files("logs/app.log")->move("archive/app.log", true);
```

### Rename
Renames the file, with an option to overwrite any existing file with the new name.
```php
// will not overwrite an existing file.
file("logs/app.log")->rename("app-2024-01-01.log", false);
```

### Delete
Deletes the file if it exists.
```php
files("/tmp/cache.out")->delete();
```

### Mtime
Fetches the last modification time as a Unix timestamp.
```php
$mtime = files("logs/app.log")->mtime();
echo "Last modified: " . date("Y-m-d H:i:s", $mtime);
```

### Owner
Changes the file owner and optionally its group.
```php
files("archive/app.log")->owner("root", "wheel");
```

### Permissions
Changes the file permissions using an octal value.
```php
files("archive/app.log")->permissions(0640);
```

## MIME

Use the `mime()` method on a _File_ to return a _Mime_ instance containing the mime information for the file.

```php
$mime = files("archive/app.log")->mime();
```

### Encoding
Returns the mime encoding for the file.
```php
files("archive/app.log")->mime()->encoding();
// text/text
```

### Extension
Returns the mime extension for the file or null if it cannot be determined
```php
files("archive/app.log")->mime()->extension();
// log
```

### Type
Returns the mime type of the file
```php
files("archive/app.log")->mime()->type();
//
```


## Folders

The `folders()` helper manages folders on the local system.

### Helper
Use the `folders()` helper to get a _Folder_ instance, the helper requires the path to the folder, which may not exist yet.
The _Folder_ methods are chainable.
```php
$folder = folders("storage/logs")->create();
foreach ($folder->list() as $file) {
    echo "\n$file";
}
```

### Exists
Verifies if the folder exists at the specified path.
```php
$folder = folders("logs");
if ($folder->exists()) {
    echo "Folder $folder exists.";
}
```
**NOTE:** Casting a file to string returns the full path to the file.

### Create
Creates the folder and its parent directories with specified permissions.
```php
folders("logs")->create(0755);
```
Use chaining to set the owner and permissions:
```php
$folder = folders("logs")
    ->create(0755)
    ->owner("app");
```

### List
Returns an array of non-hidden files and directories within the folder.
```php
$contents = folders("logs")->list();
foreach ($contents as $item) {
    echo $item . PHP_EOL;
}
```

### Copy
Copies the folder to a specified destination.
Prevents overwriting unless explicitly allowed.
```php
// pass true to overwrite existing folders.
folders("logs")->copy('backup/logs', true);
```

### Move
Moves the folder to a new location.
Supports overwriting the destination folder.
```php
// pass true to overwrite existing folders.
folders("logs")->move('archive/logs', true);
```

### Rename
Renames the folder by internally calling the `move()` method.
```php
// pass true to overwrite existing folders.
folders("logs")->rename("archive", true);
```

### Delete
Deletes the folder.
Supports a force option to remove non-empty directories.
```php
// pass true to force delete the folder and its contents.
folders("logs")->delete(true);
```

### Mtime
Fetches the last modification time of the folder as a Unix timestamp.
```php
$folder = folder("cache");
echo "Last modified: " . date("Y-m-d H:i:s", $folder->mtime());
```

### Owner
Changes the owner and optionally the group of the folder.
```php
folders("backups")->owner("backup", "archivers");
```

### Permissions
Updates the folder permissions using an octal value.
```php
folders("backups")->permissions(0750);
```
