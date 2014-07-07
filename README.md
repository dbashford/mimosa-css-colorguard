mimosa-css-colorguard
===========

## Overview

This module will run [css-colorguard](https://github.com/SlexAxton/css-colorguard) over your compiled/copied CSS files.

For more about Mimosa, [check out its website](http://mimosa.io).

Note: While Mimosa version `2.2.16` isn't required, it is recommended as the minimum version of Mimosa for this module.

## Usage

Add `'css-colorguard'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will run css-colorguard just before it writes any of your non-vendor CSS files.  Any warnings will be written to the console.

## Default Config

```javascript
colorguard: {
  exclude:[],
  vendor: false
  options : {
    threshold: 3,
    ignore:[],
    whitelist: []
  }
}
```

* `exclude`: array of strings or regexes that match files to not colorguard, strings are paths that can be relative to the watch.sourceDir or absolute.
* `vendor`: whether or not to colorguard vendor files
* `options`: Pass-through options for [css-colorguard](https://github.com/SlexAxton/css-colorguard). Check out that documentation for more.  