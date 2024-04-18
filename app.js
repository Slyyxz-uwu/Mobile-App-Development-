const mapNav = document.getElementById('map-nav');
const mapPage = document.getElementById('map-page');
mapNav.root = mapPage;


let locationCoords = [];
let place = "";

//Setting up of the map 
const myMap = document.getElementById("map");
const map = L.map('map');


map.setView([51,  0], 5);


//Opening street map 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    //Opening street map copyright
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Resizing map to counter ionic-leaflet issue
const resize = new ResizeObserver(() => {
    map.invalidateSize();
}, 12);
resize.observe(myMap);


// shows set of points from data.js on map
function mapPointsFromData(){
    // for loop to call all data from data.js and add to map
    for (let i = 0; i < geoPointData.length; i++) {
    
        let printOnMap = geoPointData[i];
        printOnMap.addTo(map);
    }    
}   
mapPointsFromData();

map.on('click', getLocation);

function getLocation(event) {
    
    locationLat = event.latlng.lat;;
    locationLong = event.latlng.lng;
    //console.log(`You clicked the map at \nlat: ${locationLat}, \nlng: ${locationLong}`);

    pollutionApi(locationLat, locationLong)
    locationCoords = [locationLat, locationLong];
    let marker = L.marker(event.latlng).addTo(map).on('click', event => event.target.remove());
}


//This function focuses on calling on the API and retrieving the information
function pollutionApi(lati,loni) {
    getNameOfLocation(lati, loni)

lat = lati
lon = loni

//Ensuring that the Lat and Lon information is showcased within the pollution tab
latPosition = document.getElementById('lbl-lat') // 
latPosition.innerText = "Latitude: "+lat

lonPosition = document.getElementById('lbl-lng')
lonPosition.innerText = "Longitude:"+lon


const key1 = "7d9aaf5f5f049418e5ff3ec643947f45"
apiData = "http://api.openweathermap.org/data/2.5/air_pollution?lat="+lat+"&lon="+lon+"&appid="+key1
a = fetch(apiData).then(getJson).then(updateDisplay)
}

function getJson(aResponse){
    //console.log(aResponse.json()    )
    return aResponse.json();
}
function updateDisplay(jsonObj){
    let charObjArray = jsonObj; 
    
    
    testingVariable = charObjArray.list[0].components

    //console.log(testingVariable)

    //Showcasing information in the pollution tab regarding the API parameters
    coReading = testingVariable.co;
    noReading = testingVariable.no;
    no2Reading = testingVariable.no2;
    o3Reading = testingVariable.o3;
    so2Reading = testingVariable.so2;

    document.getElementById('lbl-lat').value=2;

    toArray = [coReading, noReading, no2Reading, o3Reading, so2Reading]
    console.log(toArray)
    let charObj = charObjArray 
    console.log(charObj);

    //Showcasing information in the pollution tab regarding the API parameters
    coLevel = document.getElementById('co-label')
    coLevel.innerText = coReading

    noLevel = document.getElementById('no-label')
    noLevel.innerText = noReading

    no2Level = document.getElementById('no2-label')
    no2Level.innerText = no2Reading

    o3Level = document.getElementById('o3-label')
    o3Level.innerText = o3Reading

    so2Level = document.getElementById('so2-label')
    so2Level.innerText = so2Reading

    
    }

//Retrieving the exact name of the city/town from the map API and placing it within the pollution tab
   async function getNameOfLocation (lat, lon){
    apiKeytwo = "a8377f89a509be9f607e57b2469af015"
        const dataFromAPI = "http://api.openweathermap.org/geo/1.0/reverse?lat="+lat+"&lon="+lon+"&limit=1&appid="+apiKeytwo
    
        try {
            const response = await fetch(dataFromAPI);
            const location = await getJson(response);
            place = location[0].name;
            console.log(place);
            
            locationName = document.getElementById('location-name')
            locationName.innerText = 'Location:'+place


        } catch (error) {
            console.log(error);
        }
    }
    
//Creating the settings tab with working checked/unchecked parameters for display 
function coUnchecked (locationOfClick, showOrHide){ //ADD MORE ONCLICK="COUNCHECKED()" TO INDEX.HTML
    a = document.getElementById(locationOfClick).getAttribute("aria-checked") //change CO-PARAMETERS

    if(a.length==5){
        document.getElementById(showOrHide).style.display = 'block' //CHANGE CO-ITEM
        
    }
    else{
        document.getElementById(showOrHide).style.display = 'none' //CHANGE CO-ITEM
    }
}

//Saving name function and later reusing it within the
const saveTextLocal = document.getElementById('btn-save');
const storageInput = document.getElementById('input-text');


const storedLocalInput = localStorage.getItem('textInput');
saveTextLocal.addEventListener('click', saveToLocalStorage);


function saveToLocalStorage(){
    localStorage.setItem('textInput', storageInput.value);
    console.log("Saved to Local text");

displayingName = document.getElementById('display-name')
displayingName.innerText = "Welcome,\xa0" + storedLocalInput + "."

locationName = document.getElementById('location-name')
            locationName.innerText = 'Location:' +place

}