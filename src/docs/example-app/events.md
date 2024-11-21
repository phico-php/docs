# Events

Phico has a simple events system built in.

## Listeners
Listeners can be callables or invokable classes.
In the example apps they are configured in `boot/events.php`.
```php
<?php
// listen for the blog browse error event
$events->add('blog.browse.error', function ($event) {
    // get the event id
    $id = $event->id();
    // get the event context (a readonly Capsule instance)
    $context = $event->context();
    // do something with the event
    logger()->error(
        "got event: {$id}",
        $context->only('request')
    );
});
```
### Event
The _Event_ object is a simple container for the context which is a [_Capsule_](/docs/phico/support.html#capsule) instance.
It has two methods
- **id()** Returns the event id string.
- **context()** Returns the readonly context.


## Notify listeners
Use the `event()` helper to notify listeners, it accepts two arguments:
- **id** a string describing the event.
- **data** an optional array of context.

```php
<?php
// fire this event if the blog browse request fails
event('blog.browse.error', [
    'request' => $request,
]);
```
