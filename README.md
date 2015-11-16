# bennedetto

The simple, turn-based budget.

## Building

To build the project, create a new virtual environment and activate it.

    $ virtualenv --no-site-packages ~/.virtualenvs/bennedetto
    $ source ~/.virtualenvs/bennedetto/bin/activate

Next, while in the project directory issue the command `make dev-bootstrap`.  This will install the needed dependencies, perform the local database migrations, and prompt you to create a superuser.

Start the local development webserver with `make run`

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

I'll add some more pedantic rules when I actually add some JavaScript : )
