"use strict";

exports.defaults = function() {
  return {
    colorguard: {
      exclude:[],
      vendor:false,
      options : {
        threshold: 3,
        ignore:[],
        whitelist: []
      }
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  colorguard:\n" +
         "    exclude: []   # array of strings or regexes that match files to not colorguard,\n" +
         "                  # strings are paths that can be relative to the watch.sourceDir\n" +
         "                  # or absolute.\n" +
         "    vendor: false # whether or not to colorguard vendor files\n" +
         "    options: {}   # pass-through options to css-colorguard, for more on options see\n" +
         "                  # https://github.com/SlexAxton/css-colorguard";
};

exports.validate = function(config, validators) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "colorguard config", config.colorguard ) ) {
    validators.ifExistsFileExcludeWithRegexAndString( errors, "colorguard.exclude", config.colorguard, config.watch.sourceDir );

    if ( validators.ifExistsIsObject( errors, "colorguard.options", config.colorguard.options ) ) {
      var opts = config.colorguard.options;
      validators.ifExistsIsNumber( errors, "colorguard.options.threshold", opts.threshold );
      validators.ifExistsIsArrayOfStrings( errors, "colorguard.options.ignore", opts.ignore );
      validators.ifExistsIsArray( errors, "colorguard.options.whitelist", opts.whitelist );
    }

  }

  return errors;
};
