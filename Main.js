quick_draw_data_set=["Donkey","Pi","Bat"];
random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);
Element_of_array = quick_draw_data_set[random_no];
document.getElementById("skecth_to_be_drawn").innerHTML=("Skecth to be drawen :-")+Element_of_array;
timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function draw(){
    check_sketch();
    if(drawn_sketch == sketch){
        answer_holder = "set";
        score = score + 2;
        document.getElementById("score").innerHTML = "Score: "+score;
    }
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML = "Timer: "+timer_counter;
    if(timer_counter > 400){
        timer_counter = 0;
        timer_check = "Completed";
    }
    if(timer_check = "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}
function updateCanvas(){
    background("white");
    quick_draw_data_set=["Donkey","Pi","Bat"];
    Random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
    sketch = Element_of_array;
    Element_of_array = quick_draw_data_set[random_no];
    document.getElementById("sketch_to_be_drawn").innerHTML = "Skecth to be drawen"+sketch;
}
function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("yellow");
    canvas.mouseReleased(classifiyCanvas);
    synth = window.speechSynthesis;
}
function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}
function classifiyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('p1').innerHTML = 'Label:' + results[0].label;
    document.getElementById("confidence").innerHTML = 'Confidence:' + Math.round(results[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}