import * as BABYLON from "babylonjs";
import { HelperViewport } from "./HelperViewport";
import { Gui } from "./Gui";
import { Lights } from "./Lights";
import { Cameras } from "./Cameras";
import { Glass } from "./Materials/Glass";
import { Gold } from "./Materials/Gold";
import { Copper } from "./Materials/Copper";
//Material
import { Velvet } from "./Materials/Velvet";

//Meshes
import { Ground } from "./Models/Ground";
import { SicBo } from "./Models/SicBo";
import { Flares } from "./Models/Flares";
import { Countdown } from "./Models/Countdown";

import { FX } from "./FX";
import stats from "stats.js";

export class Game {
    private pathModels = "./models/";
    private pathImageHdr = "images/hdr/";
    private hdrImage = "hdr_1.jpg";
    private hdrImageBlur = "hdr_1_Blur.jpg";
    private groundTile = "images/groundtile.jpg";
    private flareTexture = "./images/flare.png";
    private sicBoFileName = "sicBo.gltf";
    private flareFileName = "flare.gltf";
    private countdownFileName = "countdown.gltf";
    private oddsLabelsFilename = "labels.gltf";

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private fx: FX;

    private lights: Lights;
    private cameras: Cameras;
    private sicbo: SicBo;
    private flares: Flares;
    private countdown: Countdown;
    private ground: Ground;
    private velvetMat: Velvet;

    private gold: Gold;
    private goldBlur: Gold;
    private copper: Copper;
    private glass: Glass;

    private gui: Gui;
    private stats: stats;

    constructor(canvasElement: string) {
        // Stats
        this.stats = new stats();
        this.stats.showPanel(2);
        this.stats.dom.style.position = "absolute";
        this.stats.dom.style.bottom = "0px";
        document.body.appendChild(this.stats.dom);

        // Context
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.clearColor = new BABYLON.Color4(0.3, 0.3, 0.3, 1);
        this._scene.ambientColor = new BABYLON.Color3(0.65, 0.65, 0.65);

        // materials
        this.gold = new Gold(this.pathImageHdr + this.hdrImage, this._scene);
        this.goldBlur = new Gold(this.pathImageHdr + this.hdrImageBlur, this._scene);
        this.copper = new Copper(this.pathImageHdr + this.hdrImage, this._scene);
        this.glass = new Glass(this.pathImageHdr + this.hdrImage, this._scene, false);
    }

    createScene(): void {
        this.gui = new Gui(); //dat.Gui
        // new HelperViewport(100, this._scene); //Helper Axis

        this.lights = new Lights(this._scene); //Lights
        this.cameras = new Cameras(this._scene, this._canvas); // Cameras
        // this.fx = new FX(this._scene, this.cameras.mainCamera); // FX

        // Ground
        this.velvetMat = new Velvet(this.groundTile, this._scene);
        this.ground = new Ground(3300, 3000, this._scene); //Ground
        this.ground.setMaterial(this.velvetMat.material);

        this.sicbo = new SicBo(this.pathModels, this.sicBoFileName, this._scene); // Loaders
        this.sicbo.load(this._scene).then((c: any) => {
            this._scene.stopAllAnimations();
            this.sicbo.meshes = c.meshes;
            this.sicbo.animationGroups = c.animationGroups;
            // Materials assigns
            this.sicbo.setMaterial("goldFrame", this.gold);
            this.sicbo.setMaterial("glass", this.glass);

            this.sicbo.setMaterial("menuPanelGold", this.goldBlur);
            this.sicbo.setMaterial("copperBorder", this.copper);
            this.sicbo.setMaterial("copperCircle", this.copper);
            this.sicbo.setRatioGroupAnimation(1.5, "pushDices");
            this.sicbo.getMesh("pusher").receiveShadows = true;
            console.log("-- LOADED SICBO --");
        });

        this.flares = new Flares(this.pathModels, this.flareFileName, this._scene, this.flareTexture); // Loaders
        this.flares.load(this._scene).then((c: any) => {
            this._scene.stopAllAnimations();
            this.flares.meshes = c.meshes;
            console.log(this.flares.meshes);
            this.flares.animationGroups = c.animationGroups;
            this.flares.setFlare(this.flareTexture, "flare_", this._scene);
            console.log("-- LOADED FLARES --");
        });

        this.countdown = new Countdown(this.pathModels, this.countdownFileName, this._scene); // Loaders
        this.countdown.load(this._scene).then((c: any) => {
            this._scene.stopAllAnimations();
            this.countdown.meshes = c.meshes;
            this.countdown.meshes.forEach(e => {
                e.renderingGroupId = 2;
            });
            this.countdown.animationGroups = c.animationGroups;
            for (let index = 1; index < 4; index++) {
                this.countdown.setMaterial("count_outliner_num_" + index, this.gold);
            }
            this.countdown.setFlare(this.flareTexture, "sparkle_num_", this._scene);
            this.countdown.setFlare(this.flareTexture, "flare_num_", this._scene);
            console.log("-- LOADED COUNTDOWN --");
        });

        this.gui.game = this;
    }

    startGame() {
        // TODO
    }

    public startInGame(n0: number, n1: number, n2: number) {
        this.sicbo.setDicesFacesResult(n0, n1, n2);

        this.countdown.startAnimation("countdown").addOnce(() => {
            this.sicbo.startAnimation("pushDices");
            this.cameras.animateCameraPosAndRot(
                this.cameras.mainCamera,
                new BABYLON.Vector3(0, 1900, 300),
                new BABYLON.Vector3(0, 1200, 650),
                new BABYLON.Vector3(0, 0, 300),
                new BABYLON.Vector3(0, 0, 100),
                this._scene
            );
        });
    }

    public initGame() {
        this.cameras.animateCameraPosAndRot(
            this.cameras.mainCamera,
            new BABYLON.Vector3(0, 1200, 650),
            new BABYLON.Vector3(0, 1900, 300),
            new BABYLON.Vector3(0, 0, 100),
            new BABYLON.Vector3(0, 0, 300),
            this._scene
        );
    }

    doRender(): void {
        this._engine.runRenderLoop(() => {
            this.stats.begin();
            this._scene.render();
            this.stats.end();
        });

        // The canvas/window resize event handler.
        window.addEventListener("resize", () => {
            this._engine.resize();
        });
    }
}
