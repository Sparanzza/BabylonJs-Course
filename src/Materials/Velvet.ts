import * as BABYLON from "babylonjs";
export class Velvet {
    public material: BABYLON.StandardMaterial;
    public texture: BABYLON.Texture;

    constructor(pathTexture: string, scene: BABYLON.Scene) {
        // Material
        this.material = new BABYLON.StandardMaterial("velvetMat", scene);
        this.material.specularColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);
        this.material.diffuseColor = new BABYLON.Color3(198 / 255, 13 / 255, 37 / 255);

        // Texture
        this.texture = new BABYLON.Texture(pathTexture, scene);
        this.texture.uScale = 5;
        this.texture.vScale = 5;
        this.texture.coordinatesMode = BABYLON.Texture.PLANAR_MODE;
        this.material.specularTexture = this.texture;
        this.material.diffuseTexture = this.texture;
    }
}
