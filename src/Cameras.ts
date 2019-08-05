import * as BABYLON from "babylonjs";
import { ImageProcessingPostProcess } from "babylonjs";

export class Cameras {
    public mainCamera: BABYLON.ArcRotateCamera;
    public initPosMainCamera = new BABYLON.Vector3(0, 1750, 950);
    public initTgtMainCamera = new BABYLON.Vector3(0, 0, 350);
    public inGamePosMainCamera = new BABYLON.Vector3(0, 1, 800);
    public inGameTgtMainCamera = new BABYLON.Vector3(0, 0, 0);

    public fixCameraFX: BABYLON.ArcRotateCamera;
    public animationMainCamera: BABYLON.Animation;

    constructor(scene: BABYLON.Scene, canvas: any) {
        this.mainCamera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 4, 4, this.initPosMainCamera, scene);
        this.mainCamera.setTarget(this.initTgtMainCamera);
        this.mainCamera.fov = 0.785398;
        this.mainCamera.attachControl(canvas, false, false);
        this.mainCamera.viewport = new BABYLON.Viewport(0, 0, 1, 1);

        this.animateCameraPositionAndRotation(
            this.mainCamera,
            this.initPosMainCamera,
            this.inGamePosMainCamera,
            this.initTgtMainCamera,
            this.inGameTgtMainCamera,
            scene
        );
    }

    animateCameraPositionAndRotation(
        c: BABYLON.Camera,
        fromPos: BABYLON.Vector3,
        toPos: BABYLON.Vector3,
        fromTgt: BABYLON.Vector3,
        toTgt: BABYLON.Vector3,
        scene: BABYLON.Scene
    ) {
        console.log("animation Camera");
        var animCamPosition = new BABYLON.Animation(
            "animCam",
            "position",
            30,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        var keysPosition = [];
        keysPosition.push({
            frame: 0,
            value: fromPos
        });
        keysPosition.push({
            frame: 100,
            value: toPos
        });

        animCamPosition.setKeys(keysPosition);

        var animCamTgt = new BABYLON.Animation(
            "animTgt",
            "lockedTarget",
            30,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        var keysRotation = [];
        keysRotation.push({
            frame: 0,
            value: fromTgt
        });
        keysRotation.push({
            frame: 100,
            value: toTgt
        });

        animCamTgt.setKeys(keysRotation);
        c.animations.push(animCamPosition);
        c.animations.push(animCamTgt);

        scene.beginAnimation(c, 0, 100, true);
    }
}
