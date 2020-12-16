import { loadLocationsFromStorage } from '../services/storage-service.js'

console.log('loadLocationsFromStorage',loadLocationsFromStorage);

export const locationService = {
    getLocations
}

const STORAGE_KEY = 'myLocationsDB';


const  gLocations = getUserLocations();
console.log ('gLocations:', gLocations);

function getUserLocations(){
    let userLocations = loadLocationsFromStorage.loadFromStorage(STORAGE_KEY);
    if (!userLocations) userLocations = [{lat: 17, lng: 19, name: 'Puki Home'}];
    return userLocations;
}


function getLocations() {
    return Promise.resolve(gLocations)
}

function _saveMyLocationsToStorage() {
    saveToStorage(STORAGE_KEY, gLocations)
}