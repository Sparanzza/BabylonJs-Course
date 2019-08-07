import * as BABYLON from "babylonjs";
export class FX {
    public glow: BABYLON.GlowLayer;
    public postProcess: BABYLON.ImageProcessingPostProcess;
    constructor(scene: BABYLON.Scene, camera: BABYLON.ArcRotateCamera) {
        // this.glow = new BABYLON.GlowLayer("glow", scene, {
        //     mainTextureFixedSize: 1024,
        //     blurKernelSize: 64,
        //     mainTextureSamples: 6
        // });
        // this.glow.intensity = 0.5;
        // this.setBloom(scene, camera);
        // this.setVignette(camera);
    }

    setVignette(c: BABYLON.ArcRotateCamera) {
        this.postProcess = new BABYLON.ImageProcessingPostProcess("processing", 1.0, c);
        this.postProcess.vignetteWeight = 0.5;
        this.postProcess.vignetteStretch = 0.5;
        this.postProcess.vignetteColor = new BABYLON.Color4(0, 0, 0, 0);
        this.postProcess.vignetteEnabled = true;
        // this.postProcess.vignetteBlendMode = BABYLON.ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY;
    }
    setBloom(s: BABYLON.Scene, c: BABYLON.ArcRotateCamera) {
        var postProcess = new BABYLON.FxaaPostProcess("fxaa", 1.0, c);
        var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, s, [c]);
        defaultPipeline.bloomEnabled = true;
        defaultPipeline.bloomWeight = 0.5;
        defaultPipeline.bloomKernel = 8;
    }

    setIntensity(i: number) {
        this.glow.intensity = i;
    }

    excludeGeometry(m: BABYLON.Mesh) {
        this.glow.addExcludedMesh(m);
    }
}
