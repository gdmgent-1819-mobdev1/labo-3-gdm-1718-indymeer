function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

// lege arrays om te storen

let people = new Array();
console.log(people);



let like_button = new Array();
console.log(like_button, 'like');
localStorage.setItem("like", JSON.stringify(like_button));
let store = JSON.parse(localStorage.getItem(like_button));


let dislike_button = new Array();
console.log(dislike_button, 'dislike');
localStorage.setItem("dislike", JSON.stringify(dislike_button));


var bad = document.getElementById("nope");
var good = document.getElementById("like");
var next = document.getElementById("next");



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




    array = people[index + 1];

    dislike_button.push(people[index]);
    //people.shift(1);

    //console.log(index)
    //console.log(array.name)
    renderNewPerson(array)

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

    array = people[index + 1];

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


//show list
next.addEventListener("click", function () {
    document.getElementById("text2").innerHTML = "";
    for (i = 0; i < like_button.length; i++) {
        document.getElementById("text2").innerHTML += like_button[i].name + '<br>';

    }
})

previous.addEventListener("click", function () {
    document.getElementById("text1").innerHTML = "";
    for (i = 0; i < dislike_button.length; i++) {
        document.getElementById("text1").innerHTML += dislike_button[i].name + '<br>';

    }
})

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
            people.push(allPeople);

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

            let person = people[0]


            li.style.background = 'url(' + person.picture + ')';
            span.innerHTML = person.name;
            quote.innerHTML = "age" + " " + person.age;


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
