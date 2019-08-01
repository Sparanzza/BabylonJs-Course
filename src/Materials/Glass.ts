import * as BABYLON from "babylonjs";
export class Glass {
    public material: BABYLON.StandardMaterial;
    public textureEnv: BABYLON.Texture;

    constructor(pathTexture: string, scene: BABYLON.Scene, darkGlass: Boolean) {
        this.material = new BABYLON.StandardMaterial("glassMat", scene);
        this.setReflection(pathTexture, scene, darkGlass);
        this.setFresnel(darkGlass);
    }

    setReflection(path: string, scene: BABYLON.Scene, darkGlass: Boolean) {
        let textureEnviroment = new BABYLON.Texture(path, scene);
        textureEnviroment.vAng = 100;
        this.material.reflectionTexture = textureEnviroment;
        this.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        this.material.diffuseColor = new BABYLON.Color3(0 / 255, 20 / 255, 30 / 255);
        this.material.emissiveColor = new BABYLON.Color3(20 / 255, 30 / 255, 50 / 255);
        this.material.specularPower = 32;
        if (darkGlass) {
            this.material.reflectionTexture.level = 0.5;
            this.material.emissiveColor = new BABYLON.Color3(50 / 255, 20 / 255, 20 / 255);
            this.material.alpha = 0.3;
        } else {
            this.material.alphaMode = BABYLON.Engine.ALPHA_SCREENMODE;
        }
    }

    setFresnel(darkGlass: Boolean) {
        this.material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        this.material.reflectionFresnelParameters.bias = 0.01;
        this.material.reflectionFresnelParameters.power = 10;

        this.material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        this.material.emissiveFresnelParameters.bias = 0.6;
        this.material.emissiveFresnelParameters.power = 4;
        this.material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
        this.material.emissiveFresnelParameters.rightColor = darkGlass == true ? BABYLON.Color3.Gray() : BABYLON.Color3.Black();

        this.material.opacityFresnelParameters = new BABYLON.FresnelParameters();
        this.material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        this.material.opacityFresnelParameters.rightColor = darkGlass == true ? BABYLON.Color3.Gray() : BABYLON.Color3.Black();
    }
}
