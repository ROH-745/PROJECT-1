const indexedDB = window.indexedDB;

let request = indexedDB.open("MyDatabase", 1)

request.onerror = function (event) {
  console.log("An error occured with IndexDb");
  console.log(event);
}


request.onupgradeneeded = function(event) {
  let db = event.target.result;
  let objectStore = db.createObjectStore("myObjectStore", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
};


request.onsuccess = function (event) {
  let db = event.target.result;
  let transaction = db.transaction(["myObjectStore"], "readwrite");
  let objectStore = transaction.objectStore("myObjectStore");
  
  // Adding data
  objectStore.add({ id: 1, name: "John Doe" });
  objectStore.add({ id: 2, name: "Rohith" });
  objectStore.add({ id: 3, name: "Jasna" });
  objectStore.add({ id: 4, name: "Sandra" });
  

  let getRequest = objectStore.get(1);
  getRequest.onsuccess = function (event) {
    let data = event.target.result;
    console.log(data.name);  // Output: John Doe
  }
}