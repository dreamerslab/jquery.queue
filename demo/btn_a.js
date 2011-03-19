// push a function in 'after click btn-a' queue
$.queue( 'add', 'afterClickBtnA', function( $playground ){
  
  // only create btn-b in DOM if it does not exist
  if( $( '#btn-b' ).length === 0 ){
    
    // bind 'after click btn-b' queue functions to btn-b click event
    $( '<div id="btn-b" class="btn">BUTTON B</div>' ).bind( 'click', function(){
      
      $.queue( 'execute', 'afterClickBtnB', $playground );
    }).appendTo( $playground );
  }
});