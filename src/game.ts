import * as BABYLON from "babylonjs";
import { ShadowGenerator, MaterialHelper } from "babylonjs";
import { GlobalAxis } from "./helperGui";
import { PickingInfo } from "babylonjs";

export class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    private _spotLight: BABYLON.SpotLight;
    private generator: ShadowGenerator;

    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene(): void {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.clearColor = new BABYLON.Color4(0.4, 0.4, 0.4, 1);
        this._scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4);

        this._camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, new BABYLON.Vector3(0, 1100, 0), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false, false);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        this._light.intensity = 0.35;
        this._spotLight = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(400, 200, 400), new BABYLON.Vector3(-1, -1, -1), 1.1, 16, this._scene);
        this._spotLight.intensity = 2;
        this._spotLight.exponent = 20;

        // spot sphere
        let spHelper = BABYLON.MeshBuilder.CreateSphere("spHelper", { diameter: 20 }, this._scene);
        let spHelperMat = new BABYLON.StandardMaterial("spotlightMat", this._scene);
        spHelperMat.emissiveColor = new BABYLON.Color3(1, 0.5, 0);
        spHelper.material = spHelperMat;
        spHelper.parent = this._spotLight;
        // velvet texture
        let velvetMaterial = new BABYLON.StandardMaterial("myMaterial", this._scene);
        let velvet = new BABYLON.Texture("images/groundtile.jpg", this._scene);
        velvet.uScale = velvet.vScale = 5;
        velvetMaterial.diffuseTexture = velvet;
        velvetMaterial.specularTexture = velvet;
        velvetMaterial.specularColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);
        velvetMaterial.diffuseColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);

        let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1920, height: 1920, subdivisions: 2 }, this._scene);
        ground.material = velvetMaterial;
        ground.receiveShadows = true;

        let box1 = BABYLON.MeshBuilder.CreateBox("box1", { width: 50, height: 50, depth: 50 }, this._scene);
        let redMat = new BABYLON.StandardMaterial("red", this._scene);
        redMat.diffuseColor = new BABYLON.Color3(1, 0.5, 0.2);
        box1.material = redMat;
        box1.position = new BABYLON.Vector3(0, 50, 0);
        box1.isPickable = false;

        // Shadows
        this.generator = new ShadowGenerator(1024, this._spotLight);
        if (this.generator) {
            this.generator.addShadowCaster(box1);
            // this.generator.useBlurExponentialShadowMap = true;
            // this.generator.useKernelBlur = true;
            // this.generator.blurKernel = 64;
            // this.generator.usePercentageCloserFiltering = true;
            this.generator.useContactHardeningShadow = true;
            this.generator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_HIGH;
            this.generator.contactHardeningLightSizeUVRatio = 0.2;
        }

        ground.receiveShadows = true;
        //animation rotate box
        let boxAnimX = new BABYLON.Animation("rotateBoxX", "rotation.x", 50, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        let boxAnimY = new BABYLON.Animation("rotateBoxY", "rotation.y", 50, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        let keys = [];
        keys.push({ frame: 0, value: 0 });
        keys.push({ frame: 12000, value: 360 });
        boxAnimX.setKeys(keys);
        boxAnimY.setKeys(keys);

        box1.animations.push(boxAnimX);
        box1.animations.push(boxAnimY);
        this._scene.beginAnimation(box1, 0, 12000, true);
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
