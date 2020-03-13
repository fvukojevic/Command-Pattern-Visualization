<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <div class="col-sm-3 col-md-3">
                    <div class="card">
                        <div class="card-header">
                            <div class="dot" :class="{changeColor: used}"></div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12 col-sm-12" style="margin-bottom: 2em;" v-for="button in rmc.buttons"
                                     v-bind:key="button.id">
                                    <button class="btn btn-outline-success" @mousedown="execute(button)"
                                            @mouseup="used = false"> {{ button.name }}
                                    </button>
                                </div>
                            </div>
                            <footer>
                                <button class="btn btn-outline-warning" @mousedown="volumeUp" @mouseup="timeoutClear">
                                    <b>+</b>
                                </button>
                                <button class="btn btn-outline-danger" @mousedown="reset" @mouseup="used = false">
                                    Reset
                                </button>
                                <button class="btn btn-outline-warning" @mousedown="volumeDown" @mouseup="timeoutClear">
                                    <b>-</b>
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8 col-md-6 offset-md-2">
                    <hr>
                    <img :src="'/assets/' + bulbImg" style="position:relative; top:-1em "/>
                    <br><br><br>
                </div>
                <div class="col-sm-8 col-md-6 offset-md-6 offset-xs-2">
                    <div class="radio">
                        <div class="wifi-symbol sound_class_left" v-if="radioAnimations">
                            <div class="wifi-circle first"></div>
                            <div class="wifi-circle second"></div>
                            <div class="wifi-circle third"></div>
                            <div class="wifi-circle fourth"></div>
                        </div>
                        <div class="wifi-symbol sound_class_right" v-if="radioAnimations">
                            <div class="wifi-circle first"></div>
                            <div class="wifi-circle second"></div>
                            <div class="wifi-circle third"></div>
                            <div class="wifi-circle fourth"></div>
                        </div>
                        <div class="volume" :class="{'volume-up-animation': volumeUpAnimation, 'volume-down-animation' : volumeDownAnimation}">
                            <span style="color:black;">__</span>
                        </div>
                        <div class="label_container">
                            <small class="radio_status_placeholder" style="font-family: digital-clock-font" v-if="radioStatus === 'On'">
                                Volume: {{ radioVolume }}
                            </small>
                            <small class="radio_status_placeholder" style="font-family: digital-clock-font" v-else>
                                Radio Off
                            </small>
                            <p class="radio_status">
                                <small id="radio_status" style="font-family: digital-clock-font"><b> {{ radioStatus }} </b></small>
                            </p>
                        </div>
                    </div>
                </div>
                <hr class="floor_class">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'App',
        data() {
            return {
                bulbImg: 'bulbOff.png',
                radioStatus: 'Off',
                radioAnimations: false,
                radioVolume: 0,
                used: false,
                timer: null,
                volumeUpAnimation: false,
                volumeDownAnimation: false,
            }
        },
        computed: {
            ...mapGetters({
                rmc: 'getRmc',
            })
        },
        methods: {
            execute(button) {
                this.used = true;
                if (button.name.startsWith('light')) {
                    this.bulbImg = this.rmc.btnWasPressed(button.name);
                } else {
                    let response = this.rmc.btnWasPressed(button.name);
                    this.radioStatus = response.radioStatus;
                    this.radioAnimations = response.radioAnimations;
                    this.radioVolume = response.radioVolume;
                    console.log(response);
                }
            },
            reset() {
                this.bulbImg = 'bulbOff.png';
                this.radioStatus = 'Off';
                this.radioAnimations = false;
                this.radioVolume = 0;
                this.used = false;
            },
            volumeUp() {
                this.radioVolume++;
                this.volumeUpAnimation = true;
                const self = this;
                this.timer = setTimeout(function() {
                    self.volumeUp();
                }, 200);
            },
            volumeDown() {
                this.radioVolume--;
                this.volumeDownAnimation = true;
                if(this.radioVolume === -1) this.radioVolume = 0;
                const self = this;
                this.timer = setTimeout(function() {
                    self.volumeDown();
                }, 200);
            },
            timeoutClear() {
                this.volumeUpAnimation = false;
                this.volumeDownAnimation = false;
                clearTimeout(this.timer)
            }
        },
        created() {
            this.$store.dispatch('initRmc');
        }
    }
</script>

