/*
 var sphericalMat = new BABYLON.StandardMaterial("sphericalMat", this._scene);
 let goldenReflectionTexture = new BABYLON.Texture("images/hdr/hdr_3.jpg", this._scene);
 goldenReflectionTexture.uRotationCenter = Math.PI / 1.5;
 goldenReflectionTexture.vRotationCenter = Math.PI / 2.5;
 goldenReflectionTexture.wRotationCenter = Math.PI / 1.5;
 sphericalMat.reflectionTexture = goldenReflectionTexture;
 sphericalMat.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
 sphericalMat.diffuseColor = new BABYLON.Color3(198 / 255, 130 / 255, 10 / 255);
 sphericalMat.specularPower = 100;
 sphericalMat.alphaMode = BABYLON.Engine.ALPHA_ADD;
 // sphericalMat.reflectionFresnelParameters = new BABYLON.FresnelParameters();
 // sphericalMat.reflectionFresnelParameters.bias = 0.1;
 sphericalMat.ambientColor = new BABYLON.Color3(198 / 255, 130 / 255, 10 / 255);
 sphericalMat.emissiveColor = new BABYLON.Color3(40 / 255, 50 / 255, 10 / 255);
 StandardMaterial.FresnelEnabled = true;

 */
import * as BABYLON from "babylonjs";
export class Ground {
    public geom: BABYLON.Mesh;
    constructor(w: number, h: number, scene: BABYLON.Scene) {
        this.geom = BABYLON.MeshBuilder.CreateGround("ground", { width: w, height: h, subdivisions: 2 }, scene);
        this.geom.receiveShadows = false;
    }
    setMaterial(material: BABYLON.StandardMaterial) {
        this.geom.material = material;
    }
    setRecievedShadow(b: boolean) {
        this.geom.receiveShadows = b;
    }
}
