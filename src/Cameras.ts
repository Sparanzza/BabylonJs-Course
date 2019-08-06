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
            60,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        var keysPosition = [];
        keysPosition.push({
            frame: 0,
            value: fromPos
        });
        keysPosition.push({
            frame: 300,
            value: toPos
        });

        animCamPosition.setKeys(keysPosition);

        var animCamTgt = new BABYLON.Animation(
            "animTgt",
            "lockedTarget",
            60,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        var keysTgt = [];
        keysTgt.push({
            frame: 0,
            value: fromTgt
        });
        keysTgt.push({
            frame: 300,
            value: toTgt
        });

        animCamTgt.setKeys(keysTgt);
        // ease animation
        let easingFunction = new BABYLON.CircleEase();
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        animCamPosition.setEasingFunction(easingFunction);
        animCamTgt.setEasingFunction(easingFunction);

        c.animations.push(animCamPosition);
        c.animations.push(animCamTgt);
        scene.beginAnimation(c, 0, 300, false, 1, () => {
            console.log("finished animation Camera");
        });
    }
}
