export class stereoOffCommand {
    constructor(stereo) {
        this.name = 'stereoOffCommand';
        this.command = stereo;
    }

    execute() {
        this.command.off();
        return {
            radioStatus: 'Off',
            radioAnimations: false,
            radioVolume: 0
        }
    }
}