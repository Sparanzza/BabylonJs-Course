import * as BABYLON from "babylonjs";

export class Cameras {
    public mainCamera: BABYLON.ArcRotateCamera;
    constructor(scene: BABYLON.Scene, canvas: any) {
        this.mainCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, new BABYLON.Vector3(0, 1400, 700), scene);
        this.mainCamera.setTarget(new BABYLON.Vector3(0, 0, 200));
        this.mainCamera.attachControl(canvas, false, false);
        this.mainCamera.fov = 0.785398;
    }
}
