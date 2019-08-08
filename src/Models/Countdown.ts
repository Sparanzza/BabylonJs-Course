import { Loader } from "../Loader";
import { Flare } from "../Materials/Flare";
import * as BABYLON from "babylonjs";

export class Countdown extends Loader {
    public flareMat: Flare;
    constructor(public path: string, public file: string, scene: BABYLON.Scene) {
        super(path, file);
    }

    setFlare(pathTexture: string, meshName: string, scene: BABYLON.Scene) {
        this.flareMat = new Flare(pathTexture, scene);
        for (let i = 1; i < 4; i++) {
            let m = <BABYLON.Mesh>this.getMesh(meshName + i);
            console.log(m);
            m.material = this.flareMat;
            m.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
            m.renderingGroupId = 2;
        }
    }
}
