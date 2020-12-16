import { locationService } from './services/location-service.js'
import { locationService } from './services/location-service.js'

console.log('locationService.loadFromStorage', locationService.loadFromStorage);

var gGoogleMap;

window.onload = () => {
    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
            gGoogleMap.addListener('click', (ev) => { ///when Map clicked
                console.log('Map clicked', ev);
                const placeName = prompt('Place name?')
                console.log('Map clicked', placeName, ev.latLng.lat(), ev.latLng.lng());
                var locMarker = addMarker({ lat: ev.latLng.lat(), lng: ev.latLng.lng() }, placeName);
                //fun addToLoc(locMarker)

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
    })

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
    console.log('Getting Pos');
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
    console.log('test!')

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}