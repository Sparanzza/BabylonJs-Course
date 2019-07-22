import * as BABYLON from "babylonjs";
import { ShadowGenerator, _BabylonLoaderRegistered, StandardMaterial, Skeleton } from "babylonjs";
import { GlobalAxis } from "./helperGui";
import "babylonjs-loaders";
import * as dat from "dat.gui";

export class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    private _spotLight: BABYLON.SpotLight;
    private _spotLight2: BABYLON.SpotLight;
    private generator: ShadowGenerator;
    private sicbo: any;

    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene(): void {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.clearColor = new BABYLON.Color4(0.4, 0.4, 0.4, 1);
        this._scene.ambientColor = new BABYLON.Color3(0.4, 0.4, 0.4);

        this._camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, new BABYLON.Vector3(0, 1400, 700), this._scene);
        this._camera.setTarget(new BABYLON.Vector3(0, 0, 200));
        this._camera.attachControl(this._canvas, false, false);
        this._camera.fov = 0.785398;

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        this._light.intensity = 0.5;

        this._spotLight = new BABYLON.SpotLight("spot01", new BABYLON.Vector3(400, 400, 400), new BABYLON.Vector3(-1, -1, -1), 1.1, 16, this._scene);
        this._spotLight.intensity = 2;

        this._spotLight2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(-400, 400, 400), new BABYLON.Vector3(1, -1, -1), 1.1, 16, this._scene);
        this._spotLight2.intensity = 2;

        // velvet texture
        let velvetMaterial = new BABYLON.StandardMaterial("myMaterial", this._scene);
        let velvet = new BABYLON.Texture("images/groundtile.jpg", this._scene);
        velvet.uScale = 5;
        velvet.vScale = 5;

        velvet.coordinatesMode = 2;
        velvetMaterial.specularTexture = velvet;
        velvetMaterial.diffuseTexture = velvet;
        velvetMaterial.specularColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);
        velvetMaterial.diffuseColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);

        let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 3072, height: 3072, subdivisions: 2 }, this._scene);
        ground.material = velvetMaterial;
        ground.receiveShadows = true;

        var sphericalMat = new BABYLON.StandardMaterial("sphericalMat", this._scene);
        let goldenReflectionTexture = new BABYLON.Texture("images/hdr/hdr_3.jpg", this._scene);
        goldenReflectionTexture.uRotationCenter = Math.PI / 1.5;
        goldenReflectionTexture.vRotationCenter = Math.PI / 2.5;
        goldenReflectionTexture.wRotationCenter = Math.PI / 1.5;
        sphericalMat.reflectionTexture = goldenReflectionTexture;
        sphericalMat.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        sphericalMat.diffuseColor = new BABYLON.Color3(198 / 255, 130 / 255, 10 / 255);
        sphericalMat.specularPower = 100;
        sphericalMat.alphaMode = BABYLON.Engine.ALPHA_ADD;
        // sphericalMat.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        // sphericalMat.reflectionFresnelParameters.bias = 0.1;
        sphericalMat.ambientColor = new BABYLON.Color3(198 / 255, 130 / 255, 10 / 255);
        sphericalMat.emissiveColor = new BABYLON.Color3(40 / 255, 50 / 255, 10 / 255);
        StandardMaterial.FresnelEnabled = true;

        var glassMat = new BABYLON.StandardMaterial("glassMat", this._scene);
        let textureEnviroment = new BABYLON.Texture("images/hdr/hdr_3.jpg", this._scene);
        textureEnviroment.vAng = 100;
        glassMat.reflectionTexture = textureEnviroment;
        glassMat.alphaMode = BABYLON.Engine.ALPHA_SCREENMODE;
        glassMat.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        glassMat.diffuseColor = new BABYLON.Color3(0 / 255, 0 / 255, 0 / 255);
        glassMat.emissiveColor = new BABYLON.Color3(20 / 255, 20 / 255, 20 / 255);
        glassMat.specularPower = 16;

        // Fresnel
        glassMat.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        glassMat.reflectionFresnelParameters.bias = 0.1;
        // glassMat.reflectionFresnelParameters.leftColor = BABYLON.Color3.Black();
        // glassMat.reflectionFresnelParameters.rightColor = BABYLON.Color3.White();
        glassMat.reflectionFresnelParameters.power = 4;

        glassMat.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        glassMat.emissiveFresnelParameters.bias = 0.6;
        glassMat.emissiveFresnelParameters.power = 4;
        glassMat.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
        glassMat.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

        glassMat.opacityFresnelParameters = new BABYLON.FresnelParameters();
        glassMat.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        glassMat.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

        var gl = new BABYLON.GlowLayer("glow", this._scene, {
            mainTextureFixedSize: 1024,
            blurKernelSize: 64,
            mainTextureSamples: 4
        });
        gl.intensity = 0.6;

        BABYLON.SceneLoader.ImportMeshAsync("", "./models/", "sicBo_00.gltf", this._scene).then(container => {
            this.sicbo = container.meshes;
            console.log(this.sicbo);

            this.generator = new ShadowGenerator(2048, this._spotLight);
            if (this.generator) {
                this.generator.addShadowCaster(container.meshes[0]);
                this.generator.addShadowCaster(container.meshes[1]);
                this.generator.addShadowCaster(container.meshes[5]);
                this.generator.addShadowCaster(container.meshes[3]);
                this.generator.useKernelBlur = true;
                this.generator.blurKernel = 128;
                this.generator.usePercentageCloserFiltering = true;
                this.generator.setDarkness(0.5);
                // this.generator.useContactHardeningShadow = true;
                // this.generator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_HIGH;
                // this.generator.contactHardeningLightSizeUVRatio = 0.2;
            }

            container.meshes[2].material = glassMat;
            container.meshes[5].material = sphericalMat;

            let anim = container.animationGroups.find(e => e.name == "animation1");
            console.log(anim);
            this._scene.stopAllAnimations();
            (<any>anim).play();
            // container.addAllToScene();
        });

        ground.receiveShadows = true;

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
