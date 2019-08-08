import { Loader } from "../Loader";
import * as BABYLON from "babylonjs";

export class Odds extends Loader {
    constructor(public path: string, public file: string, scene: BABYLON.Scene) {
        super(path, file);
    }
}
