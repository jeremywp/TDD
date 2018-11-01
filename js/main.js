let courseList;
let numplayers = 5;
let numholes = 18;

(function(){
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

            buildCard();
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/"+courseid, true);
    xhttp.send();
}

function buildCard(){
    for(let i = 1; i <= numholes; i++){
        $(".card").append("<div id='column" + i + "' class='column'>"+ i +"</div>");
    }
    addHoles();
}

function addHoles(){
    for(let p = 1; p <= numplayers ; p++){
        for (let h = 1; h <= numholes; h++){
            $("#column" + h).append("<input type='number' id='p"+ p +"h"+ h +"'>");
        }
    }
}

addPlayers = () => {
    let totalPlayers = $("#numberOfPlayers").val();
    for(let i = 1; i <= totalPlayers; i++){
        $(".content").append("<div class='player'>Player"+ i +
            "<button class='playerDelete'>Delete player</button>" +
            "</div>");
    }
    $(".modal-background").hide();
    $(".content").css("filter", "blur(0px");

    $(".playerDelete").click(function() {
        $(".this").closest().remove();
    });
};
