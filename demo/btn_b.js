// push a function in 'after click btn-b' queue
$.queue( 'add', 'afterClickBtnB', function( $playground ){
  
  // only create btn-c in DOM if it does not exist
  if( $( '#btn-c' ).length === 0 ){
    
    // bind 'after click btn-c' queue functions to btn-c click event
    $( '<div id="btn-c" class="btn">BUTTON C</div>' ).bind( 'click', function(){
      
      $.queue( 'execute', 'afterClickBtnC', $playground );
    }).appendTo( $playground );
  }
});