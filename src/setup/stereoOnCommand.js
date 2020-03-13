export class stereoOnCommand {
    constructor(stereo) {
        this.name = 'stereoOnCommand';
        this.command = stereo;
    }

    execute() {
        this.command.on();
        this.command.setCD();
        this.command.setRadio();
        this.command.setVolume(10);
        return {
            radioStatus: 'On',
            radioAnimations: true,
            radioVolume: 10
        }
    }
}