import dat from "dat.gui";
import { SicBo } from "./Models/SicBo";
import { Game } from "./Game";

export class Gui {
    public gui: dat.GUI;
    // public _sicbo: SicBo;
    public game: Game;
    public obj: any;

    constructor() {
        this.obj = {
            message: "Message",
            dice0: 1,
            dice1: 1,
            dice2: 1,
            push: () => {
                this.Push();
            }
        };

        this.gui = new dat.GUI();
        this.gui.add(this.obj, "message");
        this.gui.add(this.obj, "dice0");
        this.gui.add(this.obj, "dice1");
        this.gui.add(this.obj, "dice2");
        this.gui.add(this.obj, "push");
    }

    Push() {
        let nums = (<any>this.gui.__controllers[0]).object;
        // this._sicbo.setDicesFacesResult(nums.dice0, nums.dice1);
        // this._sicbo.startAnimation("pushDices");
        console.log(nums);
        this.game.playNewGame(nums.dice0, nums.dice1, nums.dice2);
    }
}
