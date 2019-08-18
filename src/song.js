export default class Song {

    constructor(ctx) {
        
        this.ctx1 = ctx;
        this.canvas = document.getElementById("visualizer");
        this.ctx = this.canvas.getContext("2d");

        if (document.getElementById('sunflower-song').checked){
            this.music = document.getElementById('sunflower');
            this.bps = 2.7;
            this.firstBeat = 4;
            this.interval = 0.48;
            // this.beats =
            //     [3.213065, 3.872749, 4.187596, 5.204652, 5.887114, 6.538934, 6.857041, 7.83132, 8.495047, 9.192563, 9.531511, 10.511366, 11.21205, 11.863047, 12.190406, 13.162107, 13.858648, 14.528459, 14.871855, 15.827137, 16.521702, 17.237666, 17.556692, 18.504399, 19.176457, 19.846555, 20.182578, 21.181199, 21.86326, 22.50438, 22.846213, 23.802691, 24.509204, 25.140981, 25.490467, 26.505405, 27.205429, 27.878758, 28.189615, 29.122952, 29.810234, 30.509916, 30.837726, 31.822042, 32.515678, 33.203755, 33.499801, 34.48136, 35.138477, 35.861624, 36.197783, 37.162338, 37.843591, 38.507225, 38.84504, 39.807029, 40.490618, 41.197643, 41.501018, 42.471219, 43.169383, 43.832087, 44.178929, 45.150966, 45.843932, 46.504432, 46.863542, 47.833257, 48.494831, 49.213469, 49.5436, 50.539229, 51.204529, 51.875948, 52.180751, 53.163717, 53.899981, 54.556327, 54.871625, 55.808203, 56.531162, 57.213934, 57.533856, 58.529806, 59.196462, 60.151946, 61.204714, 61.860038, 62.810738, 63.85, 64.478658, 65.480043, 66.535709, 67.160534, 68.159383, 69.215001, 69.90153, 70.527071, 70.876908, 71.868999, 72.51437, 73.204648, 73.535515, 74.52083, 75.206741, 75.872538, 76.221395, 77.219098, 77.879155, 78.566581, 78.908685, 79.8289, 80.528895, 81.154682, 81.527547, 82.542067, 83.218459, 83.901569, 84.209898, 85.171399, 85.901184, 86.552779, 86.903477, 87.865072, 88.533905, 89.193634, 89.544027, 90.481812, 91.222037, 92.186578, 95.897609, 96.498016, 97.162701, 97.507769, 98.555856, 99.216271, 99.832508, 100.185126, 101.189058, 101.846306, 102.545891, 102.879379, 103.882544, 104.550926, 105.205295, 105.522301, 106.546095, 107.207112, 107.86688, 108.212636, 109.195663, 109.864431, 110.523722, 110.867807, 111.83902, 123.192882, 123.858931, 124.196055, 125.198947, 125.862995, 126.530771, 126.88162, 127.838581, 128.531995, 129.194814, 129.554865, 130.523532, 131.207737, 131.832705, 132.187441, 133.210455, 133.829802, 134.488314, 134.83457, 135.755137, 136.560037, 137.227001, 137.590749, 138.490381, 139.179974, 139.854018, 140.200925, 141.215266, 141.832674, 142.502263, 142.856791, 143.872584]
        } else if (document.getElementById('faded-song').checked){
            this.music = document.getElementById('faded');
            this.bps = 1.4;
            this.firstBeat = 3;
            this.interval = 1;
            // this.beats =
            //     [11.388368, 14.049613, 16.683368, 19.358908, 22.064994, 24.720243, 27.350127, 29.945018, 32.694734, 33.40836, 34.013865, 34.66984, 35.31849, 36.022038, 36.653425, 37.311712, 38.01863, 38.675487, 39.363677, 40.020984, 40.668035, 41.352631, 42.020131, 42.658589, 43.360694, 44.022849, 44.689301, 45.317273, 45.99774, 46.623005, 47.312719, 47.950685, 48.625551, 49.261277, 49.955911, 50.634884, 51.287736, 51.986311, 52.647582, 55.311576, 56.657898, 58.00672, 59.378954, 60.638797, 62.01119, 63.312211, 64.599003, 66.004886, 67.323165, 68.68774, 70.008061, 71.321342, 72.710849, 74.023271, 75.343502, 76.640439, 77.960587, 79.300722, 80.635904, 81.992872, 83.37773, 84.712863, 86.001693, 87.321577, 88.650045, 90.069076, 91.313109, 92.656493, 94.000714, 95.334265, 96.616381, 97.968418, 100.675827, 101.94455, 103.332619, 104.580195, 105.988154, 107.261311, 108.648588, 109.949838, 111.324599, 112.604383, 114.037369, 115.312496, 116.649051, 117.964443, 119.333831, 119.983699, 120.668966, 121.320452, 121.984837, 122.629402, 123.305157, 123.993965, 124.649557, 125.30357, 125.987154, 126.607746, 127.282303, 127.952018, 128.670214, 129.335761, 129.931355, 130.60379, 131.262965, 131.887481, 132.594092, 133.251856, 133.95456, 134.648085, 135.337879, 135.989469, 136.640522, 137.293008, 138.013262, 138.66614, 139.279891, 139.978048, 140.667213, 141.384665, 142.039539, 142.708154, 143.389804, 144.025079, 144.728909, 145.405369, 146.028551, 146.695338, 147.348109, 148.03458, 148.743956, 149.401067, 150.059518, 150.760677, 152.696693, 154.045479, 155.336029, 156.585484, 157.974092, 159.312223, 160.635573, 161.995252, 163.331265, 164.5936, 165.975844, 167.291154, 168.63536, 169.930653, 171.273932, 172.634429, 173.970815, 175.281743, 176.671651, 177.937901, 179.262958, 180.614983, 182.020597, 183.333109, 184.659804, 185.951068, 187.3414, 188.628768, 189.951942, 191.320275, 192.65, 194.032484, 195.269008, 196.679695, 197.968322, 199.322395, 200.624373, 202.000956, 203.639426]
        } else {
            this.music = document.getElementById('dolphin');
            this.bps = 1.1;
            this.firstBeat = 3;
            this.interval = 1.3;
        }

        this.needaDuck = false;

        this.alert = new Image();
        this.alert.src = "img/spacebar.png";

        const volSlider = document.getElementById("volSlider");
        volSlider.addEventListener('input', function () {
            document.querySelectorAll("audio").forEach( song => {
                song.volume = volSlider.value
            });
        }); 

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.topY = 0;
        this.bottomY = this.height;
        this.op = 0;
    }

    visualize() {
        
        let x = (Math.round(this.music.currentTime * 10) / 10) % this.bps;

        //round the rounded result again for +/- 0.01, just rounding once would leave out other close beats
        if (this.music.currentTime !== 0 && (x === 0 || (Math.round(x * 10) / 10) % this.bps === 0)) {
            //offset first beat
            if (this.music.currentTime > this.firstBeat) {
                this.ctx1.drawImage(this.alert, 0, 0, 150, 56, 180, 0, 150, 56);
                this.needaDuck = true;
            }
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.topY = 0;
            this.bottomY = this.height;
            this.op = 0;
        } else {
            this.needaDuck = false;

            //let alert image come up 0.1s before actual beat
            if (x === this.bps-0.1 || (Math.round(x * 10) / 10) % this.bps === this.bps-0.1) {
                if (this.music.currentTime > this.firstBeat) {
                    this.ctx1.drawImage(this.alert, 0, 0, 150, 56, 180, 0, 150, 56);
                }
            }
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.fillStyle = `rgba(200, 166, 234, ${this.op})`;
            this.ctx.fillRect(0, this.topY, this.width, 10);
            this.ctx.fillStyle = `rgba(104, 157, 255, ${this.op})`;
            this.ctx.fillRect(0, this.bottomY, this.width, 10);
            this.topY += this.interval;
            this.bottomY -= this.interval;
            this.op += 0.007;
        }
    }

    play(){
        this.music.play();
    }

    currentTime(){
        return this.music.currentTime;
    }

    pause(){
        this.music.pause();
    }
}

