import { Loader } from "../Loader";
import * as BABYLON from "babylonjs";

export class SicBo extends Loader {
    public dices: BABYLON.Mesh;
    public lastGameResult = {
        value0: 1,
        value1: 1,
        value2: 2
    };
    public dicesCenterXYZ: BABYLON.Vector3;
    constructor(public path: string, public file: string) {
        super(path, file);
    }

    setDicesFacesResult(n0: number, n1: number, n2: number) {
        // init Keyframe
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_0", this.convertFacesToQuaternion(this.lastGameResult.value0), 0);
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_1", this.convertFacesToQuaternion(this.lastGameResult.value1), 0);
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_2", this.convertFacesToQuaternion(this.lastGameResult.value2), 0);

        // last Keyframe
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_0", this.convertFacesToQuaternion(n0), 1);
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_1", this.convertFacesToQuaternion(n1), 1);
        this.setKeyframe("pushDices", "rotationQuaternion", "SELECT_FACE_2", this.convertFacesToQuaternion(n2), 1);
        this.lastGameResult.value0 = n0;
        this.lastGameResult.value1 = n1;
        this.lastGameResult.value2 = n2;
    }

    convertFacesToQuaternion(n: number): BABYLON.Quaternion {
        console.log("el muneros es " + n);
        switch (n) {
            case 1:
                return BABYLON.Quaternion.FromEulerAngles(0, 0, 0);
                break;
            case 2:
                return BABYLON.Quaternion.FromEulerAngles(Math.PI, Math.PI / 2, 0);
                break;
            case 3:
                return BABYLON.Quaternion.FromEulerAngles(Math.PI / 2, 0, 0);
                break;
            case 4:
                return BABYLON.Quaternion.FromEulerAngles(-Math.PI / 2, 0, 0);
                break;
            case 5:
                return BABYLON.Quaternion.FromEulerAngles(0, 0, (-Math.PI * 3) / 2);
                break;
            case 6:
                return BABYLON.Quaternion.FromEulerAngles(0, 0, -Math.PI / 2);
                break;
            default:
                return BABYLON.Quaternion.FromEulerAngles(0, 0, 0);
                break;
        }
    }

    randomPlacesEnding() {
        // TODO
    }
}
