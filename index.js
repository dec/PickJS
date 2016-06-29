
Pick(function() {

  var clickHandler = function() {

    Pick(this)
      .text('Good job!')
      .css('font-size', '20px')
      .attr('title', 'No more clicks allowed!')
      .off('click', clickHandler);      
  };
  
  Pick('button').on('click', clickHandler);
  
});