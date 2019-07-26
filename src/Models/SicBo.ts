import { Loader } from "../Loader";
import { Vector3, Mesh } from "babylonjs";

class SicBo extends Loader {
    public dices: BABYLON.Mesh;
    public dicesCenterXYZ: BABYLON.Vector3;
    constructor(public path: string, public file: string) {
        super(path, file);
        this.dicesCenterXYZ = new BABYLON.Vector3(0, 42, 0);
        this.getMesh("SELECT_FACE_1").setPivotPoint(new BABYLON.Vector3(0, 42, 0), BABYLON.Space.LOCAL);
    }

    setDicesFacesResult(n0: number, n1: number) {
        // this.sicbo.getMesh("SELECT_FACE_1").setPivotPoint(new BABYLON.Vector3(0, 42, 0), BABYLON.Space.LOCAL);
        // this.sicbo.getMesh("SELECT_FACE_1").rotationQuaternion = BABYLON.Quaternion.RotationAlphaBetaGamma(alpha, beta, gamma);
    }
}
