$( function(){
  
  // bind btn-a click event when DOM is ready
  $( '#btn-a' ).bind( 'click', function(){
    
    $.queue( 'execute', 'afterClickBtnA', $( '#play-ground' ));
  });
});