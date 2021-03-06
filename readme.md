# assemble-redirects [![NPM version](https://img.shields.io/npm/v/assemble-redirects.svg)](https://www.npmjs.com/package/assemble-redirects)

> Generate a redirects file from a stream of manifest files.

## Install
Install with [npm](https://www.npmjs.com/):

```sh
$ npm i assemble-redirects --save
```

## Usage

```js
var redirects = require('assemble-redirects');
```

## API

### [redirects](index.js#L31)
Generate a redirects.json file from a stream of manifest.json files.


**Params**

* `app` **{Object}**: Instance of an app that's inherited from [templates][].    
* `options` **{Object}**: Additional options used to control `redirects.json` file.    
* `options.path` **{String}**: Path to be set on newly created file. (Defaults to `redirects.json`)    
* `returns` **{Stream}**: Stream that can be used in a pipeline.  

**Example**



```js
app.src(patterns)
  .pipe(redirects(app))
  .on('data', function(file) {
    if (file.path === 'redirects.json') {
      console.log(file.content);
    }
  });
```



## Related projects
* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [assemble-core](https://www.npmjs.com/package/assemble-core): The core assemble application with no presets or defaults. All configuration is left to the… [more](https://www.npmjs.com/package/assemble-core) | [homepage](https://github.com/assemble/assemble-core)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine.… [more](https://www.npmjs.com/package/templates) | [homepage](https://github.com/jonschlinkert/templates)

## Running tests
Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/doowb/assemble-redirects/issues/new).

## Author
**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb)

## License
Copyright © 2016 [Brian Woodward](https://github.com/doowb)
Released under the MIT license.

***

_This file was generated by [verb](https://github.com/verbose/verb) on January 18, 2016._
