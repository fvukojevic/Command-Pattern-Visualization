export class lightOnCommand {
    constructor(light) {
        this.name = 'lightOnCommand';
        this.command = light;
    }

    execute() {
        this.command.on();
        return 'bulbOn.png';
    }
}