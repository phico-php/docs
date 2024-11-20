::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Why Phico
After buiding backend services with Laravel and Slim for a number of years and enjoying their respective advantages I found myself longing for an alternative, something smaller, lighter and easier to work with.

**Homage to Laravel and Slim**

Slim is a great framework, it's lightweight, reliable, correct, well documented and coded and supports PSR standards. But still does too much by bending over backwards to allow developers to replace any part of it, this transparency increases complexity, it's the age old _convention over configuration_ debate.

Laravel is also a great framework offering almost every tool required to develop robust applications quickly and a great ecosystem to almost plug and play solutions.
However the kitchen sink philosophy has drawbacks too, additional features while useful for a quick prototype often rely on a large number of dependencies that can become costly to manage over the long term.
The additional code makes Laravel a heavyweight framework and it regularly appears at the bottom of the [TechEmpower framework benchmarks](https://www.techempower.com/benchmarks/#hw=ph&test=composite&section=data-r22&l=zik073-cn3).

Laravel is famed for it's excellent templating system _Blade_ and it's database schema builder and SQL query generator _Eloquent_.
However trying to use Eloquent or Blade outside of Laravel is not ideal.

I had created a couple of projects to mimic the functonality I missed from Laravel including [Scythe](https://github.com/dijitaltrix/Scythe-View) and [Phluent](https://github.com/indgy/phluent) and while not perfect these two packages enabled me to enjoy most of the things I loved from Laravel in a Slim project.

After using Slim v4 I wondered what a core library would like like if it were stripped to the absolute minimum.

I created some concepts, but over time realised that the bare minimum is often too bare.

Phico is now larger and does more than I originally intended, however with it's additional packages it is an extremely capable framework.

**Supports any architecture**

Phico imposes no code or architecture style on your application, all it requires is that your code returns a _Response_ object after receiving a _Request_ object, that's it.
Use _Actions_, _Controllers_ or _Callables_ as the entry into your application.

**Does as little as possible**

Phico is designed return a response as quickly as possible.
The rationale is that every line of code has a cost, either a cost in terms of time to write it, a cost in terms of the CPU to process it and the longer term cost of increased complexity and bugginess that eventually stifles many applications.

It also helps reduce dependencies.

**Dependency free**

External libraries enable us to quickly build solutions and avoid re-inventing th the wheel.
However we don't control external libraries and many open source projects stop being developed over time.
When dependencies are abandoned or get stale we either have to fork and maintain them or find alternatives, each costs time.
A simple HTTP framework really should not need any dependencies.

Any required functionality should be part of the core.

Anything that helps but isn't required should be a package.

Anything not related to the framework is your job.
