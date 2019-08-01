import * as BABYLON from "babylonjs";
export class Copper {
    public material: BABYLON.StandardMaterial;
    public texture: BABYLON.Texture;
    constructor(pathTexture: string, scene: BABYLON.Scene) {
        this.material = new BABYLON.StandardMaterial("gold", scene);
        this.texture = new BABYLON.Texture(pathTexture, scene);

        this.material.reflectionTexture = this.texture;
        this.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        this.material.reflectionTexture.level = 0.5;

        this.material.specularPower = 1;
        this.material.diffuseColor = new BABYLON.Color3(255 / 255, 224 / 255, 205 / 255);
        this.material.alphaMode = BABYLON.Engine.ALPHA_ADD;

        this.material.ambientColor = new BABYLON.Color3(25 / 255, 22 / 255, 20 / 255);
        // this.material.emissiveColor = new BABYLON.Color3(40 / 255, 50 / 255, 10 / 255);
        BABYLON.StandardMaterial.FresnelEnabled = true;
    }
}
