import * as BABYLON from "babylonjs";
export class Flare extends BABYLON.StandardMaterial {
    // public material: BABYLON.StandardMaterial;
    public texture: BABYLON.Texture;
    constructor(pathTexture: string, scene: BABYLON.Scene) {
        super("flare", scene);
        this.disableLighting = true;
        this.texture = new BABYLON.Texture(pathTexture, scene);
        this.diffuseTexture = this.texture;
        this.alphaMode = BABYLON.Engine.ALPHA_ADD;
        this.emissiveColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        this.opacityTexture = this.texture;
    }
}
