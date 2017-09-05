/*
 * run this script when the page is loaded 
*/

var scene;      //scene is the stage we put things in 
var camera;     //camera defines how we look at the scene 
var renderer;   //render the scence for the camera
var controls;   //help rotate the scene with mouse 
var CAMERA_Z;
var moon; 
var typedVal = 0;

init();
animate();

/*
 * setup the basic scene 
 * to see this visualized, go to https://threejs.org/examples/?q=camera#webgl_camera 
 */

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
     alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0.0);
   document.getElementById('canvas').appendChild(renderer.domElement);
   // document.body.appendChild(renderer.domElement);
  
  //field of view, aspect ratio,  near and far clipping plane.
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);  //0.1-1000
  CAMERA_Z = 450;
  camera.position.set(0, 0, CAMERA_Z); 
  
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = false;
  controls.enablePan = false;

  window.addEventListener('resize', onWindowResize, false);
   
  //initialize the shape 
  //airShell = new AirShell();

 // buildScene();
  scene = new THREE.Scene();
 
  createLights();
  
  var ambientLight = new THREE.AmbientLight( 0x333333 ); // soft white light  
  scene.add( ambientLight );
  //helpers
  // backgroup grids
  // var helper = new THREE.GridHelper( 80, 10 );
  // helper.rotation.x = Math.PI / 2;
  // scene.add( helper );

  var axisHelper = new THREE.AxisHelper( 5 );
  scene.add( axisHelper );

  //// svg 
 /// Global : group
  group = new THREE.Group();
  scene.add( group );

  var obj = initSVGObject();
 // addLogoObject(group, obj);
  //addLineObject( group, obj );
  addGeoObject( group, obj );
  
  //createPlanet();

}
function createLights() {
  var ambientLight = new THREE.AmbientLight(0x999999 );
  scene.add(ambientLight);
  
  var lights = [];
  lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );
  lights[0].position.set( 1, 0, 0 );
  lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
  lights[1].position.set( 0.75, 1, 0.5 );
  lights[2] = new THREE.DirectionalLight( 0x8200C9, 1 );
  lights[2].position.set( -0.75, -1, 0.5 );
  scene.add( lights[0] );
  scene.add( lights[1] );
  scene.add( lights[2] );
    

}


function createPlanet(){
  // moonMat =  new THREE.MeshLambertMaterial ({
  //   color: 0x4c00b4,
  //   wireframe: false,
  //   shading:THREE.FlatShading
  // });
  
  var materials = [
    new THREE.MeshPhongMaterial( { color: 0x4c00b4, flatShading: true, vertexColors: THREE.VertexColors, shininess: 0 } ),
    new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, transparent: true } )
  ];

  var moonGeometry = new THREE.IcosahedronGeometry(30, 1 );
  moon =  new THREE.SceneUtils.createMultiMaterialObject(moonGeometry, materials);
  moon.translateZ(-20);
  scene.add( moon );
  // debugger;
}

function animateMoon(){
  var mod = 0.5;
  for (var i = 0; i < moon.children[0].geometry.vertices.length; i++) {
      var v = moon.children[0].geometry.vertices[i];
      v.x += (Math.random() - .5) * mod
      v.y += (Math.random() - .5) * mod
      v.z += (Math.random() - .5) * mod
  }
  moon.children[0].geometry.verticesNeedUpdate=true;
}

function buildScene() {
  // scene = new THREE.Scene();
 
  // //add light to the scene
  // var directionalLight = new THREE.DirectionalLight(0xffffff);
  // directionalLight.position.set(-1, 1.5, -0.5);
  // scene.add(directionalLight);
  
  // var ambientLight = new THREE.AmbientLight( 0x333333 ); // soft white light  
  // scene.add( ambientLight );

  // get the parameters from control panel 
  p = getControlParams();
  // update the geometry acoordingly
  // airShell.updateParams(p);

  // //DRAW THE SPINE
  // airShell.renderSpiral(scene, false); 
  // //DRAW THE C ELLIPSES 
  // airShell.renderC(scene, false);
  // //DRAW IN TUBE 
  // airShell.buildTube(scene, true); 
}

function getControlParams() {
  return {
    alpha: parseFloat(document.getElementById("alpha").value),
    beta: parseFloat(document.getElementById("beta").value),
    ellipse_a: parseFloat(document.getElementById("ellipse_a").value),
  };
}

function animate() {
  if(typed){
    scene.rotateY(-10*Math.random()*Math.PI/180.0);
    scene.rotateX( 4 *(Math.random()-0.5)*Math.PI/180.0)
    // var t = typedVal/10;
    // camera.position.z = CAMERA_Z ;
    // camera.position.x += t
    // camera.position.y += t 
    // camera.lookAt( scene.position );


    // var logoObj = scene.getObjectByName( "logo" );
    // var mod = 0.5;
    // for (var i = 0; i < logoObj.children[0].geometry.vertices.length; i++) {
    //     var v = logoObj.children[0].geometry.vertices[i];
    //     v.x += t * mod
    //     v.y += t * mod
    //     v.z += t * mod
    // }
    // logoObj.children[0].geometry.verticesNeedUpdate=true;
    typed = false ;

  }
 
  
  requestAnimationFrame(animate);
  render();
}

function render() {
  controls.update();
  renderer.render(scene, camera);
}
