'use strict';


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function clearStorage() {
    localStorage.clear();
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}