img="";
status="";
objects=[];

function preload() {
  img=loadImage('dog_cat.jpg');
}

function setup() {
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(380,380);
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects"
}



function modelLoaded () {
  console.log("Model Loaded!");
  
  status=true;
  
}

function gotResults(error,results) {
  if(error) {
    console.error(error);
  }
   console.log(results);
   objects=results;
   console.log(objects.length);
}


function draw() {
  image(video,0,0,380,380);
  if(status!="") {
    objectDetector.detect(video,gotResults);
    r=random(255);
    g=random(255);
    b=random(255);
        document.getElementById("status").innerHTML="Status: Objects are Detected";
        
      console.log(objects.length);
      document.getElementById("number_of_objects").innerHTML="Number of Objects:"+objects.length;
    for(i=0;i<objects.length;i++) {
      console.log(i);
      fill(r,g,b);
      percentage=floor(objects[i].confidence*100);
      console.log(percentage);
      text(objects[i].label+" "+percentage+"%",objects[i].x+5,objects[i].y+151);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    } 
  }
}