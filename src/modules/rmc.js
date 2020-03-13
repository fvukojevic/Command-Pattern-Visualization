import { RMC } from "../setup/RMC";
import { lightOffCommand } from "../setup/lightOffCommand";
import { lightOnCommand } from "../setup/lightOnCommand";
import { stereoOffCommand } from "../setup/stereoOffCommand";
import { stereoOnCommand } from "../setup/stereoOnCommand";
import { light } from "../setup/light";
import { stereo } from "../setup/stereo";

const state = {
    rmc: null,
};

const getters = {
    getRmc : state => {
        return state.rmc;
    }
};

const mutations = {
    setRmc: (state, rmc) => {
        state.rmc = rmc
    }
};

const actions = {
    initRmc: ({commit}) => {
        let Stereo = new stereo();
        let Light = new light();

        let LightOnCommand = new lightOnCommand(Light);
        let LightOffCommand = new lightOffCommand(Light);
        let StereoOnCommand = new stereoOnCommand(Stereo);
        let StereoOffCommand = new stereoOffCommand(Stereo);
        let rmc = new RMC();

        rmc.setButton(LightOnCommand);
        rmc.setButton(LightOffCommand);
        rmc.setButton(StereoOnCommand);
        rmc.setButton(StereoOffCommand);
        commit('setRmc', rmc)
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}
