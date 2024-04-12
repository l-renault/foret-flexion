const content = document.getElementById("content");
const list = document.querySelectorAll("details");
var data = {};
var spoken = [];
var uttered = [];
var bit = "";
var answer = "";
var answer2 = "";
var answers = [];
var anwersgot = [];
var goalprac = "";
var goaltheo = "";
window.addEventListener("load", (event) => {
    console.log("La page est complètement chargée");


});
console.log(localStorage);
window.addEventListener('DOMContentLoaded', function () {
    var gone_prac = localStorage.getItem("go_prac");
    var gone_theo = localStorage.getItem("go_theo");
    if (document.getElementById(gone_prac + "_")) {

        document.getElementById(gone_prac + "_").className += " on";
    }
    if (document.getElementById(gone_theo + "_")) {

        document.getElementById(gone_theo + "_").className += " on";
    }
})
window.addEventListener('load', function () {
    var gone_prac = localStorage.getItem("go_prac");
    var gone_theo = localStorage.getItem("go_theo");
    console.log(gone_prac);
    console.log(gone_theo);
    goalprac = gone_prac + "_";
    goaltheo = gone_theo + "_";
    console.log(goalprac);
    console.log(goaltheo);
    if (!gone_prac && !gone_theo) {
        return;
    }
    else {
        if (document.getElementById(gone_prac)) {
            changelink(goalprac);
            opentab("click", gone_prac);



        }
        else
            if (document.getElementById(gone_theo)) {
                changelink(goaltheo);
                opentab("click", gone_theo);


            }
        
    }

})

function changelink(l) {


    document.getElementById(l).className += " on";


}
async function loadData() {
    const response = await fetch('data.json');
    const fetchdata = await response.json();
    return fetchdata;
}


loadData().then(d => {
    console.log(d);
    data = structuredClone(d);
    return data;
}).catch(console.log("Oops"));

/*Open*/
/* function openNav() {
    document.getElementById("myNav").style.height = "60%";
    setTimeout(() => {
       
        document.getElementById("myNav").style.height = "max-content";
      
    }, 400);
   
  } */
function openNav() {
    document.getElementById("myNav").style.height = "max-content";
    setTimeout(() => {

        document.getElementById("myNav").style.top = "1em";

    }, 400);

}
/* Close */
function closeNav() {
    document.getElementById("myNav").style.top = "-100%";
    setTimeout(() => {

        document.getElementById("myNav").style.height = "0%";

    }, 400);


}


function opendebug(event) {
    if (event.key === "d") {
        var debug = document.getElementById("debug");

        var classes = debug.classList;

        classes.toggle("hidden");
    }

}
function clearlocalstorage(event) {
    if (event.key === "p") {
        localStorage.clear();

    }

}
function clearstorage() {

    localStorage.clear();



}
//Get a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Shuffle the order of an array
function shuffleArray(arr) {
    arr.sort(() => Math.random() - 0.5);
}

//Shuffle an array of 100 numbers
function shuffle100() {
    var shuffle_nb = [];
    for (let i = 0; i < 100; i++) {
        shuffle_nb.push(i);
        shuffleArray(shuffle_nb);
    }
    return shuffle_nb;
}

//Enable keyboard nav
function keyDown(event) {
    if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
        var attribute = event.target.getAttribute("onclick");
        // alert(attribute);
        var doThat = new Function(attribute);
        doThat();
    }
}
function saveID(id) {
    bit = id;
    return bit;
}
function talk(l) {
    var codename = l.chara;
    var what = l.type;


    var say = document.createElement("div");
    if (what === "b") {

        btntalk(l, say);
        createtalk(say);

    }
    else if (codename !== "u") {
        var who = data.chars[codename].name;
        var face = data.chars[codename].avatars[l.avatar].src;
        theytalk(l, say, who, face);
        createtalk(say);
    }
    else {
        var face = data.chars[codename].avatars[l.avatar].src;
        switch (what) {

            case "c":

                choicetalk(l, say, face);
                createtalk(say);
                break;

            default:

                wetalk(l, say, face);
                createtalk(say);
                break;
        }

    }

}
/* function createtalk(say) {
    setTimeout(() => {
        var l = document.getElementsByClassName("loader");
        for (let i = 0; i < l.length; i++) {
            l[i].remove();
        }
        content.appendChild(say);
        say.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
    }, "600");
} */
function createtalk(say) {
    setTimeout(() => {
        var l = document.getElementsByClassName("loader");
        for (let i = 0; i < l.length; i++) {
            l[i].remove();
        }
        var b = document.getElementById(bit).appendChild(say);
        say.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
    }, "600");
}

