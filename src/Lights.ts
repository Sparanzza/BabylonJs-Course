import * as BABYLON from "babylonjs";
import { ShadowGenerator } from "babylonjs";

export class Lights {
    public light: BABYLON.Light;
    public spotLightL: BABYLON.SpotLight;
    public spotLightR: BABYLON.SpotLight;
    public generator: BABYLON.ShadowGenerator;

    constructor(public scene: BABYLON.Scene) {
        this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
        this.spotLightL = new BABYLON.SpotLight("spotLightL", new BABYLON.Vector3(400, 400, 400), new BABYLON.Vector3(-1, -1, -1), 10, 16, scene);
        this.spotLightR = new BABYLON.SpotLight("spotLightR", new BABYLON.Vector3(-400, 400, 400), new BABYLON.Vector3(1, -1, -1), 10, 16, scene);

        this.light.intensity = 0.5;
        this.spotLightL.intensity = 3;
        this.spotLightR.intensity = 3;

        this.light.shadowEnabled = true;
    }

    public setSpotlightLIntensity(i: number) {
        this.spotLightL.intensity = i;
    }
    public setSpotlightRIntensity(i: number) {
        this.spotLightR.intensity = i;
    }
    public setlightLIntensity(i: number) {
        this.light.intensity = i;
    }

    public setShadowSettings(_light: BABYLON.IShadowLight, blurKernel: number) {
        this.generator = new ShadowGenerator(2048, _light);
        this.generator.useKernelBlur = true;
        this.generator.blurKernel = blurKernel;
        this.generator.usePercentageCloserFiltering = true;
        this.generator.setDarkness(0.5);
    }

    public addMesh(mesh: BABYLON.Mesh) {
        this.generator.addShadowCaster(mesh);
    }
}
