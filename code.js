var senorita = "";
var shape_of_you = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var scoreLeftWrist = 0;
var song1_status = "";

function preload() {
    senorita = loadSound("Senorita.mp3");
    shape_of_you = loadSound("Shape_of_You.mp3");
}

function setup() {
    var canvas = createCanvas(600, 500);
    canvas.center();
    var video = createCapture(VIDEO);
    video.hide();
    var poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is Initialized!");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    song1_status = senorita.isPlaying();
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        shape_of_you.stop();
        if(senorita.isPlaying() == "false") {
            senorita.play();
            document.getElementById("song_name").innerHTML = "Song Name - " + senorita;
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);
    }
}