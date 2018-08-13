function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        return a;
    }


function makeBlankTable(lesson){
//    table to move responses (still needs header)
    var headerContents = Object.keys(lesson);
    document.title = lessonname;
    var tableObject = document.createElement('table');
    var headerRow = tableObject.insertRow(0);
    for (item in headerContents){
        var cell = headerRow.insertCell(item);
        headerRow.setAttribute("id","header");
        cell.innerHTML = headerContents[item];
        cell.setAttribute("name", item.toString() + "," + "0");
    }
//    get longest columns
    var columnLengths = [];
    for (columnIndex in headerContents){
        columnLengths.push(lesson[headerContents[columnIndex]].length);
        console.log(lesson[headerContents[columnIndex]]);
    }
    var maxLength = Math.max.apply(null,columnLengths);
    console.log(columnLengths);
    console.log(maxLength);
//    create destination rows
    //    give names with , split for category (column, row)

    for (var i=1; i < maxLength + 1; i++){
        var row = tableObject.insertRow(i);
        for (columnIndex in headerContents){
            var cell = row.insertCell(columnIndex);
            cell.setAttribute("name", columnIndex.toString() + "," + i.toString());
            cell.setAttribute("class", "destination");
            cell.setAttribute("id", "droppable");
        }
    }
    document.getElementById("tableContainer").appendChild(tableObject);
    makeChoiceTable(lesson);

}
function tapHandler(event){
    var audioId = event.target.id + "_audio";
    console.log(event.target.id);
    //alert(audioId);
    txtObj = document.getElementById(event.target.id);
    audioObj = document.getElementById(audioId);
    audioObj.addEventListener("ended", function(){
      txtObj.style.backgroundColor = "transparent";
    });
    txtObj.style.backgroundColor = "yellow";
    document.getElementById(audioId).play();
}


function makeChoiceTable(lesson){
//    table to take answers from
    var sourcesTable = document.createElement('div');
    sourcesTable.setAttribute("id","sourcetable");
    var headerContents = Object.keys(lesson);
    var mixedWords = [];
    for (category in headerContents){
        for (item in lesson[headerContents[category]]){
            var word = lesson[headerContents[category]][item];
            var newDiv = document.createElement('div');
            newDiv.setAttribute("name", category.toString() + "," + item.toString());
            newDiv.innerHTML = word;
            newDiv.setAttribute("id",word);
            newDiv.setAttribute("class", "source");
            newDiv.style.padding = "20px";
            var newAudio = document.createElement('audio');
            newAudio.setAttribute("name", category.toString() + "," + item.toString());
            newAudio.setAttribute("id", word + "_audio");
            newAudio.setAttribute("src", "../sounds/" + word + ".mp3");
            newDiv.appendChild(newAudio);
            console.log(newAudio);
            mixedWords.push(newDiv);
        }
    }

    //    needs to randomize placements
    mixedWords = shuffle(mixedWords);
	words_remaining = mixedWords.length;


  var slidetoggleinteraction = document.getElementById("toggleinteraction");
  slidetoggleinteraction.addEventListener("click",function(){
    if (slidetoggleinteraction.checked == false){
      $( ".source" ).draggable("enable");
    }
    else {
      $(".source").on("click", tapHandler );
      $(".source").draggable("disable");
    }
  });
    for (index in mixedWords){
        sourcesTable.appendChild(mixedWords[index]);
    }

//    give names with , split for category (correctcolumn, startingrow)
        document.getElementById("tableContainer").appendChild(sourcesTable);

}

//This divided two scripts

        $(document).ready(function(){
        $(function() {
		      var score = 0;
			    var words_remaining = 0;
          makeBlankTable(lesson);
			    $(".source").on("dragstart", tapHandler );
          $( ".source" ).draggable({ revert: "invalid", scroll: false});
          $( ".destination" ).droppable({
            drop: function( event, ui ) {
              var dragged_category = ui.draggable.attr("name").split(",")[0];
              var dropped_category = $(this).attr("name").split(",")[0];
              if (dragged_category == dropped_category){
                  ui.draggable.draggable("disable");
                  $(this).css({"background-color":"#70db70"});
                  $(this).html(ui.draggable.html());
                  ui.draggable.hide();
				  //$(this).toggleClass("source");
                  score += 1;
				  $(this).droppable({disabled: true});
                  words_remaining -= 1;
                  moves += 1;
                  $("#status").text("Current score: " + score + " Words remaining: " + words_remaining);
                  if (words_remaining == 0){
                     document.getElementById("menu_link").innerHTML = "Finished!<br>Current score: " + score + " Words remaining: " + words_remaining + "<br>Moves: " + moves
                  }
	          }
	          else{
	              ui.draggable.css({"color":"red"});
	              moves += 1;

	          }

            }
          });
        });
        $("#menu").click(function(){
            window.location.href="drag_n_drop2.html";
        })
        });

            var score = 0;
            var moves = 0;
