import * as BABYLON from "babylonjs";
import { ImageProcessingPostProcess } from "babylonjs";

export class Cameras {
    public mainCamera: BABYLON.ArcRotateCamera;
    public fixCameraFX: BABYLON.ArcRotateCamera;

    constructor(scene: BABYLON.Scene, canvas: any) {
        this.mainCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, new BABYLON.Vector3(0, 1750, 950), scene);
        this.mainCamera.setTarget(new BABYLON.Vector3(0, 0, 350));
        this.mainCamera.fov = 0.785398;
        this.mainCamera.attachControl(canvas, false, false);
        this.mainCamera.viewport = new BABYLON.Viewport(0, 0, 1, 1);
    }
}
