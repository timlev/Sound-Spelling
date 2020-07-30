var lesson = {"images/cat.jpg" : ["c.mp3","a.mp3","t.mp3"], "images/bat.jpg" : ["b.mp3","a.mp3","t.mp3"]};
var index = 0;
var lettersremaining = 0;
function play(id){
  var text = document.getElementById(id);
  var sound = document.getElementById("audio_" + id);
  sound.play();
}

function loadpic(index){
  var item = Object.keys(lesson)[index];
  var pic = document.getElementById("pic");
  // console.log(pic);
  pic.src = item;
}

function createanswerboxes(index){
  var item = Object.keys(lesson)[index];
  for (letter in lesson[item]){
	lettersremaining += 1;
    console.log(lesson[item][letter]);
    var box = document.createElement("td");
    box.id = lesson[item][letter];
    box.classList.add("destination");
    box.addEventListener("click", function(){play(this.id.replace(".mp3",""))}, false);
    document.getElementById("answerrow").appendChild(box);
    console.log(document.getElementById("answerrow"));

  }
}

function playword(index){
  var item = Object.keys(lesson)[index];
  var wordsound = item.replace("images/","wordsounds/").replace(".jpg",".mp3").replace(".gif",".mp3").replace(".png",".mp3");
  document.getElementById("wordsound").src = wordsound;
  document.getElementById("wordsound").autoplay = true;
  document.getElementById("wordsound").load();
  // play("wordsound");
}

function loadanswer(index){
  var item = Object.keys(lesson)[index];
  var word = item.replace("images/","").replace(".jpg","").replace(".gif","").replace(".png","");
  console.log(word);
  createanswerboxes(index);
  playword(index);
}

function onload(){
  redraw_lesson();
}

function redraw_lesson(){
	document.getElementById("answerrow").innerHTML = '';
    loadpic(index);
	loadanswer(index);
	var choiceboxtemplate = '<div id="a" onclick="play(this.id)" class="vowel source">a<audio id="audio_a" src="sounds/a.mp3" preload></audio></div><div id="b" onclick="play(this.id)" class="consonant source">b<audio id="audio_b" src="sounds/b.mp3" preload></audio></div><div id="c" onclick="play(this.id)" class="consonant source">c<audio id="audio_c" src="sounds/c.mp3" preload></audio></div><div id="d" onclick="play(this.id)" class="consonant source">d<audio id="audio_d" src="sounds/d.mp3" preload></audio></div><div id="e" onclick="play(this.id)" class="vowel source">e<audio id="audio_e" src="sounds/e.mp3" preload></audio></div><div id="f" onclick="play(this.id)" class="consonant source">f<audio id="audio_f" src="sounds/f.mp3" preload></audio></div><div id="g" onclick="play(this.id)" class="consonant source">g<audio id="audio_g" src="sounds/g.mp3" preload></audio></div><div id="h" onclick="play(this.id)" class="consonant source">h<audio id="audio_h" src="sounds/h.mp3" preload></audio></div><div id="i" onclick="play(this.id)" class="vowel source">i<audio id="audio_i" src="sounds/i.mp3" preload></audio></div><div id="j" onclick="play(this.id)" class="consonant source">j<audio id="audio_j" src="sounds/j.mp3" preload></audio></div><div id="k" onclick="play(this.id)" class="consonant source">k<audio id="audio_k" src="sounds/k.mp3" preload></audio></div><div id="l" onclick="play(this.id)" class="consonant source">l<audio id="audio_l" src="sounds/l.mp3" preload></audio></div><div id="m" onclick="play(this.id)" class="consonant source">m<audio id="audio_m" src="sounds/m.mp3" preload></audio></div><div id="n" onclick="play(this.id)" class="consonant source">n<audio id="audio_n" src="sounds/n.mp3" preload></audio></div><div id="o" onclick="play(this.id)" class="vowel source">o<audio id="audio_o" src="sounds/o.mp3" preload></audio></div><div id="p" onclick="play(this.id)" class="consonant source">p<audio id="audio_p" src="sounds/p.mp3" preload></audio></div><div id="q" onclick="play(this.id)" class="consonant source">q<audio id="audio_q" src="sounds/q.mp3" preload></audio></div><div id="r" onclick="play(this.id)" class="consonant source">r<audio id="audio_r" src="sounds/r.mp3" preload></audio></div><div id="s" onclick="play(this.id)" class="consonant source">s<audio id="audio_s" src="sounds/s.mp3" preload></audio></div><div id="t" onclick="play(this.id)" class="consonant source">t<audio id="audio_t" src="sounds/t.mp3" preload></audio></div><div id="u" onclick="play(this.id)" class="vowel source">u<audio id="audio_u" src="sounds/u.mp3" preload></audio></div><div id="v" onclick="play(this.id)" class="consonant source">v<audio id="audio_v" src="sounds/v.mp3" preload></audio></div><div id="w" onclick="play(this.id)" class="consonant source">w<audio id="audio_w" src="sounds/w.mp3" preload></audio></div><div id="x" onclick="play(this.id)" class="consonant source">x<audio id="audio_x" src="sounds/x.mp3" preload></audio></div><div id="y" onclick="play(this.id)" class="consonant source">y<audio id="audio_y" src="sounds/y.mp3" preload></audio></div><div id="z" onclick="play(this.id)" class="consonant source">z<audio id="audio_z" src="sounds/z.mp3" preload></audio></div>';
	document.getElementById("choicesdiv").innerHTML = choiceboxtemplate;
}

function winning(){
	document.getElementById("wordsound").src = "sounds/winningsound.mp3";
	document.getElementById("wordsound").play();
}

function setup_draggable(){
  var score = 0;
  var words_remaining = 0;
  $( ".source" ).draggable({ revert: "invalid",zIndex: 20, scroll: false, helper: function(){
    $(this.parentElement).append($(this).clone().attr('id', 'itWorks'))
    return $("#itWorks");
  }});
  $( ".destination" ).droppable({
    drop: function( event, ui ) {
      var dragged_category = ui.draggable.attr("id");
      var dropped_category = $(this).attr("id").replace(".mp3","");
      console.log(dragged_category);
      console.log(dropped_category);
      if (dragged_category == dropped_category){
          ui.draggable.draggable("disable");
          $(this).css({"background-color":"#70db70"});
          $(this).html(ui.draggable.html());
          ui.draggable.hide();
          score += 1;
          $(this).droppable({disabled: true});
          lettersremaining -= 1;
          console.log(lettersremaining);
          moves += 1;
          $("#status").text("Current score: " + score + " Words remaining: " + words_remaining);
          //Word is complete
          if (lettersremaining == 0){
			 winning();
			 console.log("Finished!");
			 index += 1;
			 setTimeout(function(){redraw_lesson();setup_draggable();}, 2000);
          }
    }
    else{
        ui.draggable.draggable( "option", "revert", true );
        moves += 1;

    }
    }
  })
};

$(document).ready(function(){
    onload();
	setup_draggable();
})
    var score = 0;
    var moves = 0;