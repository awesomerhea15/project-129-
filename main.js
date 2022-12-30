harrypotter_song ="";
peterpan_song ="";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreleftWrist = 0;
song_name = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload(){
    harrypotter_song = loadSound("music.mp3");
    peterpan_song = loadSound("music2.mp3");
    
}

function draw(){
    image(video,0,0,600,530);

    fill("#FF0000");
    stroke("#FF0000");

    song_name = peterpan_song.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        harrypotter_song.stop();
        if(song_name == false){
            peterpan_song.play();
        }
        else{
            console.log("song name: peter pan song");
            document.getElementById("song_id").innerHTML = "song name: peter pan song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}