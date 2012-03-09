QUnit NewSyntax
===============

Because I use QUnit, but I dislike the syntax, I thought I'd shim in a new syntax.

It works kind of like Jasmine's syntax. Look:

```javascript
QUnit.testCase('This is a module name', {

	setup: function () {
		this.var = true;
	}

	'This is a test': function () {
		ok(this.var);
	},

	'This is a submodule': {

		setup: function () {
			this.anothervar = true;
		},

        teardown: function () {
            delete this.anothervar;
        },

		'This is a test': function () {
			ok(this.var);
			ok(this.anothervar);
		}

        'Another submodule, and so on': { ... }
	},
});
```

This, in my opinion, is a nicer syntax than QUnits flat, very "methody" syntax.