<style scoped lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .dot {
        height: 25px;
        width: 25px;
        background-color: grey;
        border-radius: 50%;
        display: inline-block;
    }

    .changeColor {
        background-color: #c60000;
    }

    .radio {
        height:75px;
        width:300px;
        left:20px;
        background-color:#454545;
        position:relative;
    }

    .volume {
        height:30px;
        width:30px;
        background-color:lightblue;
        position:absolute;
        top:27px;
        left:50px;
        border-radius:50%;
    }

    .volume-up-animation {
        -webkit-animation:spin 4s linear infinite;
        -moz-animation:spin 4s linear infinite;
        animation:spin 4s linear infinite;
    }

    .volume-down-animation {
        -webkit-animation:spin-opposite 4s linear infinite;
        -moz-animation:spin-opposite 4s linear infinite;
        animation:spin-opposite 4s linear infinite;
    }

    span {
        position:absolute;
        top:-5px;
        left:2px;
        transform: rotate(20deg);
        color:white;
    }

    .label_container {
        position:absolute;
        right:100px;
        top:10px;
    }

    .radio_status_placeholder {
        color:white;
    }

    .radio_status {
        background-color:white;
        height:22px;
        width:75px;
        text-align:center;
    }

    .floor_class {
        position:relative;
        bottom:15px;
        width:100%;
    }

    .wifi-symbol{
        display:none;

        $circleColor: #454545;
        $size: 50px;

        [foo], & {
            display:block;
            position:absolute;
            top: 50%;
            display:inline-block;
            width:$size;
            height:$size;
            margin-top: 0 - $size - $size*0.25;

            -ms-transform:rotate(-45deg) translate(-100px);
            -moz-transform:rotate(-45deg) translate(-100px);
            -o-transform:rotate(-45deg) translate(-100px);
            -webkit-transform:rotate(-45deg) translate(-100px);
            transform:rotate(-45deg) translate(-100px);
        }
        .wifi-circle {
            box-sizing:border-box;
            -moz-box-sizing:border-box;
            display:block;
            width:100%;
            height:100%;
            font-size:$size/7;
            position:absolute;
            bottom:0;
            left:0;
            border-color: $circleColor;
            border-style:solid;
            border-width:1em 1em 0 0 ;
            -webkit-border-radius:0 100% 0 0;
            border-radius:0 100% 0 0;

            opacity:0;
            -o-animation:wifianimation 3s infinite;
            -moz-animation:wifianimation 3s infinite;
            -webkit-animation:wifianimation 3s infinite;
            animation:wifianimation 3s infinite;

            &.first {
                -o-animation-delay:800ms;
                -moz-animation-delay:800ms;
                -webkit-animation-delay:800ms;
                animation-delay:800ms;
            }
            &.second {
                width:5em;
                height:5em;
                -o-animation-delay:400ms;
                -moz-animation-delay:400ms;
                -webkit-animation-delay:400ms;
                animation-delay:400ms;
            }
            &.third {
                width: 3em;
                height: 3em;
            }
            &.fourth {
                width: 1em;
                height: 1em;
                opacity: 1;
                background-color: $circleColor;
                -o-animation:none;
                -moz-animation:none;
                -webkit-animation:none;
                animation:none;
            }
        }
    }


    @-o-keyframes wifianimation
    {
        0% { opacity: 0.4 }
        5% { opactiy: 1 }
        6% { opactiy: 0.1 }
        100% { opactiy: 0.1; }
    }
    @-moz-keyframes wifianimation
    {
        0% { opacity: 0.4 }
        5% { opactiy: 1 }
        6% { opactiy: 0.1 }
        100% { opactiy: 0.1; }
    }
    @-webkit-keyframes wifianimation
    {
        0% { opacity: 0.4 }
        5% { opactiy: 1 }
        6% { opactiy: 0.1 }
        100% { opactiy: 0.1; }
    }

    .sound_class_left {
        position:absolute;
        top:20px;
        right:290px;
        transform:rotate(-90deg);
    }

    .sound_class_right {
        position:absolute;
        top:20px;
        left:290px;
        transform:rotate(0deg);
    }

    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

    @-moz-keyframes spin-opposite { 100% { -moz-transform: rotate(-360deg); } }
    @-webkit-keyframes spin-opposite { 100% { -webkit-transform: rotate(-360deg); } }
    @keyframes spin-opposite { 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); } }
</style>
