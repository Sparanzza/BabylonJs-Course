import * as BABYLON from "babylonjs";
export class FX {
    public glow: BABYLON.GlowLayer;
    constructor(scene: BABYLON.Scene) {
        this.glow = new BABYLON.GlowLayer("glow", scene, {
            mainTextureFixedSize: 1024,
            blurKernelSize: 64,
            mainTextureSamples: 4
        });
        this.glow.intensity = 2;
    }
    setIntensity(i: number) {
        this.glow.intensity = i;
    }
}
