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
            },
            rotate: () => {
                this.Rotate();
            }
        };

        this.gui = new dat.GUI();
        this.gui.add(obj, "message");
        this.gui.add(obj, "dice0");
        this.gui.add(obj, "dice1");
        this.gui.add(obj, "push");
        this.gui.add(obj, "rotate");
    }

    Push() {
        this._sicbo.startAnimation("pushDices");
    }
    Rotate() {
        this._sicbo.startAnimation("selectFace");
        this._sicbo.setKeyframe("selectFace", "rotationQuaternion", "SELECT_FACE_2");
    }
}
