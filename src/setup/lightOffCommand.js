export class lightOffCommand {
    constructor(light) {
        this.name = 'lightOffCommand';
        this.command = light;
    }

    execute() {
        this.command.off();
        return 'bulbOff.png';
    }
}