
Pick(function() {

  var clickHandler = function() {

    Pick(this)
      .setText('Good job!')
      .setCss('font-size', '20px')
      .setAttr('title', 'No more clicks allowed!')
      .off('click', clickHandler);      
  };
  
  Pick('button').on('click', clickHandler);
  
});