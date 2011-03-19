// push a function in 'after click btn-c' queue
$.queue( 'add', 'afterClickBtnC', function( $playground ){
  
  // only create btn-clear in DOM if it does not exist
  if( $( '#btn-clear' ).length === 0 ){
    
    // remove btn-b, c and clear if the clear btn is clicked
    $( '<div id="btn-clear" class="btn">CLEAR</div>' ).bind( 'click', function(){
      
      $( '#btn-b' ).remove();
      $( '#btn-c' ).remove();
      $( '#btn-clear' ).remove();
    }).appendTo( $playground );
  }
});