export class RMC {
    constructor() {
        this.buttons = {};
    }

    setButton(command) {
        this.buttons[command.name] = command;
    }

    btnWasPressed(btn) {
        return this.buttons[btn].execute();
    }
}