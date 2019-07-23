import * as BABYLON from "babylonjs";
export class Glass {
    public material: BABYLON.StandardMaterial;
    public textureEnv: BABYLON.Texture;

    constructor(scene: BABYLON.Scene) {
        this.material = new BABYLON.StandardMaterial("glassMat", scene);
    }

    setReflection(path: string, scene: BABYLON.Scene) {
        let textureEnviroment = new BABYLON.Texture(path, scene);
        textureEnviroment.vAng = 100;
        this.material.reflectionTexture = textureEnviroment;
        this.material.alphaMode = BABYLON.Engine.ALPHA_SCREENMODE;
        this.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
        this.material.diffuseColor = new BABYLON.Color3(0 / 255, 0 / 255, 0 / 255);
        this.material.emissiveColor = new BABYLON.Color3(20 / 255, 20 / 255, 20 / 255);
        this.material.specularPower = 16;
    }

    setFresnel() {
        this.material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        this.material.reflectionFresnelParameters.bias = 0.1;
        this.material.reflectionFresnelParameters.power = 4;

        this.material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        this.material.emissiveFresnelParameters.bias = 0.6;
        this.material.emissiveFresnelParameters.power = 4;
        this.material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
        this.material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

        this.material.opacityFresnelParameters = new BABYLON.FresnelParameters();
        this.material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        this.material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();
    }
}
