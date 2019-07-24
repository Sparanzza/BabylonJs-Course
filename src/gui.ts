import dat from "dat.gui";
import { Loader } from "./Loader";

export class Gui {
    public gui: dat.GUI;
    public _sicbo: Loader;

    constructor() {
        let obj = {
            message: "Message",
            dice0: 1,
            dice1: 1,
            push: () => {
                this.Push();
            }
        };

        this.gui = new dat.GUI();
        this.gui.add(obj, "message");
        this.gui.add(obj, "dice0");
        this.gui.add(obj, "dice1");
        this.gui.add(obj, "push");
    }

    Push() {
        console.log(this._sicbo.animationGroups);
        (<any>this._sicbo.animationGroups.find((e: any) => e.name == "pushDices")).play();
    }
}
