import * as BABYLON from "babylonjs";
import { ShadowGenerator, MaterialHelper, _BabylonLoaderRegistered } from "babylonjs";
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

        let particleSystem = new BABYLON.ParticleSystem("particles", 20000, this._scene);
        let particleTexture = new BABYLON.Texture("images/flare.png", this._scene);
        particleSystem.particleTexture = particleTexture;
        particleSystem.translationPivot = new BABYLON.Vector2(0, -0.5); // In this case the scale will come from the bottom of the particle

        particleSystem.emitter = new BABYLON.Vector3(-1, 2, 3);
        particleSystem.minEmitBox = new BABYLON.Vector3(-40, 0, -40); // Starting all from
        particleSystem.maxEmitBox = new BABYLON.Vector3(40, 40, 40);

        // size
        particleSystem.minSize = 1.5;
        particleSystem.maxSize = 3;
        particleSystem.minLifeTime = 2;
        particleSystem.maxLifeTime = 50;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
        particleSystem.emitRate = 10000;
        // velocity
        particleSystem.minEmitPower = 5;
        particleSystem.maxEmitPower = 50;
        particleSystem.updateSpeed = 0.005;
        particleSystem.addVelocityGradient(0, 0.5);
        particleSystem.addDragGradient(0, 0.5);
        particleSystem.addAlphaRemapGradient(0, 0, 0.1);
        particleSystem.addAlphaRemapGradient(1.0, 0.1, 0.8);
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
        //Gravity
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

        // direction
        particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
        particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

        particleSystem.billboardMode = BABYLON.ParticleSystem.BILLBOARDMODE_ALL;

        particleSystem.start();
        this._scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

        let lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", this._spotLight, this._scene);
        let flare00 = new BABYLON.LensFlare(0.2, 0, new BABYLON.Color3(1, 1, 1), "images/Flare.png", lensFlareSystem);
        let flare01 = new BABYLON.LensFlare(0.5, 0.2, new BABYLON.Color3(0.5, 0.5, 1), "images/Flare.png", lensFlareSystem);
        let flare02 = new BABYLON.LensFlare(0.2, 1.0, new BABYLON.Color3(1, 1, 1), "images/Flare.png", lensFlareSystem);
        let flare03 = new BABYLON.LensFlare(0.4, 0.4, new BABYLON.Color3(1, 0.5, 1), "images/Flare.png", lensFlareSystem);
        let flare04 = new BABYLON.LensFlare(0.1, 0.6, new BABYLON.Color3(1, 1, 1), "images/Flare.png", lensFlareSystem);
        let flare05 = new BABYLON.LensFlare(0.3, 0.8, new BABYLON.Color3(1, 1, 1), "images/Flare.png", lensFlareSystem);

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
