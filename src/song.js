export default class Song {

    constructor(src, ctx, retry) {
        this.music = new Audio();
        this.music.src = src;
        this.ctx = ctx;

        this.alert = new Image();
        this.alert.src = "img/spacebar.png";

        this.beats = [1.22672, 1.527722, 2.501502, 3.176734, 3.887559, 4.20795, 5.192413, 5.836397, 6.519782, 6.853072, 7.841342, 8.190902, 9.217472, 10.51407, 10.846211, 11.888745, 13.178915, 13.8811, 14.549633, 14.87647, 15.87867, 16.51019, 17.504571, 18.551692, 19.195345, 20.193361, 21.202456, 21.790121, 22.57955, 22.879475, 23.835124, 25.211204, 25.527084, 26.522532, 27.895835, 28.191122, 29.156978, 29.865386, 30.140762, 30.499908, 31.903639, 32.540023, 33.147646, 33.500525, 34.494649, 35.203443, 35.529571, 35.873726, 37.201191, 37.881193, 38.555789, 38.875287, 39.857741, 40.511276, 41.180406, 41.497179, 42.521054, 43.170799, 43.853628, 44.179862, 45.222432, 45.835863, 46.527207, 46.847779, 47.857952, 48.524699, 49.528827, 50.59454, 51.2103, 52.158182, 53.185294, 53.852314, 54.890791, 55.844176, 56.520486, 57.521662, 58.559546, 59.231268, 61.590898, 61.901095, 63.923178, 64.532754, 66.446213, 67.155965, 69.228279, 69.891548, 70.856916, 71.861055, 72.48184, 73.183356, 73.521195, 74.545246, 75.143969, 75.880138, 76.222428, 77.21688, 77.819836, 78.518718, 78.84976, 79.859976, 80.519381, 81.183932, 81.542642, 82.4966, 83.175413, 83.827206, 84.160055, 85.184333, 85.870341, 86.519423, 86.839311, 87.885334, 88.528219, 89.180377, 89.524934, 90.486528, 91.215722, 92.209077, 93.853703, 95.180681, 95.895594, 96.553805, 97.512561, 98.520706, 99.238562, 101.180349, 101.841447, 102.566323, 103.885408, 104.548485, 105.23375, 106.535282, 107.189643, 107.856507, 109.166843, 109.884893, 110.563192, 111.834851, 113.214709, 114.524809, 115.81649, 117.144216, 118.529581, 119.821481, 121.208094, 122.46703, 123.237998, 123.854236, 124.189978, 125.205481, 125.889218, 126.557486, 126.874082, 127.843715, 128.545944, 129.530784, 130.539702, 131.23772, 131.867477, 132.187926, 133.197316, 133.84365, 134.528929, 134.850367, 135.841274, 136.524011, 137.218327, 137.541129, 138.514054, 139.925736, 140.247134, 141.886843, 142.875723, 143.882989, 144.478024, 145.566787, 148.215862, 149.216683, 149.874217, 151.852351, 152.534274, 153.562413];
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

    onBeat(){
        let needaDuck = false;
        let time = this.currentTime();

        for(let i = 0; i <= this.beats.length; i++){
            if (time >= this.beats[i] - 0.15 && time <= this.beats[i] + 0.05) {
                this.ctx.drawImage(this.alert, 0, 0, 150, 56, 180, 0, 150, 56);
            }
            if (time >= this.beats[i] - 0.05 && time <= this.beats[i] + 0.05) {
                needaDuck = true;
                break;
            } 
        }

        return needaDuck;
    }
}

