import * as BABYLON from "babylonjs";
import { HelperViewport } from "./HelperViewport";
import { Gui } from "./Gui";
import { Lights } from "./Lights";
import { Cameras } from "./Cameras";
//Material
import { Velvet } from "./Materials/Velvet";
import { Glass } from "./Materials/Glass";
//Meshes
import { Ground } from "./Models/Ground";
import { Loader } from "./Loader";

import { FX } from "./FX";

export class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;

    private lights: Lights;
    private cameras: Cameras;
    private sicbo: Loader;
    private ground: Ground;
    private velvetMat: Velvet;

    constructor(canvasElement: string) {
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.clearColor = new BABYLON.Color4(0.3, 0.3, 0.3, 1);
        this._scene.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    }

    createScene(): void {
        new HelperViewport(100, this._scene); //Helper Axis
        this.lights = new Lights(this._scene); //Lights
        this.cameras = new Cameras(this._scene, this._canvas); // Cameras

        this.sicbo = new Loader("./models/", "sicBo_00.babylon"); // Loaders
        this.sicbo.load(this._scene);

        this.velvetMat = new Velvet("images/groundtile.jpg", this._scene);

        this.ground = new Ground(3072, 3072, this._scene); //Ground
        this.ground.setMaterial(this.velvetMat.material);

        new FX(this._scene); // FX
        new Gui(); //dat.Gui
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
