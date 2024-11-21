# Routes

Routes connect your app urls with your _Action_ or _Controller_ classes.

## Actions or Controllers
The traditional approach in web development is often the MVC (Model, View, Controller) pattern.
In this approach the responsibility for managing the Request happens in the _Controller_, handling things like authorisation and validation.
Data procesing tends to happen in the _Model_ such as fetching and saving from persistence.
And the user is given feedback via the _View_ which combines templates with data to give useful feedback.

Actions and Controllers do exactly the same thing, the main difference is architectural.
A Controller may contain many methods relating to each url in a particular module of code.
Whereas an Action only ever handles one method (GET, POST etc..) in a RESTful API this may be preferred.

### MVC vs ADR
While MVC (Model View Controller) is probably the default approach, ADR (Action Domain Response) has it's adherants.
For more information on ADR read the [original article](https://pmjones.io/adr/) by Paul M Jones.

Phico does not push an architectural style on your app.

The disadvantage of ADR is an increased number of classes in your app, however this does enable the developer to get a good overview of the app by checking the list of classes in the Actions folder.

### Actions
To connect a route to an Action class (which must have an __invoke method) just provide the class name e.g. `BrowseAction::class`:
```php
// app/Blog/routes.php

namespace Blog\Actions;

$routes->group('/blog', function ($group) {
    $group->get('/', BrowseAction::class)->name('blog.browse');
    $group->get('/{slug}', ShowAction::class)->name('blog.show');
});
```

The _Action_ class could look something like this:
```php
<?php

namespace Blog\Actions;

class BrowseAction
{
    public function __construct(
        protected PostsRepository $posts,
    ) {
        $this->posts = $posts;
    }

    public function __invoke(Request $request): Response
    {
        return response()->json([
            'status' => 'ok',
            'posts' => $this->posts->fetch(
                $request->uri()->param("page")
            ),
        ]);
    }
}
```

### Controllers
Connect a route to a Controller class by providing the controller and method name separated by an '@' symbol.
```php
// app/Blog/routes.php

$routes->group('/blog', function ($group) {
    $group->get('/', "\Blog\BlogController@browse")->name('blog.browse');
    $group->get('/{slug}', "\Blog\BlogController@show")->name('blog.show');
});
```

The _Controller_ method will receive the _Request_ instance and should return a _Response_.
```php
<?php

namespace Blog;

class BlogController
{
    public function browse(Request $request): Response
    {
        return response()->json([
            'status' => 'ok',
            'posts' => $this->posts->fetch(
                $request->uri()->param("page")
            ),
        ]);
    }
    public function show(Request $request): Response
    {
        return response()->json([
            'status' => 'ok',
            'post' => $this->posts->fetchBySlug(
                $request->route()->param("slug")
            ),
        ]);
    }
}
