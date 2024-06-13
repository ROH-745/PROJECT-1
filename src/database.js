// database.js

const DB_NAME = "BabylonDB";
const DB_VERSION = 1;
const STORE_NAME = "BabylonScenes";

let db;

export function openDatabase() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
             db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = function(event) {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
}

export function addScene(sceneData) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction([STORE_NAME], "readwrite");
        let objectStore = transaction.objectStore(STORE_NAME);
        let request = objectStore.add({ name: sceneData.name, data: sceneData.data });

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(`Add scene error: ${event.target.errorCode}`);
        };
    });
}

export function getScene(id) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction([STORE_NAME]);
        let objectStore = transaction.objectStore(STORE_NAME);
        let request = objectStore.get(id);

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(`Get scene error: ${event.target.errorCode}`);
        };
    });
}
