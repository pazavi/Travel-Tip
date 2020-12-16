import { storageService } from '../services/storage-service.js'

console.log('storageService', storageService);

export const locationService = {
    getLocations
}

const STORAGE_KEY = 'myLocationsDB';


const gLocations = getUserLocations();
console.log('gLocations:', gLocations);

function getUserLocations() {
    let userLocations = storageService.loadFromStorage(STORAGE_KEY);
    if (!userLocations) userLocations = [{ lat: 17, lng: 19, name: 'Puki Home' }];
    return userLocations;
}


function getLocations() {
    return Promise.resolve(gLocations)
}

function _saveMyLocationsToStorage() {
    storageService.saveToStorage(STORAGE_KEY, gLocations)
}