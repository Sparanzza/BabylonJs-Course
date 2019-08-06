import * as BABYLON from "babylonjs";
export class Flare {
    public material: BABYLON.StandardMaterial;
    public texture: BABYLON.Texture;
    constructor(pathTexture: string, scene: BABYLON.Scene) {
        this.material = new BABYLON.StandardMaterial("flare", scene);
        this.material.disableLighting = true;
        this.texture = new BABYLON.Texture(pathTexture, scene);
        this.material.diffuseTexture = this.texture;
        (<BABYLON.Texture>this.material.diffuseTexture).hasAlpha = true;
        // this.material.alphaMode = BABYLON.Engine.ALPHA_ADD;
    }
}
