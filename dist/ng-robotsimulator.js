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
    var Simulator = function() {};
    Simulator.prototype.LoadModel = function() {
        var self = this;
        if (self.THREE) {
            var loader = new self.THREE.JSONLoader();
            loader.load("demo/models/base.json", function(geometry) {
                var material = new self.THREE.MeshPhongMaterial();
                var object = new self.THREE.Mesh(geometry, material);
                self.scene.add(object);
            });
        }
    };
    Simulator.prototype.init = function(element) {
        var self = this;
        this.THREEService.load().then(function(THREE) {
            self.THREE = THREE;
            var container, viewsizeH, viewsizeW, camera, scene, controls;
            var renderer = self.THREEService.getRenderer();
            var animation;
            var init = function() {
                container = element;
                viewsizeW = container.clientWidth;
                viewsizeH = container.clientHeight;
                renderer.setSize(viewsizeW, viewsizeH);
                container.appendChild(renderer.domElement);
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(35, viewsizeW / viewsizeH, .1, 1e3);
                camera.up = new THREE.Vector3(0, 0, 1);
                camera.lookAt(new THREE.Vector3(0, 0, 0));
                scene.add(camera);
                var light = new THREE.DirectionalLight(16777215);
                light.position.set(1, 1, 1).normalize();
                scene.add(light);
                var size = 10;
                var step = 10;
                var gridHelper = new THREE.GridHelper(size, step);
                scene.add(gridHelper);
                self.THREEPlugins.add("demo/js/TrackballControls.js").then(function() {
                    controls = new THREE.TrackballControls(camera);
                    controls.target.set(0, 0, 0);
                    controls.noZoom = false;
                    controls.noPan = false;
                    controls.dynamicDampingFactor = .3;
                    controls.rotateSpeed = 9;
                    controls.zoomSpeed = .8;
                    controls.panSpeed = .8;
                });
            };
            var onWindowResize = function() {
                var height2 = container.offsetHeight;
                var width2 = container.offsetWidth;
                camera.aspect = width2 / height2;
                camera.updateProjectionMatrix();
                renderer.setSize(width2, height2);
                render();
            };
            window.addEventListener("resize", onWindowResize, false);
            var animate = function() {
                animation = requestAnimationFrame(animate);
                if (controls) {
                    controls.update();
                }
                render();
            };
            var render = function() {
                renderer.render(scene, camera);
            };
            init();
            self.scene = scene;
            animate();
            self.LoadModel();
        });
    };
    robotics.Simulator = Simulator;
    robotics.SimulatorDirective = function($timeout, THREEService, THREEPlugins) {
        return {
            restrict: "E",
            scope: {
                value: "=",
                options: "="
            },
            template: '<div class="scenecontainer"></div>',
            link: function(scope, element) {
                var Simulator = new robotics.Simulator();
                Simulator.THREEService = THREEService;
                Simulator.THREEPlugins = THREEPlugins;
                element.ready(function() {
                    $timeout(function() {
                        Simulator.init(element[0].children[0]);
                    }, 500);
                });
            }
        };
    };
    angular.module("robotics.simulator", [ "threejs" ]).directive("roboticsSimulator", robotics.SimulatorDirective);
})();