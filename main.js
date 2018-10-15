function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}



// lege arrays om te storen

let people = new Array();
console.log(people);


// like array
let like_button = new Array();
localStorage.setItem("like", JSON.stringify(like_button));

//dislike array
let dislike_button = new Array();
localStorage.setItem("dislike", JSON.stringify(dislike_button));

//fetch id for buttons
var bad = document.getElementById("nope");
var good = document.getElementById("like");
var next = document.getElementById("next");
var close = document.getElementById("close");
var close2 = document.getElementById("close2");




// buttons

//fetch nieuwe data wanneer er op next gedrukt wordt
var index = 0;

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
                    age: authors.dob.age,
                    city: authors.location.city,
                    lng: authors.location.coordinates.longitude ,
                    lat:  authors.location.coordinates.latitude
                }
                   

                people.push(allPeople);

            }
        }
        create()
        getPosition();

        showPosition();
    })

}


// functie om nieuwe persoon te genereren
function renderNewPerson(person) {
    console.log("Rendering: " + person.name + ". to do implement")
    var image = document.getElementById("personImage")
    var userName = document.getElementById("username")
    var quote = document.getElementById("quote")
    image.style.background = 'url(' + person.picture + ')';
    userName.innerHTML = '<a href=# class="fas fa-map-marker-alt" id="mapIcon" onclick="iconButton()"></a>' + person.name  ;
    quote.innerHTML = "age" + " " + person.age + '<br>'+person.city ;
    


}
/*TOT HIER*/


// dislike button

bad.addEventListener("click", function (event) {
    event.preventDefault();

    let array = JSON.parse(localStorage.getItem('test'));


    array = people[index];

    dislike_button.push(people[index]);
    setupMap();


    renderNewPerson(array);
    console.log(index);
    if (index >= 9) {
        index = 0;
        fetchData();

    } else {
        index++;
    }


})



// like button

good.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("good button clicked")
   


    let array = JSON.parse(localStorage.getItem('test'));

    array = people[index];

    like_button.push(people[index]);

    renderNewPerson(array);
    setupMap();


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





// show list dislike 

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

// switch image to corner on mapicon click


function iconButton() {

    let element = document.getElementById("personImage");
    element.classList.toggle("user-image2");

}



// create elements plus insert json : beginnende array 

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
                    age: authors.dob.age,
                    city: authors.location.city,
                   lat: authors.location.coordinates.latitude, 
                    lng: authors.location.coordinates.longitude
            }
            
          if (like_button.includes(authors.login.uuid) || dislike_button.includes(authors.login.uuid)){
            continue;
        }else{
          people.push(allPeople);

        }
            ul.innerHTML = "";
            let li = createNode('div');
            let image = createNode('div');
            let span = createNode('span');
            let info = document.createElement('div');
            let quote = createNode('div');
            /*HIER NOG IDS TOEGEVOEGD ZODAT ZE TE MANIPULEREN ZIJN VANUIT RENDERNEWPERSON*/

            info.className = "user-info";
            info.id = "user-info";

            info.id = "personInfo"

            image.className = "user-image";
            li.className = "user-image";

            image.id = "user-image";

            image.id = "personImage"

            span.className = "username";
            span.id = "username";

            quote.className = "quote";
            quote.id = "quote";


            li.innerHTML = "    <div id='map'></div>  "
            image.style.background = 'url(' + authors.picture.large + ')';
            span.innerHTML = '<a href=# class="fas fa-map-marker-alt" id="mapIcon" onclick="iconButton()"></a>' + authors.name.first + authors.name.last;
            quote.innerHTML = "age" + " " + authors.dob.age +'<br>' + authors.location.city ;


            append(info, quote);
            append(li, image);
            append(li, span);
            append(ul, li);
            append(ul, info);
        }    

    }
    create();
    
    setupMap();
    getPosition();
    showPosition();



}).catch(function (error) {
    console.log(error.message);
});



// MAP


    
    
    function setupMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaW5keW1lZXJtYW5zIiwiYSI6ImNqbjRqOWkydjNrM2Qza284cWJtNGIzMmMifQ.n1bFi7TfjO65EtziFqnpeA';
     var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
       center: [people[index].lng, people[index].lat],  //index is ingesteld als standaardwaarde 0
       
        zoom: 3
       
      });
    }
    


    
    function getPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude,
              lng = position.coords.longitude,
              latlng = [lng, lat];
              localStorage.setItem("coord", JSON.stringify(latlng));

    
          var marker = new mapboxgl.Marker()
          .setLngLat(latlng)
          .addTo(map);
    
          map.flyTo({
            center: latlng,
            zoom: 11
            
          });
          
            map.addSource("geomarker", {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [long, lat]
                  }
                }
        });
        
        map.addLayer({
            "id": "point",
            "type": "circle",
            "source": "point",
            "paint": {
                "circle-radius": 8,
                "circle-color": "#000"
            }
        });
        });
      }
    }


    // script van https://www.movable-type.co.uk/scripts/latlong.html
    function degreesToRadians(degrees) {
		return degrees * Math.PI / 180;
	  }


    function showPosition() {

        let Lat = position.coords.latitude;
		let Long = position.coords.longitude;
		let Long2 = person[0].longitude;
		let Lat2 = person[0].latitude;
		let R = 6371e3; // metres
		let φ1 = degreesToRadians(Lat);
		let φ2 = degreesToRadians(Lat2);
		let Δφ = degreesToRadians(Lat2-Lat);
		let Δλ = degreesToRadians(Long2-Long);
		let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
				Math.cos(φ1) * Math.cos(φ2) *
				Math.sin(Δλ/2) * Math.sin(Δλ/2);
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		let d = document.getElementById("quote");
		let result = Math.round(R * c/1000);
        d.innerHTML =  result + 'km';        
	}