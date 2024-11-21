# CDN
Lightweight CDN support provides methods to get and set items in a private cdn.
AWS and Cloudflare R2 are tested but any S3 storage should work.

## Installation
Using composer
```sh
composer require phico/cdn
```

## Usage
CDN provides quick and simple access to AWS S3 and Cloudflare R2 private CDNs.

### Objects
```php
// put a local file on the cdn
$cdn->put('path/to/local/file.txt', '/path/on/cdn/file.txt');

// retrieve the file content
$content = $this->cdn->get('/path/on/cdn/file.txt');

// delete the file
$cdn->delete('/path/on/cdn/file.txt');
```

#### Switching buckets
If you have connected with the necessary permissions you can switch buckets.
```php
$cdn->bucket('other-bucket')->put('local/file.txt', 'uploads/file.txt');
$cdn->bucket('backup-bucket')->put('local/file.txt', 'uploads/file.txt');
```

### Buckets
If you have connected with the necessary permissions you can manage buckets.
```php
// list all buckets
$array = $cdn->buckets();

// create a bucket on the cdn
$cdn->bucket('tmp')->create();

// list objects in the bucket
$array = $cdn->bucket('tmp')->list();

// switching a bucket will be remembered so the above two lines could be shortened to
$array = $cdn->bucket('tmp')->create()->list();

// delete the bucket from the cdn
$cdn->bucket('tmp')->delete();
```
