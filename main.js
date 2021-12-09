video = "";
status1 = "";
objects = []

function preload(){
    video = createVideo('video.mp4')
    video.hide()

}

function setup(){
    canvas = createCanvas(480,380)
    canvas.center()
}

function draw(){
    image(video, 0,0, 480,380)
    if(status1 != "") {
        object_detector.detect(video, got_results)
        for(var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : objects detected"
            document.getElementById("numberofobjects").innerHTML = "number of objects detected : " + objects.length;
            fill("red")
            percent = floor(objects[i].confidence*100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height) 
        }
    }

}

function start(){
    object_detector = ml5.objectDetector('cocossd', modelloaded)
}

function modelloaded() {
    console.log("cocossd model has been loaded sucesfully");
    status1 = true 
    video.loop()
    video.speed(1)
    video.volume(0)
}

function got_results(error, results) {
    if (error) 
    {
        console.log(error)
    }
    else {
        console.log(results)
        objects = results
    }
}