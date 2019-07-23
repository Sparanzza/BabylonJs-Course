import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

export class Loader {
    public meshes: BABYLON.AbstractMesh[];
    public animationGroup: BABYLON.AnimationGroup[];

    constructor(public path: string, public file: string) {}

    public load(scene: BABYLON.Scene) {
        BABYLON.SceneLoader.ImportMeshAsync("", this.path, this.file, scene).then(c => {
            this.meshes = c.meshes;
            this.animationGroup = c.animationGroups;
            scene.stopAllAnimations();

            console.log(this.animationGroup);
            console.log(this.meshes);
        });
    }
}
