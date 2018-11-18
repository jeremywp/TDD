let courseList;
let numholes = 18;
let globaltee;
let numplayers = 0;
let playernames = [];
let player1total = 0;
let player2total = 0;
let player3total = 0;
let player4total = 0;

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
    return globaltee;
}

function buildCard() {
    $(".content").css("display", "flex");

    $(".left").append("<div class='row-title'>Hole # </div>" +
        "<div class='row-title'>Yards </div>" +
        "<div class='row-title'>Handicap </div>" +
        "<div class='par row-title'>Par </div>");

    for(let i = 0; i < 9; i++) {
        $(".out").append("<div id='column" + i + "' class='column'>" +
            "<span>"+ (i+1) +"</span>" +
            "<div class='row-data'>" + mycourse.data.holes[i].teeBoxes[globaltee].yards + "</div>" +
            "<div class='row-data'>" + mycourse.data.holes[i].teeBoxes[globaltee].hcp + "</div>" +
            "<div class='row-data'>" + mycourse.data.holes[i].teeBoxes[globaltee].par + "</div>" +
            "</div>");
    }

    let outyards = 0;
    let outhcp = 0;
    let outpar = 0;

    for(let i = 0; i < 9; i++) {
        outyards += mycourse.data.holes[i].teeBoxes[globaltee].yards;
        outhcp += mycourse.data.holes[i].teeBoxes[globaltee].hcp;
        outpar += mycourse.data.holes[i].teeBoxes[globaltee].par
    }

    $(".out").append("<div id='outcolumn' class='column'>" +
        "<span>OUT</span>" +
        "<div class='row-data'>" + outyards + "</div>" +
        "<div class='row-data'>" + outhcp + "</div>" +
        "<div class='row-data'>" + outpar + "</div>" +
        "</div>");

    for(let i = 10; i < numholes; i++) {
        $(".in").append("<div id='column" + i + "' class='column'>" +
            "<span>"+ (i+1) +"</span>" +
            "<div class='row-data'>" + mycourse.data.holes[i].teeBoxes[globaltee].yards + "</div>" +
            "<div class='row-data'>" + mycourse.data.holes[i].teeBoxes[globaltee].hcp + "</div>" +
            "<div class='row-data'>" + mycourse.data.holes[i].teeBoxes[globaltee].par + "</div>" +
            "</div>");
    }

    let inyards = 0;
    let inhcp = 0;
    let inpar = 0;

    for(let i = 10; i < 18; i++) {
        inyards += mycourse.data.holes[i].teeBoxes[globaltee].yards;
        inhcp += mycourse.data.holes[i].teeBoxes[globaltee].hcp;
        inpar += mycourse.data.holes[i].teeBoxes[globaltee].par
    }

    $(".in").append("<div id='incolumn' class='column'>" +
        "<span>IN</span>" +
        "<div class='row-data'>" + inyards + "</div>" +
        "<div class='row-data'>" + inhcp + "</div>" +
        "<div class='row-data'>" + inpar + "</div>" +
        "</div>");

    let totalyards = inyards + outyards;
    let totalhcp = inhcp + outhcp;
    let totalpar = inpar + outpar;

    $(".total").append("<div id='totalcolumn' class='column'>" +
        "<span>TOTAL</span>" +
        "<div class='row-data'>" + totalyards + "</div>" +
        "<div class='row-data'>" + totalhcp + "</div>" +
        "<div class='row-data' id='totalpar'>" + totalpar + "</div>" +
        "</div>");

    $(".modal-background").hide();
    $(".content").css("filter", "blur(0px");
}

function addHoles() {
    let p = numplayers;
        for (let h = 0; h < 9; h++) {
            $("#column" + h).append("<input class='outscoreplayer"+ p +"' type='number' id='p"+ p +"h"+ (h+1) +"'>");
        }

        $("#outcolumn").append("<input class='scoreplayer' id='totalout"+ p +"' type='number' readonly>");

        for (let h = 10; h < 18; h++) {
            $("#column" + h).append("<input class='inscoreplayer"+ p +"' type='number' id='p"+ p +"h"+ (h+1) +"'>");
        }

        $("#incolumn").append("<input class='scoreplayer' id='totalin"+ p +"' type='number' readonly>");

        $("#totalcolumn").append("<input class='scoreplayer' id='total"+ p +"' type='number' readonly>");
    }

function addPlayer() {
    numplayers++;
    if (numplayers <= 4) {
        $(".left").append("<div class='player' id='p" + numplayers + "'><span class='playername'>" + $(".pname").val() +
            "</span></div>");
        addHoles();
    }
    else if (numplayers > 4){
        $(".perror-box").css("display", "flex");
        $(".perror").html("Sorry, no more than four players.");
    }

    $(".pname").val("");
    return numplayers;
}

function checkName () {
    let name = $(".pname").val();
    if (playernames.includes(name)) {
        $(".perror-box").show();
        $(".perror").html("Sorry, that name is in use.");
    }
    else {
        playernames.push($(".pname").val());
        $(".perror-box").hide();
        addPlayer();
    }
}

$(document).on("change", ".outscoreplayer1", function () {
    let sumout = 0;
    $(".outscoreplayer1").each(function () {
        sumout += +$(this).val();
    });
    $("#totalout1").val(sumout);
});

$(document).on("change", ".inscoreplayer1", function () {
    let sumin = 0;
    $(".inscoreplayer1").each(function () {
        sumin += +$(this).val();
    });
    $("#totalin1").val(sumin);
});

