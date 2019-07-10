import * as BABYLON from "babylonjs";
import { GlobalAxis } from "./helperGui";

export class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    // private _camera: BABYLON.UniversalCamera;
    // private _camera: BABYLON.FlyCamera;
    private _light: BABYLON.Light;
    private _directionalLight: BABYLON.DirectionalLight;
    private _spotLight: BABYLON.SpotLight;

    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene(): void {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.clearColor = new BABYLON.Color4(0.4, 0.4, 0.4, 1);

        this._camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, new BABYLON.Vector3(0, 1100, 0), this._scene);
        // Target the camera to scene origin.
        this._camera.setTarget(BABYLON.Vector3.Zero());

        // this._camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), this._scene);
        // Attach the camera to the canvas.

        // Parameters: name, position, scene
        // this._camera = new BABYLON.FlyCamera("FlyCamera", new BABYLON.Vector3(0, 5, -10), this._scene);

        // Airplane like rotation, with faster roll correction and banked-turns.
        // Default is 100. A higher number means slower correction.
        // this._camera.rollCorrect = 10;
        // Default is false.
        // this._camera.bankedTurn = true;
        // Defaults to 90° in radians in how far banking will roll the camera.
        // this._camera.bankedTurnLimit = Math.PI / 2;
        // How much of the Yawing (turning) will affect the Rolling (banked-turn.)
        // Less than 1 will reduce the Rolling, and more than 1 will increase it.
        // this._camera.bankedTurnMultiplier = 1;
        this._camera.attachControl(this._canvas, false, false);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        this._light.intensity = 0.35;
        this._directionalLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), this._scene);
        this._directionalLight.intensity = 0.35;

        this._spotLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(0, 500, -10), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 100, this._scene);
        this._spotLight.intensity = 1;
        this._spotLight.diffuse = new BABYLON.Color3(1, 1, 0);
        this._spotLight.specular = new BABYLON.Color3(1, 1, 0);
        this._spotLight.range = 10;

        // Golden Material
        let goldenMaterial = new BABYLON.StandardMaterial("golden", this._scene);
        goldenMaterial.diffuseColor = new BABYLON.Color3(255 / 255, 215 / 255, 0 / 255);
        goldenMaterial.specularColor = new BABYLON.Color3(0.7, 0.5, 0.5);
        goldenMaterial.ambientColor = new BABYLON.Color3(0.9, 0.7, 0.7);

        // velvet texture
        let velvetMaterial = new BABYLON.StandardMaterial("myMaterial", this._scene);
        let velvet = new BABYLON.Texture("images/velvet.jpg", this._scene);
        velvet.uScale = velvet.vScale = 30;
        velvetMaterial.diffuseTexture = velvet;
        velvetMaterial.specularTexture = velvet;

        let cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", { tessellation: 120, height: 10, diameter: 600 }, this._scene);
        let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1920, height: 1080, subdivisions: 2 }, this._scene);

        cylinder.position.y = 5.0;
        cylinder.material = goldenMaterial;

        ground.material = velvetMaterial;

        let _globalAxis = new GlobalAxis(100, this._scene);
    }

    doRender(): void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener("resize", () => {
            this._engine.resize();
        });
    }
}
