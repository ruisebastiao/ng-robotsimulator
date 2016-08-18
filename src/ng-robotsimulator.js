'use strict';

(function(){

  var robotics = {};
  /**
   *   Constructor
   */
  var Simulator = function(element, options) {
    this.element = element;
    this.options = options;
    
  };
 
  robotics.Simulator = Simulator;
  /**
   *   Angular Robotics Simulator directive
   */
  robotics.SimulatorDirective = function() {
    return  {
      restrict: 'E',
      scope: {
        value: '=',
        options: '='
      },
      link: function (scope, element) {
       
        var defaultOptions = {
          
				};
        
        var simulator = new robotics.Simulator(element[0], scope.options);

       
        
      }
    };
  };

  angular.module('robotics.simulator', []).directive('roboticsSimulator', robotics.SimulatorDirective);
})();
