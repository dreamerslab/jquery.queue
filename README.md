# jQuery Queue Plugin

Make your Javascript application more flexible.



## Description

Javascript is an [event-driven](http://bit.ly/ejhOOR) programming language. Therefore with heavy frontend applications your code is easy to have nested callbacks. And this make your code less flexible.

With jQuery Queue plugin you can add functions in a queue outside the function scope; execute the queued functions later. It makes your code easily to be more modularize. It is a must have if you write heavy frontend websites.



## Demo
 - Please see demo/index.html
 - Live demo please take a look at [this](http://dreamerslab.com/demos/javascript-loose-coupling-with-jquery-queue-plugin)

## Documentation
  - There is a syntax highlight version, please see [this post](http://dreamerslab.com/blog/en/javascript-loose-coupling-with-jquery-queue-plugin/)
  - For chinese version please go [here](http://dreamerslab.com/blog/tw/javascript-loose-coupling-with-jquery-queue-plugin/)



## Requires
  - jQuery 1.3.0+



## Browser Compatibility
  - [Firefox](http://mzl.la/RNaI) 2.0+
  - [Internet Explorer](http://bit.ly/9fMgIQ) 6+
  - [Safari](http://bit.ly/gMhzVR) 3+
  - [Opera](http://bit.ly/fWJzaC) 10.6+
  - [Chrome](http://bit.ly/ePHvYZ) 8+



## Installation
  - First, make sure you are using valid [DOCTYPE](http://bit.ly/hQK1Rk)
  - Include nessesary JS files

<!-- -->

      <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
      <script type="text/javascript" src="path-to-file/jquery.queue.js"></script>



## Usage

#### Syntax
> push function to a queue

    $.queue( 'add', 'queueName', function( arg1, arg2, arg3 ){
      // do something here
    });

> remove function from a queue

    var someFunction = function( arg1, arg2, arg3 ){
      // some code
    }

    $.queue( 'remove', 'queueName', 'someFunction' );

> call queue functions

    $.queue( 'call', 'queueName', [ arg1, arg2, arg3 ]);
    // or
    $.queue( 'call', 'queueName', arg );

> clear queue

    $.queue( 'clear', 'queueName' );



#### Example code:

> Store ajax call data , here we use [$.secret](https://github.com/dreamerslab/jquery.secret) plugin

    // store data outside a ajax call
    $.queue( 'in', 'afterLoadPhotos', function( total, photos ){
      // store( cache ) flickr photo data for later use
      $.secret( 'in', 'totalPhotos', total ).
        secret( 'in', 'photos', photos );
    });

> Append to DOM

    // append photos to the dom using data 'outside' the ajax call
    $.queue( 'add', 'afterLoadPhotos', function( total, photos ){
      var fragment = '';
      $.each( photos, function( key, photo ){
        fragment = fragment + '<li><a href="' + photo.imagePath + '">' +
        '<img scr="' + photo.thumb_path + '"/><span>' + photo.title +
        '</span></a></li>';
      });
      $( '#gallery' ).append( fragment );
    });

> execute queue functions for 'afterLoadPhotos'

    $.ajax({
      type : 'get',
      url : '/flickr/photos',
      dataType : 'json',
      success : function( rsp ){
        $.queue( 'call', 'afterLoadPhotos', [ rsp.total, rsp.photos ]);
      }
    });

> With this plugin we don't have to defined what we are going to do after the ajax call
or inside the ajax call. Not only with ajax call, we can also use it to connect different class and module more flexible through out the whole application.


### Namespace
`$.queue` supports 1 layer namespace. With large application we might need to split our code into modules.

> Example code:

    // push a function to getPhotos queue under FLICKR module
    $.queue( 'add', 'FLICKR.afterGetPhotos', function( secret, extraParams ){
      // do stuffs here
    });

    // another function for searching images on google
    $.queue( 'add', 'GOOGLE.searchImage', function( args ){
      // do other stuffs here
    }):



## License

The expandable plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2011 [Ben Lin](http://dreamerslab.com)