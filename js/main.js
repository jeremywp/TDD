let courseList;
let numholes = 18;
let globaltee;

(function() {
    onDocumentLoad();
})();

function onDocumentLoad() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            courseList = JSON.parse(this.responseText);
            console.log(courseList);

            for (let i = 0; i < courseList.courses.length; i++){
                $("#courseSelect").append(`<option value="`+ courseList.courses[i].id +`">` + courseList.courses[i].name + `</option>`)
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}


function loadCourse(courseid) {
    console.log(courseid);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            mycourse = JSON.parse(this.responseText);
            console.log(mycourse);

            let teearray = mycourse.data.holes[0].teeBoxes;
            for (let i = 0; i < teearray.length; i++){
                $("#teeselect").append("<option value='" + i + "'>" + teearray[i].teeType + "</option>")
            }

        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/"+courseid, true);
    xhttp.send();
}

function chooseTee(teevalue) {
    globaltee = teevalue;

    buildCard();
}

function buildCard() {
    for(let i = 0; i < numholes; i++) {
        $(".right").append("<div id='column" + i + "' class='column'>" +
            "<span>"+ (i+1) +"</span>" +
            "<div>" + mycourse.data.holes[i].teeBoxes[globaltee].yards + "</div>" +
            "<div>" + mycourse.data.holes[i].teeBoxes[globaltee].hcp + "</div>" +
            "<div>" + mycourse.data.holes[i].teeBoxes[globaltee].par + "</div>" +
            "</div>");
    }
    addHoles();
}

function addHoles() {
    for(let p = 1; p <= $("#numberOfPlayers").val(); p++) {
        for (let h = 0; h < numholes; h++) {
            $("#column" + h).append("<input type='number' id='p"+ p +"h"+ (h+1) +"'>");
        }
    }
}

function addScore(myid) {
    let myscore = 0;
    //parse the player number out of the id, make that p
    for(let i = 0; i <= numholes; i++) {
        let scoreitem = $("#p" + p + "h" + i).val();
        myscore += scoreitem;
    }
    return myscore;
}

addPlayers = () => {
    let totalPlayers = $("#numberOfPlayers").val();

    $(".left").append("<div>Hole # </div>" +
        "<div>Yards </div>" +
        "<div>Handicap </div>" +
        "<div>Par</div>");
    for(let i = 1; i <= totalPlayers; i++) {
        $(".left").append("<div class='player'>Player "+ i +
                "<button class='playerDelete'>" +
                    "<i class=\"far fa-trash-alt\"></i>" +
                "</button>" +
            "</div>");
    }
    $(".modal-background").hide();
    $(".content").css("filter", "blur(0px");

    $(".playerDelete").click(function() {
        $(".this").closest().remove();
    });
};


function checkname (myval) {
    $(".pname").each(function (){
        let player = $(this).html();
        if(myval === player){
            $(".perror").html("Sorry, that name is in use.");
        }
        else if(myval !== player){
            $(".perror").html("Great name!");
        }
    });
}