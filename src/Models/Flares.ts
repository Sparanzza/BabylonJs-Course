import { Flare } from "../Materials/Flare";
import * as BABYLON from "babylonjs";
import { Loader } from "../Loader";

export class Flares extends Loader {
    public flareMat: Flare;

    constructor(public path: string, public file: string, scene: BABYLON.Scene, pathTexture: string) {
        super(path, file);
    }

    setFlare(pathTexture: string, scene: BABYLON.Scene) {
        this.flareMat = new Flare(pathTexture, scene);
        for (let i = 0; i < 16; i++) {
            let m = <BABYLON.Mesh>this.getMesh("flare_" + i);
            m.material = this.flareMat;
            m.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
            m.renderingGroupId = 1;
            m.position.y = -1;
        }
    }
}
