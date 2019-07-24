import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { Glass } from "./Materials/Glass";
import { Gold } from "./Materials/Gold";
import { SceneLoader } from "babylonjs";

export class Loader {
    public meshes: BABYLON.AbstractMesh[];
    public animationGroups: BABYLON.AnimationGroup[];

    constructor(public path: string, public file: string) {}

    public load(scene: BABYLON.Scene): Promise<BABYLON.SceneLoader> {
        return BABYLON.SceneLoader.ImportMeshAsync("", this.path, this.file, scene);
    }

    setMaterial(name: string, material: BABYLON.StandardMaterial) {
        let mesh: BABYLON.AbstractMesh = this.meshes.filter(m => m.name == name)[0];
        mesh.material = material;
    }

    startAnimation(name: string) {
        console.log(name);
        console.log(this.animationGroups.filter(a => a.name == name)[0]);
        // let animation: BABYLON.AnimationGroups = this.animationGroups.filter(a => a.name == name)[0];
        // animation.play();
    }
}
