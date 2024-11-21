# Queue
Support for pushing and pulling jobs via a Beanstalk queue.

## Requirements
You must have access to a Beanstalkd server.

## Installation
Using composer
```sh
composer require pico-php/queue
```

## Usage
### Create a queue watcher
```sh
phico queue create watcher [module] [name]
```

```php
namespace App\{Module}\Watchers;

class {Name}Watcher extends \Phico\Queue\Watcher
{
    public function handle($payload)
    {
        logger()->info('handling queued job', $payload);
    }
}
```

### Submit a job
Use `put()` to put an item on the queue
```php
// create your payload
$data = [
    'foo' => 'Foo',
    'bar' => 'Bar',
];

// put() the payload on the queue
$job = queue($name)->put($data);
echo $job->id;
```

### Watch for jobs
```sh
phico queue watch --handler="\App\Module\Queue\MyHandler" [--watch="comma,separated,list,of,queue,names"]
```
