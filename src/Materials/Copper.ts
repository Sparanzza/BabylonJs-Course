import * as BABYLON from "babylonjs";
import { StandardMaterial } from "babylonjs";
export class Copper extends StandardMaterial {
    public texture: BABYLON.Texture;
    constructor(pathTexture: string, scene: BABYLON.Scene) {
        super("copper", scene);
        this.texture = new BABYLON.Texture(pathTexture, scene);

        this.reflectionTexture = this.texture;
        this.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        this.reflectionTexture.level = 0.5;

        this.specularPower = 1;
        this.diffuseColor = new BABYLON.Color3(255 / 255, 224 / 255, 205 / 255);
        this.alphaMode = BABYLON.Engine.ALPHA_ADD;

        this.ambientColor = new BABYLON.Color3(25 / 255, 22 / 255, 20 / 255);
        // this.emissiveColor = new BABYLON.Color3(40 / 255, 50 / 255, 10 / 255);
        BABYLON.StandardMaterial.FresnelEnabled = true;
    }
}
