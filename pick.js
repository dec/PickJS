
/*!
 * PickJS
 *
 * Entirely inspired by jQuery - https://jquery.com 
 *
 * @version 2016.1
 * @author David Esperalta <info@davidesperalta.com>
 * @copyright (c) 2016 David Esperalta - https://davidesperalta.com
 */

"use strict";

(function(window) {
  
  /* 
    The selector argument can be one of these things:
    
    1º A CSS selector string like in: Pick('.myClass')
    
    2º An HTML element object like in: Pick(document.getElementById('myId'))     
    
    3º A DOM object like in: Pick(window) or Pick(window.document)
    
    4º A callback function like in: Pick(function() {});
    
    In the first three cases we can then act over the matches like in:
    
    Pick('.myClass').setCss('color', 'red');
    
    Pick(document.getElementById('myId')).setCss('color', 'red');
    
    Pick(window).on('click', function() {});
    
    The latest one allow us to be ready when the DOM is ready:
    
    Pick(function() {
      // DOM is ready here!
    }); 
  */
  window.Pick = function(selector) {
    
    /*
      Deal with the selector as a function: what we do here is to attach
      the specified function callback to be executed when the DOM is ready.
    */
    if (typeof selector === 'function') {
      window.document.addEventListener('DOMContentLoaded', selector);
      
      // And our job is already done.
      return true;
    }
    
    /*
      For any other selector cases the Pick function return a Pick object.
    */
    return {

      /* ============ */      
      /* Public stuff */
      /* ============ */

      /*
        The "each" method allow us to write code like the below one:
        
        Pick('.myClass').each(function(element, index, total) {
          // Do whatever you wanted here!  
        });
        
        So the "each" method execute the specified function callback
        for every element or object matched with the used selector.
      */
      each: function(callback) {
        return this._each(callback);
      },
      
      /*
        The "on" method allow us to write code like the below ones:
        
        Pick('.myClass').on('click', function(event) {
          // Do whatever you wanted here!
        });
        
        Pick(window).on('load', function(event) {
          // Do whatever you wanted here!
        });
        
        So the "on" method allow us to attach an event listener for
        every element or object matched with the used selector.
      */
      on: function(eventId, callback) {
        return this._each(function(element) {
          element.addEventListener(eventId, callback, false);
        });        
      },
      
      /*
        The "off" method is allow us to write code like the below one:
        
        var clickHandler = function() {
          // Do whatever you wanted here!          
        };
        
        Pick('.myClass').on('click', clickHandler);

        // And after attach the event handler...
        
        Pick('.myClass').off('click', clickHandler);

        The "off" method is the counter part of the "on" method, and
        can be used to remove a previously attached event listener. 
      */
      off: function(eventId, callback) {
        return this._each(function(element) {
          element.removeEventListener(eventId, callback, false);
        });        
      },        
      
      /*
        The "getCss" method retrieve for us the specified CSS rule from
        the first matched element, if any. So we can write code like this:
        
        alert(Pick('#myIdentifier').getCss('color'));

        We can provide a default value for the case than the CSS rule are 
        not defined, then the default value is returned instead:
        
        alert(Pick('#myIdentifier').getCss('color', 'red'));
      */
      getCss: function(name, value) {
        if ((this._query()._stack.length > 0) && this._stack[0].style[name]) {
          return this._stack[0].style[name];
        } else {
          return value;
        }
      },            
      
      /*
        The "setCss" method is the counter part of "getCss" and allow us to
        write code like the below to establish CSS properties to the matched
        elements:
        
        Pick('.myClass')
          .setCss('color', 'red')
          .setCss('background-color', 'white');
          
        Note that most of Pick methods are "chainables"!
      */
      setCss: function(name, value) {
        return this._each(function(element) {
          element.style[name] = value;  
        });
      },                  
      
      /*
        The "getAttr" method allow us to retrieve the value of the
        specified HTML attribute of the first matched element, if any.
        
        alert(Pick('#myIdentifier').getAttr('title'));
        
        The method allow to specify a default value to be returned if
        the required attribute are not found in the element:
        
        alert(Pick('#myIdentifier').getAttr('title', 'No title!'));        
      */
      getAttr: function(name, value) {
        if (this._query()._stack.length > 0) {
          return this._stack[0].getAttribute(name);
        } else {
          return value;
        }
      },
      
      /*
        The "setAttr" method allow us to write code like the below one:
        
        Pick('.myClass').setAttr('title', 'My new title!');
        
        So the above code set the "title" attribute to "My new title!"
        for all the matched elements with the used selector.
      */
      setAttr: function(name, value) {
        return this._each(function(element) {
          element.setAttribute(name, value);
        });
      },
      
      /*
        The "delAttr" method allow us to remove an existing HTML attribute
        from all the matched elements with the used selector:
        
        Pick('.myClass').delAttr('title');
        
        The above code remove the "title" attribute from all matched elements.
      */
      delAttr: function(name) {
        return this._each(function(element) {
          element.removeAttribute(name);
        });
      },
      
      /* ============= */      
      /* Private stuff */
      /* ============= */
      
      /*
        Here we maintain one or more HTML elements or DOM objects ready to use.
      */
      _stack: [],
      
      /*
        This is the main Pick method and is reponsible to prepare the "_stack"
        of objects to be ready.
        
        The method take care about the selector argument passed to the Pick
        function and act accordingly.
        
        If the selector is an string we considerer it as a CSS selector.
        
        If any other case (for our purposes) we consider the selector as
        HTML elements or DOM objects ready to be saved in the "_stack".
      */
      _query: function() {
        if (typeof selector === 'string') {
          this._stack = window.document.querySelectorAll(selector);
        } else {
          this._stack = [];
          this._stack.push(selector);
        }
        return this;
      },
      
      /*
        The "_each" method is used in almost all Pick methods to iterate
        over the matched HTML elements or DOM objects.
        
        Note how the "_each" method calls to the "_query" method in order
        to prepare the "_stack" to be iterated right next.
        
        Note also how the specified function callback receive the current
        iterated HTML element, the iteration index and the total of matched
        elements.
      */
      _each: function(callback) {
        for (var index = 0; index < this._query()._stack.length; index++) {
          callback(this._stack[index], index, this._stack.length);
        }
        return this;
      }      
    };
  };

})(window);
