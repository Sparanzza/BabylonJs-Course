var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var createScene = function () {

            // Create the scene space
            var scene = new BABYLON.Scene(engine);
            // Add a camera to the scene and attach it to the canvas
            var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, 15 * Math.PI / 32, 25, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);
            // Add lights to the scene
            var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(2, 2, 0), scene);
            var light2 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 2, -2), scene);
            // Add and manipulate meshes in the scene
            var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:3}, scene);
            sphere.position.y = 1.5;
            var ground = BABYLON.MeshBuilder.CreateGround("ground", {width:50, height:50}, scene);

            return scene;
    };

    /******* End of the create scene function ******/    
    var scene = createScene(); //Call the createScene function

engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
        scene.render();
});

window.addEventListener("resize", function () { // Watch for browser/canvas resize events
        engine.resize();
});