function showload() {
    var loader = document.createElement("div");
    loader.setAttribute("class", "loader");
    content.appendChild(loader);
    loader.scrollIntoView({ behavior: "smooth", block: "center", inline: "end" });
}
function theytalk(l, div, who, face) {
    div.setAttribute("class", "turn them");

    var avatar = document.createElement("img");
    avatar.setAttribute("src", face);

    var wrap = document.createElement("div");

    var name = document.createElement("p");
    name.setAttribute("class", "name");
    name.innerHTML = who;

    var text = document.createElement("div");
    text.setAttribute("class", "txt");

    var line = document.createElement("p");
    line.innerHTML = l.text;

    text.appendChild(line);
    wrap.appendChild(name);
    wrap.appendChild(text);
    div.appendChild(avatar);
    div.appendChild(wrap);
}
function wetalk(l, div, face) {
    div.setAttribute("class", "turn us");
    var wrap = document.createElement("div");

    var text = document.createElement("div");
    text.setAttribute("class", "txt");

    var line = document.createElement("p");
    line.innerHTML = l.text;

    var avatar = document.createElement("img");
    avatar.setAttribute("src", face);

    text.appendChild(line);
    wrap.appendChild(text);
    div.appendChild(wrap);
    div.appendChild(avatar);
}
function choicetalk(l, div, face) {
    div.setAttribute("class", "turn us");
    var wrap = document.createElement("div");

    var text = document.createElement("div");
    text.setAttribute("class", "txt");

    var line = document.createElement("button");
    line.innerHTML = l.txt;
    line.setAttribute("value", l.txt);

    var avatar = document.createElement("img");

    avatar.setAttribute("src", face);

    text.appendChild(line);
    wrap.appendChild(text);
    div.appendChild(wrap);
    div.appendChild(avatar);
}
function btntalk(l, div) {
    div.setAttribute("class", "btnmid");
    var wrap = document.createElement("div");


    var btn = document.createElement("button");

    btn.innerHTML = l.txt;
    btn.setAttribute("value", l.txt);


    wrap.appendChild(btn);
    div.appendChild(wrap);

}
function speak(part) {

    var lines = data.script[part];
    for (let i = 0; i < lines.length; i++) {
        think(i, lines);
    }
}
function think(n, lines) {
    var size = n;
    var line;
    setTimeout(function () {

        line = lines[n];
        if (line.length > 1) {
            var dots = showload();
            for (let i = 0; i < line.length; i++) {

                talk(line[i]);

            }
            size = line.length;
        }
        else {
            var dots = showload();
            talk(line);
        }

    }, 1000 * size);
}


function bubbleup(t) {
    var ts = document.createElement("p");
    ts.innerHTML = t;
    ts.setAttribute("class", "bout");
    ts.style.position = "absolute";
    ts.style.animation = "upwego";
    ts.style.animationDuration = "5s";
    document.getElementById("tl").appendChild(ts);
    setTimeout(() => {
        ts.remove();
    }, "5000");
}
// Debug */ section
const bgcolor = "blue";
function setvar(name) {
    if (name === bgcolor) {
        var body = document.getElementsByTagName("body");
        for (let index = 0; index < body.length; index++) {
            body[index].classList.toggle("bgblue");
        }
    }
}
// End debug section

function chose(v) {

    if (v === "oui") {
        document.getElementById("non").remove();
    }
    if (v === "non") {
        document.getElementById("oui").remove();
    }
}
const dialog = document.querySelector("dialog");


const closeButton = document.querySelector("dialog button");



// Le bouton "Fermer" ferme le dialogue
closeButton.addEventListener("click", () => {

    var boni = document.getElementsByClassName("bonus");
    for (let i = 0; i < boni.length; i++) {
        boni[i].remove();

    }

    dialog.close();
});

// Any click outside of the menu buttons closes the menus
if (dialog) {
    dialog.addEventListener('click', event => {
        if (event.target === dialog) {
            var boni = document.getElementsByClassName("bonus");
            for (let i = 0; i < boni.length; i++) {
                boni[i].remove();

            }

            dialog.close();
        }
    });
}



function getanswers() {
    if (answers != "") {
        return;
    }
    else {


        answers = Object.keys(data.rightanswers);
        console.log(answers);
        for (const [key, value] of Object.entries(data.rightanswers)) {
            getquestion(key);
        }
    }

}

