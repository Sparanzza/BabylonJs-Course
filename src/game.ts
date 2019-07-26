import * as BABYLON from "babylonjs";
import { HelperViewport } from "./HelperViewport";
import { Gui } from "./Gui";
import { Lights } from "./Lights";
import { Cameras } from "./Cameras";
import { Glass } from "./Materials/Glass";
import { Gold } from "./Materials/Gold";
import { SceneLoader, AnimationGroup } from "babylonjs";
//Material
import { Velvet } from "./Materials/Velvet";

//Meshes
import { Ground } from "./Models/Ground";
import { Loader } from "./Loader";

import { FX } from "./FX";

export class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private gui: Gui;

    private lights: Lights;
    private cameras: Cameras;
    private sicbo: Loader;
    private ground: Ground;
    private velvetMat: Velvet;

    private pathImageHdr = "images/hdr/";
    private hdrImage = "hdr_1.jpg";
    private pathModels = "./models/";
    private groundTile = "images/groundtile.jpg";
    private sicBoFileName = "sicBo.gltf";

    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.clearColor = new BABYLON.Color4(0.3, 0.3, 0.3, 1);
        this._scene.ambientColor = new BABYLON.Color3(0.65, 0.65, 0.65);
    }

    createScene(): void {
        this.gui = new Gui(); //dat.Gui
        new HelperViewport(100, this._scene); //Helper Axis

        this.lights = new Lights(this._scene); //Lights
        this.cameras = new Cameras(this._scene, this._canvas); // Cameras

        // Ground
        this.velvetMat = new Velvet(this.groundTile, this._scene);
        this.ground = new Ground(3072, 3072, this._scene); //Ground
        this.ground.setMaterial(this.velvetMat.material);

        this.sicbo = new Loader(this.pathModels, this.sicBoFileName); // Loaders
        this.sicbo.load(this._scene).then((c: any) => {
            console.log(c);
            console.log(c.meshes);
            this.sicbo.meshes = c.meshes;
            this.sicbo.animationGroups = c.animationGroups;
            this._scene.stopAllAnimations();
            this.sicbo.setMaterial("goldFrame", new Gold(this.pathImageHdr + this.hdrImage, this._scene).material);
            this.sicbo.setMaterial("glass", new Glass(this.pathImageHdr + this.hdrImage, this._scene).material);

            this.gui._sicbo = this.sicbo;
        });

        new FX(this._scene); // FX
    }

    startGame() {
        // TODO
    }

    doRender(): void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener("resize", () => {
            this._engine.resize();
        });
    }
}
