import * as BABYLON from "babylonjs";
import { Mesh } from "babylonjs";

export class GlobalAxis {
    constructor(size: number, scene: BABYLON.Scene) {
        let axisX = BABYLON.Mesh.CreateLines("axisX", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)], scene);
        axisX.color = new BABYLON.Color3(1, 0, 0);
        var xChar = this.makeTextPlane("X", "red", size / 10, scene);
        xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
        var axisY = BABYLON.Mesh.CreateLines("axisY", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)], scene);
        axisY.color = new BABYLON.Color3(0, 1, 0);
        var yChar = this.makeTextPlane("Y", "green", size / 10, scene);
        yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
        var axisZ = BABYLON.Mesh.CreateLines("axisZ", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)], scene);
        axisZ.color = new BABYLON.Color3(0, 0, 1);
        var zChar = this.makeTextPlane("Z", "blue", size / 10, scene);
        zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
    }

    private makeTextPlane(text: string, color: string, size: number, scene: BABYLON.Scene) {
        let dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);

        let plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
        let materialplane = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        materialplane.backFaceCulling = true;
        materialplane.specularColor = new BABYLON.Color3(0, 0, 0);
        materialplane.diffuseTexture = dynamicTexture;
        plane.material = materialplane;
        return plane;
    }
}