function getquestion(q) {

    var question = document.querySelector("button[name='" + q + "']");
    question.addEventListener("click", () => {
        answer = data.rightanswers[q];
        console.log(answer);
        dialog.showModal();

        return answer;
    });

}
const nom = document.querySelector("button[name='nm']");
nom.addEventListener("click", (e) => {

    amiright(answer.case, e);
});
const acc = document.querySelector("button[name='ac']");
acc.addEventListener("click", (e) => {

    amiright(answer.case, e);
});
const dat = document.querySelector("button[name='da']");
dat.addEventListener("click", (e) => {

    amiright(answer.case, e);
});
const gen = document.querySelector("button[name='ge']");
gen.addEventListener("click", (e) => {

    amiright(answer.case, e);
});
function amiright(a, e) {


    if (a === e.target.getAttribute("name")) {
        console.log("Bravo !");
        /*    if (anwersgot.includes()) {
               
           } */
        e.target.setAttribute("class", "gotit");
        setTimeout(() => {
            e.target.setAttribute("class", "");
        }, 5000);
        if (document.getElementById("bonus")) {
            return;
        }
        else {
            var modal = document.getElementById("modal");
            var bonus = document.createElement("p");

            bonus.innerHTML = "Pourquoi doit-on utiliser ce cas ?"
            var because = document.createElement("button");

            because.setAttribute("class", "case");
            because.innerHTML = "<img src='' alt=''>Je pense savoir.<img src='' alt=''>";
            var wrap = document.createElement("div");
            wrap.setAttribute("class", "answers bonus");
            wrap.setAttribute("id", "bonus");
            wrap.appendChild(bonus);
            wrap.appendChild(because);
            modal.appendChild(wrap);
            because.addEventListener("click", () => {
                if (document.getElementById("reason")) {
                    return;
                }
                else {
                    var reason = document.createElement("p");
                    reason.innerHTML = answer.why;
                    reason.setAttribute("class", "offtxt");
                    reason.setAttribute("id", "reason");
                    wrap.appendChild(reason);
                }


            });
        }
    }
    else {
        e.target.setAttribute("class", "uh");
        setTimeout(() => {
            e.target.setAttribute("class", "");
        }, 5000);
        console.log("Dommage !");
    }

}

function closedeets() {

    list.forEach(element => {
        if (element != this) {
            if (element.hasAttribute("open")) {
                element.removeAttribute("open");
            }
        }
    });
}

dialog.addEventListener('click', event => {
    if (event.target === dialog) {
        var boni = document.getElementsByClassName("bonus");
        for (let i = 0; i < boni.length; i++) {
            boni[i].remove();

        }
        dialog.close();
    }
});
function opentab(evt, tab) {


    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    intabs = document.getElementsByClassName("intab");
    for (i = 0; i < intabs.length; i++) {
        intabs[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" on", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tab).style.display = "block";

    evt.currentTarget.className += " on";
}


function activetab(target) {
    target.className += " on";
}
function speaktab(evt, tab) {
    opentab(evt, tab);
    if (spoken.includes(tab)) {
        return;
    }
    else {
        saveID(tab);

        speak(tab);
        spoken.push(tab);
    }

    console.log(spoken);
}
function speakngo(part) {
    if (uttered.includes(part)) {
        return;
    }
    else {
        var dots = document.getElementsByClassName("empty");
        /* var temp = document.getElementById(part); */
        for (let i = 0; i < dots.length; i++) {
           dots[i].style.display ='none';
            
        }
        /* temp.style.display = "none"; */
        document.getElementById("talking").style.opacity = "1";
        bit = "talking";
        speak(part);
        uttered.push(part);
        /* fadeOut("talking"); */
        /* document.getElementById("talking").innerHTML = "";
        temp.style.display ="flex"; */
        for (let i = 0; i < dots.length; i++) {
            dots[i].style.display ='flex';
             
         }
    }

}
/* function nope(e){
    fadeOut(e).then(()=>{
         document.getElementById("talking").innerHTML = "";
    temp.style.display ="flex";
    }).catch(console.log("Ooch"));
   
} */

function fadeOut(element) {
    var el = document.getElementById(element);
    setInterval(function () {
        var opacity = el.style.opacity;
        if (opacity > 0) {
            opacity -= 0.1;
            el.style.opacity = opacity;
        }
    }, 100);
}
function savethis(it, val) {
    localStorage.setItem(it, val);
}