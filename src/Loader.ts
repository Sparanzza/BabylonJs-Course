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

    public setMaterial(name: string, material: BABYLON.StandardMaterial) {
        let mesh: BABYLON.AbstractMesh = this.meshes.filter(m => m.name == name)[0];
        mesh.material = material;
    }

    public setKeyframe(animationGroupName: string, targetPropertyName: string, targetName: string, key: any, indexKey: number) {
        let animationGroup = <any>this.animationGroups.find((e: any) => e.name == animationGroupName);
        // console.log(animationGroup);
        let targetProperty = animationGroup.targetedAnimations
            .filter((e: any) => {
                return e.animation.targetProperty == targetPropertyName;
            })
            .find((e: any) => {
                return e.target.name == targetName;
            });

        targetProperty.animation._keys[indexKey].value = key;
        // console.log(targetProperty.animation._keys[indexKey].value);
    }

    public startAnimation(name: string) {
        // console.log(this.animationGroups.filter(a => a.name == name)[0]);
        (<any>this.animationGroups.find((e: any) => e.name == name)).play();
        // console.log(this.animationGroups.find((e: any) => e.name == name));
    }

    public getMesh(name: string): BABYLON.AbstractMesh {
        return <BABYLON.AbstractMesh>this.meshes.find((e: any) => e.name == name);
    }

    public setRatioGroupAnimation(ratio: Number, animationGroupName: string) {
        let animationGroup = <any>this.animationGroups.find((e: any) => e.name == animationGroupName);
        console.log(animationGroup);
        animationGroup._speedRatio = ratio;
    }
}
