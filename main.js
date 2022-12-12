img="";
status="";
objetos=[];
function preload()      
{
song = loadSound("https://www.zedge.net/ringtone/0de7dfd5-e4e6-4d90-a86b-c9f8512d26a7");
}

function setup()
{
canvas=createCanvas(380, 380);
canvas.center();
 video=createCapture(VIDEO);
 video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detectando Objetos";
}
function modelLoaded() {
    console.log("o modelo foi carregado");
    status=true;
    
}

function gotResult(error, results) {
if (error) {
    console.error(error);
}
else{
    console.log(results);
    objetos=results;
}
}

function draw()
{
    image(video, 0, 0, 380, 380);
 if (status!="") {
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video.gotResults);
for (i = 0; i < objetos.length; i++) {
    document.getElementById("status").innerHTML="detectando objetos";
    document.getElementById("numeroDeObjetos").innerHTML="Quantidade de objetos detectados"+objetos.length;
    fill(r,g,b);
    percent=floor(objetos[i].confidence*100);
    text(objetos[i].label+" "+percent+"%", objetos[i].x+15,objetos[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos.height);
if (objetos[i].label=="person"){
    document.getElementById("numeroDeObjetos").innerHTML="O Bebê foi encontrado";
    song.stop();
}
else {
    document.getElementById("numeroDeObjetos").innerHTML="O Bebê NÃO foi encontrado";
    song.play();
}
}
 }
}