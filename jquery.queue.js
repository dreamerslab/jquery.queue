/*! Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.2
*
* Requires: jQuery 1.3.0+
*/

// wrap everything in an anonymous function
;( function( $ ){
  
  // self will be over written by jquery instance "this"
  // a higher scope let private mathods to access jquery obj
  var self, namespace, _, publicMethods;

  // default namespace
  namespace = 'trunk';

  // private props
  _ = {
    // default place to store queues
    trunk : {}
  };

  publicMethods = {

    // push function to a namespace under '_' in an anonymous function to be execute later
    add : function( name, fn ){
      // build new namespace if it is not found
      if( _[ namespace ] === undefined ){
        _[ namespace ] = {};
      }
      // build new queue if it is not found
      if( _[ namespace ][ name ] === undefined ){
        _[ namespace ][ name ] = [];
      }
      // push function to a queue
      _[ namespace ][ name ].push( fn );
      // return self to enable chaining
      return self;
    },
    
    // remove a function in a queue
    remove : function( name, fn ){
      var tmp, i, j;
      // make sure the calling queue exist, otherwise do nothing
      if( _[ namespace ] !== undefined && _[ namespace ][ name ] !== undefined ){
        // cache to local var outside the loop
        tmp = _[ namespace ][ name ];
        
        i = 0;
        j = tmp.length;
        
        // !IMPORTANT use splice instead of delete, see the following link for the resaon
        // http://stackoverflow.com/questions/500606/javascript-array-delete-elements
        for( ; i < j ; i++ ){
          if( tmp[ i ] === fn ){
            tmp.splice( i, 1 );
            break;
          }
        }
      }
      // return self to enable chaining
      return self;
    },
    
    'call' : function( name, args ){
      var tmp, _args, i, j;
      // make sure the calling queue exist, otherwise do nothing
      if( _[ namespace ] !== undefined && _[ namespace ][ name ] !== undefined ){
        // cache to local var outside the loop
        tmp = _[ namespace ][ name ];
        // make sure the args is an array
        _args = $.isArray( args ) ? args : [ args ];
        
        i = 0;
        j = tmp.length;
        // execute
        for( ; i < j ; i++ ){
          tmp[ i ].apply( this, _args );
        }
      }
      // return self to enable chaining
      return self;
    },

    // clear queue
    clear : function( name ){
      var found, prop;
      
      found = false;
      // check if the name is a namespace
      for( prop in _ ){
        if( prop === name ){
          found = true;
          break;
        }
      }
      // if it is a namespace, delete the whole namespace
      // otherwise just delete the prop under that namespace
      if( found ) delete _[ name ];
      else delete _[ namespace ][ name ];
      // return self to enable chaining
      return self;
    }
  };

  $.queue = function( action, name, args ){
    var tmp, _name;

    // make sure user pass the second arg
    if( name === undefined || typeof( name ) !== 'string' ){
      throw '$.queue error: on action "' + action + '" - second argument "' + name + '" is undefined or is not a string';
    }
    
    // !IMPORTANT, do not use 'var' here
    // store jquery 'this' to 'self' so that it can be access
    // outside of the plugin scope
    self = this;
    
    // check if the action name has a name space
    tmp = name.split( '.' );

    // if the name contains a namespace, use it
    // otherwise we use default name space 'trunk'
    // !IMPORTANT, we only support 1 layer namespace!!
    if( tmp.length > 1 ){
      namespace = tmp[ 0 ];
      _name = tmp[ 1 ];
    }else{
      namespace = 'trunk';
      _name = name;
    }

    // execute 'add', 'remove', 'call' or 'clear' and return the result
     return publicMethods[ action ]( _name, args );
  };

})( jQuery );