$(document).on("change", ".outscoreplayer1", function () {

    let sumtotal = $("#totalout1").val() + $("#totalin1").val();

    $("#total1").val(sumtotal);

    player1total = sumtotal;
    return player1total;
});

$(document).on("change", ".inscoreplayer1", function () {

    let sumtotal = parseInt($("#totalout1").val()) + parseInt($("#totalin1").val());

    $("#total1").val(sumtotal);

    player1total = sumtotal;
    return player1total;
});



$(document).on("change", ".outscoreplayer2", function () {
    let sumout = 0;
    $(".outscoreplayer2").each(function () {
        sumout += +$(this).val();
    });
    $("#totalout2").val(sumout);
});

$(document).on("change", ".inscoreplayer2", function () {
    let sumin = 0;
    $(".inscoreplayer2").each(function () {
        sumin += +$(this).val();
    });
    $("#totalin2").val(sumin);
});

$(document).on("change", ".outscoreplayer2", function () {

    let sumtotal = $("#totalout2").val() + $("#totalin2").val();

    $("#total2").val(sumtotal);

    player2total = sumtotal;
    return player2total;
});

$(document).on("change", ".inscoreplayer2", function () {

    let sumtotal = parseInt($("#totalout2").val()) + parseInt($("#totalin2").val());

    $("#total2").val(sumtotal);

    player2total = sumtotal;
    return player2total;
});



$(document).on("change", ".outscoreplayer3", function () {
    let sumout = 0;
    $(".outscoreplayer3").each(function () {
        sumout += +$(this).val();
    });
    $("#totalout3").val(sumout);
});

$(document).on("change", ".inscoreplayer3", function () {
    let sumin = 0;
    $(".inscoreplayer3").each(function () {
        sumin += +$(this).val();
    });
    $("#totalin3").val(sumin);
});

$(document).on("change", ".outscoreplayer3", function () {

    let sumtotal = $("#totalout3").val() + $("#totalin3").val();

    $("#total3").val(sumtotal);

    player3total = sumtotal;
    return player3total;
});

$(document).on("change", ".inscoreplayer3", function () {

    let sumtotal = parseInt($("#totalout3").val()) + parseInt($("#totalin3").val());

    $("#total3").val(sumtotal);

    player3total = sumtotal;
    return player3total;
});


$(document).on("change", ".outscoreplayer4", function () {
    let sumout = 0;
    $(".outscoreplayer4").each(function () {
        sumout += +$(this).val();
    });
    $("#totalout4").val(sumout);
});

$(document).on("change", ".inscoreplayer4", function () {
    let sumin = 0;
    $(".inscoreplayer4").each(function () {
        sumin += +$(this).val();
    });
    $("#totalin4").val(sumin);
});

$(document).on("change", ".outscoreplayer4", function () {

    let sumtotal = $("#totalout4").val() + $("#totalin4").val();

    $("#total4").val(sumtotal);

    player4total = sumtotal;
    return player4total;
});

$(document).on("change", ".inscoreplayer4", function () {

    let sumtotal = parseInt($("#totalout4").val()) + parseInt($("#totalin4").val());

    $("#total4").val(sumtotal);

    player4total = sumtotal;
    return player4total;
});

$(document).on("change", "#p1h18", function () {
    let totalscore = $("#total1").text();
    let totalpar = $("#totalpar").text();
    let totaldif = totalscore.match(/\d+/g) - totalpar.match(/\d+/g);

    if (totaldif > 0){
        alert("You're score was \+" + totaldif + " over par.  Better luck next time!");
    }
    else if (totaldif < 0) {
        alert("You're score was " + totaldif + " under par.  Great job!");
    }
    else {
        alert("You score was on par.  Not bad!");
    }
});

$(document).on("change", "#p2h18", function () {
    let totalscore = $("#total1").text();
    let totalpar = $("#totalpar").text();
    let totaldif = totalscore.match(/\d+/g) - totalpar.match(/\d+/g);

    if (totaldif > 0){
        alert("You're score was \+" + totaldif + " over par.  Better luck next time!");
    }
    else if (totaldif < 0) {
        alert("You're score was " + totaldif + " under par.  Great job!");
    }
    else {
        alert("You score was on par.  Not bad!");
    }
});

$(document).on("change", "#p3h18", function () {
    let totalscore = $("#total1").text();
    let totalpar = $("#totalpar").text();
    let totaldif = totalscore.match(/\d+/g) - totalpar.match(/\d+/g);

    if (totaldif > 0){
        alert("You're score was \+" + totaldif + " over par.  Better luck next time!");
    }
    else if (totaldif < 0) {
        alert("You're score was " + totaldif + " under par.  Great job!");
    }
    else {
        alert("You score was on par.  Not bad!");
    }
});

$(document).on("change", "#p4h18", function () {
    let totalscore = $("#total1").text();
    let totalpar = $("#totalpar").text();
    let tscorenum = totalscore.match(/\d+/g);
    let tparnum = totalpar.match(/\d+/g);
    let totaldif = tscorenum - tparnum;

    if (totaldif > 0){
        alert("You're score was \+" + totaldif + " over par.  Better luck next time!");
    }
    else if (totaldif < 0) {
        alert("You're score was " + totaldif + " under par.  Great job!");
    }
    else {
        alert("You score was on par.  Not bad!");
    }
});