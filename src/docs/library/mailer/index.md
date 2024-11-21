# Mailer
Mailer provides an easy way to create mail messages and send them via PHPs built in `mail()` function or an SMTP server.
It has no dependencies and talks directly to teh SMTP server providing detailed logs in case of errors.

## Installation
Install via composer:
```sh
composer require phico/mailer
```

## Config
Mailer expects the following config.
```php
<?php

return [

	'use' => env('MAILER_USE', 'file'),

	'to' => [
		'name' => env('MAILER_TO_NAME'),
		'address' => env('MAILER_TO_ADDRESS'),
	],

	'from' => [
		'name' => env('MAILER_FROM_NAME'),
		'address' => env('MAILER_FROM_ADDRESS'),
	],

	'transports' => [

		'file' => [
			'filepath' => env('MAILER_FILE_FILEPATH', sprintf('storage/logs/mail-%s.log', date('Y-m-d'))),
		],

		'mail' => [
			'params' => env('MAILER_MAIL_PARAMS', ''),
		],

		'smtp' => [
			'username' => env('MAILER_SMTP_USERNAME', ''),
			'password' => env('MAILER_SMTP_PASSWORD', ''),
			'host' => env('MAILER_SMTP_HOST', ''),
			'port' => env('MAILER_SMTP_PORT', ''),
			'security' => env('MAILER_SMTP_SECURITY', ''),
		],

	],
];
```

## Usage

### Sending an email

```php
// create an email message
$email = email()
    // an email must have at least one recipient
    ->to('bob@example.com')
    // add the name as the second argument
    ->to('jill@example.com', 'Jill')
    // the from address will be populated from config, but you can override it
    ->from('phico@phico-php.net', 'Phico PHP')
    // optionally add a reply-to address
    ->replyTo('admin@phico-php.net')
    // keep subjects descriptive
    ->subject('Hello from Phico')
    // send text or html
    ->text('Hi, just wanted to say hi from the mailer');
    // send html as well if you want (view() can be useful here)
    ->html('<p>Hi, just wanted to say <cite>hi</cite> from the mailer</p>');

// tell mailer to send it (sends via the default transport)
mailer()->send($email);

// if you have multiple transports defined in your config,
// you can switch them on the fly
mailer()->via('gmail')->send($email);
mailer()->via('outlook')->send($email);
mailer()->via('private')->send($email);
```

### Adding attachments
Adding an attachment is straightforward
#### AttachFile
Attaches a file to the message using the filename and the path to the file.
```php
email()->attachFile("Important Memo.doc", "/path/to/the/file.doc");
```
#### AttachString
Attaches the passed string as a file.
Optionally add a third parameter to specify the file mime type.
```php
email()->attachString("Important Memo.md", "#Memo\nPlease read this, it is very important.", "text/markdown");
```
