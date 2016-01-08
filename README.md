# bennedetto

[![Join the chat at https://gitter.im/arecker/bennedetto](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/arecker/bennedetto?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The simple, turn-based budget.

[![Build Status](https://travis-ci.org/arecker/bennedetto.svg)](https://travis-ci.org/arecker/bennedetto)

## About

Bennedetto is a fresh, minimalist take on tracking your spending.  Use the tool to

1. Simplify your regular income and outcome into a single "$X per day" figure
2. Track your day-to-day spending with as little overhead as possible
3. Watch your progress with instant, usable feedback.

Read more about the project's inception [here](http://alexrecker.com/our-new-sid-meiers-civilization-inspired-budget/)

## Building

To build the project, create a new virtual environment and activate it.

    $ virtualenv --no-site-packages ~/.virtualenvs/bennedetto
    $ source ~/.virtualenvs/bennedetto/bin/activate

Next, navigate to the source root, install the dev dependencies, and
run the migrations.

    $ cd ~/git/bennedetto
    $ make install-dev
    $ make migrate

Now create a superuser that will have access to both the django admin
and the app itself.

    $ make superuser

To start the webserver, run the familiar `python manage.py runserver` or use the alias provided in the Makefile

    $ make run

### Running inside Docker

To build the Docker image use

    $ docker build -t bennedetto .

After that you may run it thus:

    $ docker run -p 8000:8000 bennedetto

You can see the app now at http://localhost:8000

### Compiling JavaScript

Rollups of the vendor scripts and stylesheets are available for those
who aren't interested in clientside code, but if you _do_ wish to hack
the frontend, you will need to install some extra dependencies.

First, ensure `node` and `nodejs-legacy` are installed for your
distribution.

Next, globally install the grunt package.

    $ sudo npm install -g grunt-cli

Lastly, install the project npm dependencies

    $ npm install

You should now be able to recompile the static resources with the
command `grunt build`.

## Running

Once your create a superuser as described in the build steps, you have
access to the site as well as the admin page.

You can also register inferior users by more natural means by the
"register" link on the login page.

To automatically calculate rates and "open" each day, setup an hourly
cronjob to trigger the `transact` job.  It should look something like
this.

    0 * * * * /path/to/python /path/to/bennedetto/manage.py transact

The job is intended to run hourly to account for different timezones.
The app should open up each user's day precisely at _their_ midnight.

## Testing

To run the serverside tests

    $ make test

Alternatively, you may install `tox` and run them that way.

To run the clientside tests

    $ grunt test

## Standards

Keep these nitpicks in mind when submitting pull requests

### Commit Messages

* Git's recommendation of (1) a subject less than 50 characters, (2) a blank line following the subject, and (3) a body wrapped at 72 characters per line
* Present tense
* Feature in subject if applicable

_Example:_

    Authentication: removes password hardcodes from config

    Refactors authentication to allow the user to choose
    their password, rather than hard coding one for them

### Python

I'd this project to follow [PEP8](https://www.python.org/dev/peps/pep-0008/) as closely as it can.  However, in the spirit of avoiding _foolish consistency_, certain things are fine.

* Lines falling past 80 characters are fine, so long as they are readable
* For long lines, hanging indents are preferred

_Example:_

```python
id = models.UUIDField(primary_key=True,  # hanging indents
                      editable=False,    # for long lines
                      default=uuid4,
                      unique=True)
```

* Django app names should be '-ing' words (e.g. _tracking_, _authenticating_)

### JavaScript

* Address warnings raised by JSHint
* Wrap each file in an IIF that invokes strict mode
* Use named functions as often as possible

_Example_:

```javascript
(function() {
    'use strict';

    function MySomething() {
        /* stuff */
    }

    angular
        .module('bennedetto')
        .something('MySomething', [MySomething]);
}());
```

### Personality

* Don't be a jagweed
