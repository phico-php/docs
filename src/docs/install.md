::: warning Phico is a work in progress
Phico is currently a work in progress, errors, omissions and changes are to be expected.
:::

# Installation
The easiest way to get started with Phico is to install one of the App skeletons from the github repo.

There are three skeleton apps to choose from, _App-Example_, _App_ and _App-Lite_.

_App_ and _App-Example_ are almost identical pulling in all advised packages for a fuller featured app with one containing some example code.

_App-Lite_ pulls in only the bare minimum packages.

The filesystem layout for all three are identical.

## Skeleton installs
Choose whichever fits your needs best below, if it's your first install then I'd suggest installing the App-Example repo.

### App
An app layout for Phico with all optional packages (without the code examples)

```sh
git clone git@github.com:phico-php/app.git your-folder
```

### App Example
An app layout for Phico with all optional packages and code examples

```sh
git clone git@github.com:phico-php/app-example.git your-folder
```

### App lite
An app layout for Phico with the only the minimum required packages

```sh
git clone git@github.com:phico-php/app-lite.git your-folder
```

## Manual installs
Phico can be required by composer directly into your existing project.

You will have to make the necessary changes to your boot or init scripts to ensure that Phico can find the files it needs.
Edit the files in the `config` and `boot` folders to handle your folder layout.

Check the App-Lite example above for details of how to boot Phico.

```sh
composer require phico/phico
```
