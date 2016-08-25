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
 

  Simulator.prototype.init = function() {
    
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
      template : '<div class="modelcontainer">Teste</div>',
      link: function (scope, element) {
       
        // var defaultOptions = {
          
				// };
        
        var simulator = new robotics.Simulator(element[0], scope.options);

        simulator.init();
        
      }
    };
  };

  angular.module('robotics.simulator', []).directive('roboticsSimulator', robotics.SimulatorDirective);
})();
