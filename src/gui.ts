import dat from "dat.gui";

export class Gui {
    public gui: dat.GUI;

    constructor() {
        let obj = {
            message: "Message",
            dice0: 1,
            dice1: 1,
            push: () => {
                this.PushDice();
            }
        };
        window.onload = function() {
            let gui = new dat.GUI();
            gui.add(obj, "message");
            gui.add(obj, "dice0");
            gui.add(obj, "dice1");
            gui.add(obj, "push");
        };
    }

    PushDice() {
        // TODO
        console.log("PushDice");
    }
}
