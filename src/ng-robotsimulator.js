'use strict';
var THREE = THREE;
(function () {

  var robotics = {};
  /**
   *   Constructor
   */

  var Simulator = function () {

  };


  Simulator.prototype.LoadModel = function () {
    var self = this;

    var loader = new THREE.JSONLoader();
    // load a resource
    loader.load(
      // resource URL
      'demo/models/base.json',
      // Function when resource is loaded
      function (geometry) {
        var material = new THREE.MeshPhongMaterial();
        var object = new THREE.Mesh(geometry, material);

        self.scene.add(object);
      }

    );

  };

  Simulator.prototype.init = function (element) {
    var self = this;


    var container, viewsizeH, viewsizeW, camera, scene, controls;


    var animation;

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xb7cee5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;


    var init = function () {
      container = element;
      viewsizeW = container.clientWidth;
      viewsizeH = container.clientHeight;

      renderer.setSize(viewsizeW, viewsizeH);
      container.appendChild(renderer.domElement);


      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(35, viewsizeW / viewsizeH, 0.1, 1000);
      // camera = new THREE.PerspectiveCamera(50, 1, 150, 650);
      // camera.position.set(0, 0, 5);
      // camera.up = new THREE.Vector3(0, 0, 1);
      // camera.lookAt(new THREE.Vector3(0, 0, 0));
      // scene.add(camera);

      camera.position.x = 100;
      camera.position.y = 100;
      camera.position.z = 5;
      camera.lookAt(new THREE.Vector3(0, 0, 0));


      controls = new THREE.TrackballControls(camera);
						controls.target.set(0, 0, 0);

						controls.rotateSpeed = 1.0;
						controls.zoomSpeed = 0.8;
						controls.panSpeed = 0.8;

						scene.add(camera);

      // camera.position.z = 500;
      //890

      var light = new THREE.DirectionalLight(0xffffff);
      light.position.set(1, 1, 1).normalize();
      scene.add(light);

      var size = 10;
      var step = 10;

      var gridHelper = new THREE.GridHelper(size, step);
      scene.add(gridHelper);

      // self.THREEPlugins.add('demo/js/TrackballControls.js').then(function () {

      //   controls = new THREE.TrackballControls(camera);
      //   // controls.target.set(0, 0, 0);
      //   controls.noZoom = false;
      //   controls.noPan = false;
      //   // controls.dynamicDampingFactor = 0.3;
      //   // controls.rotateSpeed = 9.0;
      //   // controls.zoomSpeed = 0.8;
      //   // controls.panSpeed = 0.8;



      // });

      // var editcontrol=new THREE.EditorControls( camera, camera, renderer.domElement );
      // scene.add(editcontrol);

      // var ambientLight = new THREE.AmbientLight(0xfffff);
      // scene.add(ambientLight);


      // var ambientLight = new THREE.AmbientLight(0x55555);
      // scene.add(ambientLight);

      var geometry = new THREE.TorusKnotGeometry(100, 30, 100, 16);

      var material = new THREE.MeshDepthMaterial({
        color: 0x666666,
        wireframe: true,
        wireframeLinewidth: 1
      });

      var torus = new THREE.Mesh(geometry, material);
      torus.name = "Torus";
      scene.add(torus);


    };



    // -----------------------------------
    // Event listeners
    // -----------------------------------
    // Cancel animation when view route or state changes
    // eg. watch for state change when using ui-router:
    // $rootScope.$on('$stateChangeStart', function () {
    //   cancelAnimationFrame(animation);
    // });

    //
    var onWindowResize = function () {
      //camera.aspect = width-10 / height-10;
      // var container2 = elem[0].parentElement;


      var height2 = container.offsetHeight;
      var width2 = container.offsetWidth;
      camera.aspect = width2 / height2;
      camera.updateProjectionMatrix();
      renderer.setSize(width2, height2);

      render();

    };

    window.addEventListener('resize', onWindowResize, false);


    // -----------------------------------
    // Draw and Animate
    // -----------------------------------
    var animate = function () {
      animation = requestAnimationFrame(animate);
      if (controls) {
        controls.update();

      }
      render();
    };

    var render = function () {

      renderer.render(scene, camera); // forceClear == true
    };

    init();
    self.scene = scene;
    animate();
//    self.LoadModel();




  };

  robotics.Simulator = Simulator;
  /**
   *   Angular Robotics Simulator directive
   */
  robotics.SimulatorDirective = function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        value: '=',
        options: '='
      },
      template: '<div class="scenecontainer"></div>',
      link: function (scope, element) {

        var Simulator = new robotics.Simulator();

        element.ready(function () {
          $timeout(function () {
            Simulator.init(element[0].children[0]);
          }, 500);
        });


      }
    };
  };

  angular.module('robotics.simulator', []).directive('roboticsSimulator', robotics.SimulatorDirective);
})();
