"use strict";

var colorguard = require( "colorguard" )
  , config = require( "./config" )
  , logger;

var _colorguard = function( colorguardConfig, text, fileName ) {
  var output = {};
  try {
    output = colorguard.inspect( text, colorguardConfig.options );
  } catch ( err ) {
    logger.error( "colorguard failed to inspect output from file: [[ " + fileName + " ]]");
    logger.info( "Error Reason: ", err.message );
  }

  if ( logger.isDebug() ) {
    logger.debug( JSON.stringify( output, null, 2 ) );
  }

  if ( output.collisions && output.collisions.length ) {
    logger.warn( "css-colorguard caught the following color collisions in the file [[ " + fileName + " ]]:" );
    output.collisions.forEach( function( collision ){
      logger.warn( collision.message );
    });
  }
};

var _execute = function ( mimosaConfig, options, next ) {
  if ( options.files && options.files.length ) {
    var cg = mimosaConfig.colorguard;

    options.files.forEach( function( file ) {
      var outputText = file.outputFileText
        , fileName = file.inputFileName;

      if ( outputText && outputText.length > 0 ) {
        if ( cg.exclude && cg.exclude.indexOf( fileName ) !== -1 ) {
          if ( logger.isDebug() ) {
            logger.debug( "Not colorguard-ing [[ " + fileName + " ]] because it has been excluded via string path." );
          }
        } else if ( cg.excludeRegex && fileName.match( cg.excludeRegex ) ) {
          if ( logger.isDebug() ) {
            logger.debug( "Not colorguard-ing [[ " + fileName + " ]] because it has been excluded via regex." );
          }
        } else if ( !cg.vendor && ( file.isVendor || ( options.files.length === 1 && options.isVendor ) ) ) {
          if ( logger.isDebug() ) {
            logger.debug( "Not colorguard-ing vendor script [[ " + fileName + " ]]" );
          }
        } else {
          _colorguard( cg, outputText, fileName );
        }
      }
    });
  }
  next();
};


var registration = function (mimosaConfig, register) {
  logger = mimosaConfig.log;
  register(
    ["add","update","buildExtension","buildFile"],
    "beforeWrite",
    _execute,
    mimosaConfig.extensions.css
  );
};

module.exports = {
  registration: registration,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};
