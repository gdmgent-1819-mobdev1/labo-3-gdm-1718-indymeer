function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

// MAP 



// lege arrays om te storen

let people = new Array();
console.log(people);



let like_button = new Array();
localStorage.setItem("like", JSON.stringify(like_button));


let dislike_button = new Array();
localStorage.setItem("dislike", JSON.stringify(dislike_button));

//fetch id for buttons
var bad = document.getElementById("nope");
var good = document.getElementById("like");
var next = document.getElementById("next");
var close = document.getElementById("close");
var close2 = document.getElementById("close2");




// buttons

/**
volgende regels zijn toegevoegd
*/
var index = 0

function fetchData() {
    people = new Array()
    console.log("fetching to do implement")
    fetch('https://randomuser.me/api?results=10').then(response => {
        return response.json();
    }).then(data => {
        function create() {
            for (let i = 0; i < 10; i++) {
                let authors = data.results[i];
                localStorage.setItem('test', JSON.stringify(authors));


                let allPeople = {
                    name: authors.name.first + authors.name.last,
                    picture: authors.picture.large,
                    age: authors.dob.age
                }
                
                people.push(allPeople);

            }
        }
        create()
    })

}

function renderNewPerson(person) {
    console.log("Rendering: " + person.name + ". to do implement")
    var image = document.getElementById("personImage")
    var userName = document.getElementById("username")
    var quote = document.getElementById("quote")
    image.style.background = 'url(' + person.picture + ')'
    userName.innerHTML = person.name
    quote.innerHTML = "age" + " " + person.age


}
/*TOT HIER*/



bad.addEventListener("click", function (event) {
    event.preventDefault();

    let array = JSON.parse(localStorage.getItem('test'));

    array = people[index];

    dislike_button.push(people[index]);
    //people.shift(1);

    //console.log(index)
    //console.log(array.name)
    renderNewPerson(array);

    //console.log(currentProfile.name);
    console.log(index);
    if (index >= 9) {
        index = 0;
        fetchData();

    } else {
        index++;
    }


})


good.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("good button clicked")



    let array = JSON.parse(localStorage.getItem('test'));

    array = people[index];

    like_button.push(people[index]);
    //people.shift(1);

    //console.log(index)
    //console.log(array.name)
    renderNewPerson(array);

    //console.log(currentProfile.name);
    console.log(index);
    if (index >= 9) {
        index = 0;
        fetchData();

    } else {
        index++;
    }

})


//show list like
next.addEventListener("click", function () {
    document.getElementById("overlay2").style.transform = "translateX(0%)";

    displayLike();

})

function displayLike(){
    document.getElementById("text2").innerHTML = "";
   
    // var switchLike = document.querySelectorAll("#move1");
 
     for (i = 0; i < like_button.length; i++) {
 
         document.getElementById("text2").innerHTML +=  '<a href="#" class="close" id="move1" onclick="switchDislike(' + i + ')" >'+ like_button[i].name +'</a> <br>';
 
 
     }
}

function switchDislike(index){
    dislike_button.push(like_button[index]);
            like_button.splice(index, 1);
            displayLike();
}


// dislike buttons



previous.addEventListener("click", function () {
    document.getElementById("overlay1").style.transform = "translateX(0%)";
   
     displayDislike();
    
})

function displayDislike(){
    document.getElementById("text1").innerHTML = "";
   
    // var switchLike = document.querySelectorAll("#move1");
 
     for (i = 0; i < dislike_button.length; i++) {
 
         document.getElementById("text1").innerHTML +=  '<a href="#" class="close" id="move1" onclick="switchLike(' + i + ')" >'+ dislike_button[i].name +'</a> <br>';
 
 
     }
}

function switchLike(index){
    like_button.push(dislike_button[index]);
            dislike_button.splice(index, 1);
            displayDislike();
}

// set remove button
close.addEventListener("click", function () {
    document.getElementById("overlay1").style.transform = "translateX(-100%)";

})
close2.addEventListener("click", function () {
   document.getElementById("overlay2").style.transform = "translateX(100%)";


})

// switch from like to dislike and from dislike to like


// create elements plus insert json

const ul = document.getElementById('main-window');

fetch('https://randomuser.me/api?results=10').then(response => {
    return response.json();
}).then(data => {
    //call in objects from json 


    function create() {
        for (let i = 0; i < 10; i++) {
            let authors = data.results[i];
            localStorage.setItem('test', JSON.stringify(authors));


            let allPeople = {
                name: authors.name.first + authors.name.last,
                picture: authors.picture.large,
                age: authors.dob.age
            }
            
          if (like_button.includes(authors.login.uuid) || dislike_button.includes(authors.login.uuid)){
            continue;
        }else{
          people.push(allPeople);

        }
            ul.innerHTML = "";
            let li = createNode('div');
            let span = createNode('span');
            let info = document.createElement('div');
            let quote = createNode('div');
            /*HIER NOG IDS TOEGEVOEGD ZODAT ZE TE MANIPULEREN ZIJN VANUIT RENDERNEWPERSON*/

            info.className = "user-info";
            info.id = "user-info";

            info.id = "personInfo"

            li.className = "user-image";
            li.id = "user-image";

            li.id = "personImage"

            span.className = "username";
            span.id = "username";

            quote.className = "quote";
            quote.id = "quote";



            li.style.background = 'url(' + authors.picture.large + ')';
            span.innerHTML = authors.name.first + authors.name.last;
            quote.innerHTML = "age" + " " + authors.dob.age;


            append(info, quote);
            append(li, span);
            append(ul, li);
            append(ul, info);
        }
    }
    create();



}).catch(function (error) {
    console.log(error.message);
});


function element() {

}
