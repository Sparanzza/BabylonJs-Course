import * as BABYLON from "babylonjs";
export class Glass extends BABYLON.StandardMaterial {
    public textureEnv: BABYLON.Texture;

    constructor(pathTexture: string, scene: BABYLON.Scene, darkGlass: Boolean) {
        super("glass", scene);
        this.setReflection(pathTexture, scene, darkGlass);
        this.setFresnel(darkGlass);
    }

    setReflection(path: string, scene: BABYLON.Scene, darkGlass: Boolean) {
        let textureEnviroment = new BABYLON.Texture(path, scene);
        textureEnviroment.vAng = 100;
        this.reflectionTexture = textureEnviroment;
        this.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        this.diffuseColor = new BABYLON.Color3(0 / 255, 20 / 255, 30 / 255);
        this.emissiveColor = new BABYLON.Color3(20 / 255, 30 / 255, 50 / 255);
        this.specularPower = 32;
        if (darkGlass) {
            this.reflectionTexture.level = 0.5;
            this.emissiveColor = new BABYLON.Color3(50 / 255, 20 / 255, 20 / 255);
            this.alpha = 0.3;
        } else {
            this.alphaMode = BABYLON.Engine.ALPHA_SCREENMODE;
        }
    }

    setFresnel(darkGlass: Boolean) {
        this.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        this.reflectionFresnelParameters.bias = 0.01;
        this.reflectionFresnelParameters.power = 10;

        this.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        this.emissiveFresnelParameters.bias = 0.6;
        this.emissiveFresnelParameters.power = 4;
        this.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
        this.emissiveFresnelParameters.rightColor = darkGlass == true ? BABYLON.Color3.Gray() : BABYLON.Color3.Black();

        this.opacityFresnelParameters = new BABYLON.FresnelParameters();
        this.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        this.opacityFresnelParameters.rightColor = darkGlass == true ? BABYLON.Color3.Gray() : BABYLON.Color3.Black();
    }
}
