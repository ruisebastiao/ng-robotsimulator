/*******************************************************
 * Name:          ng-robotsimulator
 * Description:   Angular.js Robot Simulation directive
 * Version:       0.0.1
 * Homepage:      
 * Licence:       MIT
 *******************************************************/
"use strict";

(function() {
    var robotics = {};
    var Simulator = function(element, options) {
        this.element = element;
        this.options = options;
    };
    Simulator.prototype.init = function() {};
    robotics.Simulator = Simulator;
    robotics.SimulatorDirective = function() {
        return {
            restrict: "E",
            scope: {
                value: "=",
                options: "="
            },
            link: function(scope, element) {
                var simulator = new robotics.Simulator(element[0], scope.options);
                simulator.init();
            }
        };
    };
    angular.module("robotics.simulator", []).directive("roboticsSimulator", robotics.SimulatorDirective);
})();