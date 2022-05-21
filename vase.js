img = "" ;
objects = [] ;
status1 = "";

function preload()
{
    img = loadImage("vase.webp");
}

function setup()
{
    canvas = createCanvas(500,350);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded");
    status1 = true;
    objectDetector.detect(img,gotresults);
}

function gotresults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

function back()
{
    window.location = "index.html";
}

function draw()
{
    image(img,0,0,500,350) ;

    if(status1 != "")
    {
  
      objectDetector.detect(img,gotresults);
  
      for(i = 0;i < objects.length;i++)
      {
        document.getElementById("status").innerHTML = "Status = Object Detected";
        document.getElementById("number").innerHTML = "Number of Objects Detected - "+objects.length;
        
        fill("#ff383f");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label+" "+percent+"%",objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke("#ff383f");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      }
      
    }
}