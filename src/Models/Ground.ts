import * as BABYLON from "babylonjs";
export class Ground {
    public geom: BABYLON.Mesh;
    constructor(w: number, h: number, scene: BABYLON.Scene) {
        this.geom = BABYLON.MeshBuilder.CreateGround("ground", { width: w, height: h, subdivisions: 2 }, scene);
        this.geom.receiveShadows = false;
    }
    setMaterial(material: BABYLON.StandardMaterial) {
        this.geom.material = material;
    }
    setRecievedShadow(b: boolean) {
        this.geom.receiveShadows = b;
    }
}
