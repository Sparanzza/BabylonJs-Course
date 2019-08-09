import * as BABYLON from "babylonjs";
export class Gold extends BABYLON.StandardMaterial {
    public texture: BABYLON.Texture;
    constructor(pathTexture: string, scene: BABYLON.Scene) {
        super("gold", scene);
        this.texture = new BABYLON.Texture(pathTexture, scene);

        this.reflectionTexture = this.texture;
        this.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        this.reflectionTexture.level = 0.6;

        this.diffuseColor = new BABYLON.Color3(198 / 255, 130 / 255, 10 / 255);
        this.specularPower = 10;
        this.alphaMode = BABYLON.Engine.ALPHA_ADD;

        this.ambientColor = new BABYLON.Color3(198 / 255, 130 / 255, 10 / 255);
        this.emissiveColor = new BABYLON.Color3(60 / 255, 70 / 255, 30 / 255);
        BABYLON.StandardMaterial.FresnelEnabled = true;
    }
}
