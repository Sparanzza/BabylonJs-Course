import * as BABYLON from "babylonjs";
import { ShadowGenerator, MaterialHelper, _BabylonLoaderRegistered } from "babylonjs";
import { GlobalAxis } from "./helperGui";
import "babylonjs-loaders";

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

        this._camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, new BABYLON.Vector3(0, 1150, 200), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero());
        this._camera.attachControl(this._canvas, false, false);
        this._camera.fov = 0.785398;

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
        this._light.intensity = 0.5;

        this._spotLight = new BABYLON.SpotLight("spot01", new BABYLON.Vector3(400, 400, 400), new BABYLON.Vector3(-1, -1, -1), 1.1, 16, this._scene);
        this._spotLight.intensity = 2;

        this._spotLight2 = new BABYLON.SpotLight("spot02", new BABYLON.Vector3(-400, 400, 400), new BABYLON.Vector3(1, -1, -1), 1.1, 16, this._scene);
        this._spotLight2.intensity = 2;

        // spot sphere
        let spHelper = BABYLON.MeshBuilder.CreateSphere("spHelper", { diameter: 20 }, this._scene);
        let spHelperMat = new BABYLON.StandardMaterial("spotlightMat", this._scene);
        spHelperMat.emissiveColor = new BABYLON.Color3(1, 0.5, 0);
        spHelper.material = spHelperMat;
        spHelper.parent = this._spotLight;

        // velvet texture
        let velvetMaterial = new BABYLON.StandardMaterial("myMaterial", this._scene);
        let velvet = new BABYLON.Texture("images/groundtile.jpg", this._scene);
        velvet.uScale = 3 * 1.7888;
        velvet.vScale = 3;

        velvet.coordinatesMode = 2;
        velvetMaterial.specularTexture = velvet;
        velvetMaterial.diffuseTexture = velvet;
        velvetMaterial.specularColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);
        velvetMaterial.diffuseColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);

        let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 1920, height: 1080, subdivisions: 2 }, this._scene);
        ground.material = velvetMaterial;
        ground.receiveShadows = true;

        var sphericalMat = new BABYLON.StandardMaterial("sphericalMat", this._scene);
        sphericalMat.reflectionTexture = new BABYLON.Texture("images/hdr/hdr_2.jpg", this._scene);
        sphericalMat.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        // sphericalMat.diffuseColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);
        sphericalMat.alphaMode = BABYLON.Engine.ALPHA_COMBINE;
        sphericalMat.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        sphericalMat.reflectionFresnelParameters.bias = 0.1;
        spHelper.material = sphericalMat;
        BABYLON.SceneLoader.LoadAssetContainerAsync("./models/", "sicBo_00.gltf", this._scene).then(container => {
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

            container.meshes[0].material = sphericalMat;
            container.addAllToScene();
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
