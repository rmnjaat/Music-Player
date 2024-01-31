// $ by default convention for jquery
// npm music metadeta for getting meta deta of music file

const mn = require('music-metadata');
const $ = require('jquery');


let audiPlayer = $('audio').get(0);
let playing = false;
let timer  = null;


let currentIndex;

let songData = {
    path: [],
    tittle: [],

}


function chooseMusic() {
    $('input').click()
}

function musicSelected() {
    let file = $('input').get(0).files;
    // console.log(file);

    for (let i = 0; i < file.length; i++) {
        let { path } = file[i];
        // console.log(path);

        mn.parseFile(path)
            .then((md) => {

                

                let songRow =
                    ` <tr onclick="playSong(${i})">

                    <td>${md.common.title}</td>
                    <td>${md.common.artist}</td>
                    <td>${secondsToTime(md.format.duration)}</td>

                </tr>

                `
                songData.path[i] = path;
                songData.tittle[i] = md.common.title;
               

                $('#table-body').append(songRow);

            })
    }

}


function playSong(index) {
    currentIndex =index;
    audiPlayer.src = songData.path[index];
    console.log(songData.path[index]);
    
    if (!songData.tittle[index]) {
        // console.log("Unknown");
        $('h4').text("Unknown");
    }
    else {
        $('h4').text(songData.tittle[index]);

    }

  
    audiPlayer.load();
    audiPlayer.play();
    playing = true;
    updateButton();
   
    timer=setInterval(updateTime,1000);

    console.log(audiPlayer.duration);


}


function updateTime(){
    $('#time-left').text(secondsToTime(audiPlayer.currentTime));
    $('#total-time').text(secondsToTime( audiPlayer.duration));
    if(audiPlayer.currentTime >= audiPlayer.duration){
          playNext();
    }
}

function playNext(){
    currentIndex++;
    if(currentIndex>=songData.path.length){
        currentIndex=0;
    }
    playSong(currentIndex); 
    
}

function playPrev(){
    currentIndex--;
    if(currentIndex<0){
        currentIndex=songData.path.length-1;
    }
    playSong(currentIndex); 
}



function clearPlaylist(){
    clearInterval(timer);
    $('#time-left').text('00.00');
    $('#total-time').text('00.00');

    $('#table-body').html('');
    audiPlayer.pause();
    audiPlayer.src='';
    currentIndex=0;
    playing= false;
    $('h4').text('');
    songData={path:[],tittle:[]};

    updateButton();
}

function pause() {
    if (playing) {
        audiPlayer.pause();
        playing = false;
        //when song is [aused we want to clear our sertimeinterval to save resources]
        clearInterval(timer);
    }
    else {
        audiPlayer.play();
        playing = true;
        timer = setImmediate(updateTime,1000);
    }

    updateButton();
}


function secondsToTime(t) {
    return padZero(parseInt((t / (60)) % 60)) + ":" + padZero(parseInt((t) % 60));
}
function padZero(v) {
    return (v < 10) ? "0" + v : v;
}


function updateButton() {
    let playicon = $('#play-button span');
    if (playing) {
        playicon.removeClass('icon-play');
        playicon.addClass('icon-pause');
    }
    else {
        playicon.removeClass('icon-pause');
        playicon.addClass('icon-play');

    }
}


function changeVolume(input){
    //input i ss whol ehtml input{range} tag
    console.log(input.value);
    audiPlayer.volume = input.value;
} 