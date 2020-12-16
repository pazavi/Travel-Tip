import { locationService } from './services/location-service.js'
export const mapController = {
    myLoc
}

// console.log('locationService.loadFromStorage', locationService.loadFromStorage);

var gGoogleMap;


window.onload = () => {
    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
            document.querySelector('.myLoc').onclick = myLoc;
            gGoogleMap.addListener('click', (ev) => { ///when Map clicked
                console.log('Map clicked', ev);
                const placeName = prompt('Place name?')
                    // console.log('Map clicked', placeName, ev.latLng.lat(), ev.latLng.lng());
                    // var locMarker = addMarker({ lat: ev.latLng.lat(), lng: ev.latLng.lng() }, placeName);
                var newLocation = { lat: ev.latLng.lat(), lng: ev.latLng.lng(), name: placeName };
                locationService.addLocationToStorage(newLocation);
<<<<<<< HEAD
                console.log('newLocation', newLocation)
                    // addNewLocation(newLocation);
                    //fun addToLoc(locMarker)
=======
                
>>>>>>> 0a3686aa88bd36a25c25ecf8f8dc209d2a381549


            });
        })
        .catch(console.log('INIT MAP ERROR'));

    getUserPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })

    document.querySelector('.btn').addEventListener('click', (ev) => {
        console.log('Aha!', ev.target);
        panTo(35.6895, 139.6917);
    });

    renderLocationsTable();

}


export function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gGoogleMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            myLoc()
            console.log('Map!', gGoogleMap);
        })
}

function addMarker(loc, title = 'hello') {
    var marker = new google.maps.Marker({
        position: loc,
        map: gGoogleMap,
        title
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gGoogleMap.panTo(laLatLng);
}

function getUserPosition() {
    // console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBxG0--DM1fZRSmLwQPjlcVXJ7gVcex_KQ';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    // console.log('test!')

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

<<<<<<< HEAD

let infoWindow;

function myLoc() {

    infoWindow = new google.maps.InfoWindow();
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(gGoogleMap);
                gGoogleMap.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, gGoogleMap.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, gGoogleMap.getCenter());
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(gGoogleMap);
=======
function renderLocationsTable() {
    var locations = locationService.getUserLocations();
    var strHTMLs = '<tr><th>Name</th><th>Latitude</th><th>Longitude</th><th colspan="2">Actions</th></tr>';
    strHTMLs += locations.map(function (location) {
        return `<tr> <td>${location.name}</td><td>${location.lat}</td><td>${location.lng}</td>
        <td><button class="go-btn">Go</button></td><td><button class="delete-btn">Delete</button></td></tr>`

    })

    document.querySelector('table').innerHTML = strHTMLs;
 
>>>>>>> 0a3686aa88bd36a25c25ecf8f8dc209d2a381549
}