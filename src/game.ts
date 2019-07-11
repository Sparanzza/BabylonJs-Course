import * as BABYLON from "babylonjs";
import { GlobalAxis } from "./helperGui";
import { PickingInfo } from "babylonjs";

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

        this._camera.attachControl(this._canvas, false, false);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        this._light.intensity = 0.35;
        this._directionalLight = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), this._scene);
        this._directionalLight.intensity = 0.35;

        // velvet texture
        let velvetMaterial = new BABYLON.StandardMaterial("myMaterial", this._scene);
        let velvet = new BABYLON.Texture("images/groundtile.jpg", this._scene);

        // let velvetBump = new BABYLON.Texture("images/velvet_specular.png", this._scene);
        velvet.uScale = velvet.vScale = 5;
        velvetMaterial.diffuseTexture = velvet;
        velvetMaterial.specularTexture = velvet;
        velvetMaterial.specularColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);
        velvetMaterial.diffuseColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);

        let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1920, height: 1920, subdivisions: 2 }, this._scene);
        ground.material = velvetMaterial;

        // Detect the first mesh touched by the ray
        let box1 = BABYLON.MeshBuilder.CreateBox("box1", { width: 50, height: 50, depth: 50 }, this._scene);
        let redMat = new BABYLON.StandardMaterial("red", this._scene);
        redMat.diffuseColor = new BABYLON.Color3(1, 1, 0.2);
        box1.material = redMat;
        box1.position = new BABYLON.Vector3(0, 25, 0);
        box1.isPickable = false;

        let box2 = BABYLON.MeshBuilder.CreateBox("box1", { width: 50, height: 50, depth: 50 }, this._scene);
        let blueMat = new BABYLON.StandardMaterial("red", this._scene);
        blueMat.diffuseColor = new BABYLON.Color3(0.2, 0, 1);
        box2.material = blueMat;
        box2.position = new BABYLON.Vector3(-200, 25, 0);
        box2.setPivotPoint(new BABYLON.Vector3(0, -25, 0), BABYLON.Space.LOCAL);

        this._scene.registerBeforeRender(() => {
            this.castRay(box1);
        });
        this._scene.onPointerMove = () => {
            this.mousemovef(box1);
        };

        let _globalAxis = new GlobalAxis(100, this._scene);
    }

    vecToLocal(vector: BABYLON.Vector3, mesh: BABYLON.Mesh) {
        var m = mesh.getWorldMatrix();
        var v = BABYLON.Vector3.TransformCoordinates(vector, m);
        return v;
    }

    public castRay(meshCast: BABYLON.Mesh) {
        // get directional vector
        let origin = meshCast.position;
        let forward = new BABYLON.Vector3(0, 0, 1);
        forward = this.vecToLocal(forward, meshCast);

        let direction = forward.subtract(origin);
        let ray = new BABYLON.Ray(origin, direction, 1000);
        let hit = this._scene.pickWithRay(ray);
        // console.log(hit);

        let rayHelper = new BABYLON.RayHelper(ray);
        rayHelper.show(this._scene);

        if (hit != null && hit.pickedMesh) {
            hit.pickedMesh.scaling.y += 0.02;
        }
    }

    mousemovef(m: BABYLON.Mesh) {
        let pickResult = this._scene.pick(this._scene.pointerX, this._scene.pointerY);

        if (pickResult != null)
            if (pickResult.pickedPoint) {
                let diffX = pickResult.pickedPoint.x - m.position.x;
                let diffY = pickResult.pickedPoint.z - m.position.z;
                m.rotation.y = Math.atan2(diffX, diffY);
            }
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
