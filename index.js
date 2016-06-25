
Pick(function() {

  var clickHandler = function() {
    
    alert('I will do the job!');
    
    Pick(this)
      .setCss('font-size', '20px')
      .setAttr('title', 'No more clicks allowed!')
      .off('click', clickHandler);      
  };
  
  Pick('button').on('click', clickHandler);
  
});