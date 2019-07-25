import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
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

    setKeyframe(animationGroupName: string, targetProperty: string, targetAnimation: string) {
        let animationGroup = <any>this.animationGroups.find((e: any) => e.name == animationGroupName);
        // animationGroup.targetedAnimation.array.forEach(e => {
        //     e.
        // });
    }

    startAnimation(name: string) {
        console.log(this.animationGroups.filter(a => a.name == name)[0]);
        (<any>this.animationGroups.find((e: any) => e.name == name)).play();
    }
}
