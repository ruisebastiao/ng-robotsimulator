/*******************************************************
 * Name:          ng-robotsimulator
 * Description:   Angular.js Robot Simulation directive
 * Version:       0.0.1
 * Homepage:      
 * Licence:       MIT
 *******************************************************/
"use strict";

var THREE = THREE;

(function() {
    var robotics = {};
    var Simulator = function() {};
    Simulator.prototype.LoadModel = function() {
        var self = this;
        var loader = new THREE.JSONLoader();
        loader.load("demo/models/base.json", function(geometry) {
            var material = new THREE.MeshPhongMaterial();
            var object = new THREE.Mesh(geometry, material);
            self.scene.add(object);
        });
    };
    Simulator.prototype.init = function(element) {
        var self = this;
        var container, viewsizeH, viewsizeW, camera, scene, controls;
        var animation;
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(12046053));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
        var init = function() {
            container = element;
            viewsizeW = container.clientWidth;
            viewsizeH = container.clientHeight;
            renderer.setSize(viewsizeW, viewsizeH);
            container.appendChild(renderer.domElement);
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(35, viewsizeW / viewsizeH, .1, 1e3);
            camera.position.x = 100;
            camera.position.y = 100;
            camera.position.z = 5;
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            controls = new THREE.TrackballControls(camera);
            controls.target.set(0, 0, 0);
            controls.rotateSpeed = 1;
            controls.zoomSpeed = .8;
            controls.panSpeed = .8;
            scene.add(camera);
            var light = new THREE.DirectionalLight(16777215);
            light.position.set(1, 1, 1).normalize();
            scene.add(light);
            var size = 10;
            var step = 10;
            var gridHelper = new THREE.GridHelper(size, step);
            scene.add(gridHelper);
            var geometry = new THREE.TorusKnotGeometry(100, 30, 100, 16);
            var material = new THREE.MeshDepthMaterial({
                color: 6710886,
                wireframe: true,
                wireframeLinewidth: 1
            });
            var torus = new THREE.Mesh(geometry, material);
            torus.name = "Torus";
            scene.add(torus);
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
    };
    robotics.Simulator = Simulator;
    robotics.SimulatorDirective = function($timeout) {
        return {
            restrict: "E",
            scope: {
                value: "=",
                options: "="
            },
            template: '<div class="scenecontainer"></div>',
            link: function(scope, element) {
                var Simulator = new robotics.Simulator();
                element.ready(function() {
                    $timeout(function() {
                        Simulator.init(element[0].children[0]);
                    }, 500);
                });
            }
        };
    };
    angular.module("robotics.simulator", []).directive("roboticsSimulator", robotics.SimulatorDirective);
})();