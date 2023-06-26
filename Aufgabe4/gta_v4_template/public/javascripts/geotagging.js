// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console.
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

//.env file is not used in this exercise
const MAP_QUEST_API_KEY = "wCJTfvQc4B3JNmqRvKm9cemnYAKk59Ha";
let page = 1;
let pageCount = 1;
let searchTerm = "";

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation() {
  const mapManager = new MapManager(MAP_QUEST_API_KEY);
  const latitudeElement = document.getElementById("latitude");
  const longitudeElement = document.getElementById("longitude");
  const hiddenLatitudeElement = document.getElementById("hiddenLatitude");
  const hiddenLongitudeElement = document.getElementById("hiddenLongitude");
  const mapViewElement = document.getElementById("mapView");

  if (
    latitudeElement.value === "" ||
    longitudeElement.value === "" ||
    hiddenLatitudeElement.value === "" ||
    hiddenLongitudeElement.value === "" ||
    mapViewElement.src.includes("images/mapview.jpg")
  ) {
    LocationHelper.findLocation(({ latitude, longitude }) => {
      latitudeElement.value = latitude;
      longitudeElement.value = longitude;
      hiddenLatitudeElement.value = latitude;
      hiddenLongitudeElement.value = longitude;

      const tags = JSON.parse(mapViewElement.dataset.tags);

      const mapUrl = mapManager.getMapUrl(latitude, longitude, tags);
      mapViewElement.src = mapUrl;
    });
  }
}

/** 
 * falls data = undefined -> erste if-Anweisung
 *    Daten werden ggf. einzeln via JQuery extrahiert (Searchterm, hiddenLatitude/-Longitude)
 *    Server anfetchen mit erstellten Query-Parametern
 *    in Variable "data" JSON-Daten der Antwort speichern
 *    wegen await müssen diese Prozesse erst abgeschlossen sein, bevor es weiter geht
 * 
 * Seitenanzahl (pageCount) aus data auslesen und Variable zuweisen
 * aus dem html-Doc über JQuery 
 *    hiddenLatitude/-Longitude Werte auslesen + speichern
 *    mapView Zugriff speichern
 *    Liste Zugriff speichern
 * einmal alle Listen-Elemente löschen
 * data.records einzeln auslesen und Liste wieder mit Elementen füllen -> appendChild(li)
 * 
 * updatePagination mit data als Parameter -> erstellt die Seiten-Navigation
 * 
 * dann Karte updaten mit data.records als taglist
 *  
*/
async function updatePageContent(tagsResponse = undefined) {
  console.log("updatePageContent", tagsResponse);
  const mapManager = new MapManager(MAP_QUEST_API_KEY);
  let data = tagsResponse;
  if (data === undefined) {
    const hiddenLatitude = document.getElementById("hiddenLatitude")?.value;
    const hiddenLongitude = document.getElementById("hiddenLongitude")?.value;

    const queryParameters = new URLSearchParams();
    queryParameters.append("page", page);
    if (searchTerm !== "") queryParameters.append("searchterm", searchTerm);
    if (hiddenLatitude) queryParameters.append("latitude", hiddenLatitude);
    if (hiddenLongitude) queryParameters.append("longitude", hiddenLongitude);
    const geotagsResponse = await fetch(`/api/geotags?${queryParameters}`);
    data = await geotagsResponse.json();
  }

  pageCount = data.pageCount;

  const mapViewElement = document.getElementById("mapView");
  const hiddenLatitude = document.getElementById("hiddenLatitude").value;
  const hiddenLongitude = document.getElementById("hiddenLongitude").value;
  const discoveryResultsElement = document.getElementById("discoveryResults");
  discoveryResultsElement.innerHTML = ""; // clear all li elements
  
  data.records.forEach(({ name, latitude, longitude, hashtag }) => {
    const li = document.createElement("li");
    li.innerHTML = `${name} (${latitude}, ${longitude}) ${hashtag}`;
    discoveryResultsElement.appendChild(li);
  });

  updatePagination(data);

  const mapUrl = mapManager.getMapUrl(
    hiddenLatitude,
    hiddenLongitude,
    data.records
  );
  mapViewElement.src = mapUrl;
}
/**
 * falls in data.records Daten vorhanden sind, werden die entsprechenden HTML-Tags angezeigt, sonst nicht
 */
const updatePagination = (data) => {
  if (data.records.length > 0) {
    console.log("updatePagination", data);
    const paginationElement = document.getElementById("paginationText");
    paginationElement.innerHTML = `${data.page} / ${data.pageCount} (${data.totalRecordCount})`;

    showPagination();
  } else {
    hidePagination();
  }
};

function previousPage() {
  if (page > 1) {
    page--;
  }

  updatePageContent();
}

function nextPage() {
  if (page < pageCount) {
    page++;
  }

  updatePageContent();
}

function initPagination() {
  document.getElementById("paginationBack").addEventListener("click", () => {
    previousPage();
  });

  document.getElementById("paginationNext").addEventListener("click", () => {
    nextPage();
  });
}

function showPagination() {
  document.getElementById("paginationBack").style.display = "block";
  document.getElementById("paginationNext").style.display = "block";
  const paginationElement = document.getElementById("pagination");
  paginationElement.style.display = "flex";
  if (page === 1) {
    document.getElementById("paginationBack").style.display = "none";
  }
  if (page === pageCount) {
    document.getElementById("paginationNext").style.display = "none";
  }
}

function hidePagination() {
  const paginationElement = document.getElementById("pagination");
  paginationElement.style.display = "none";
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
  updateLocation();
  initPagination();

  /**
   * JQuery-Zugriff -> GeoTag-Formular
   * Eventlistener -> Submit
   * Default-Prozedere verhindern -> preventDefault
   * Daten des Formulars extrahieren -> requestData
   * Daten überprüfen -> checkValidity
   * Seite, Seitenanzahl, Suchbegriff festlegen -> Defaultwerte = 1, 1, "" 
   * Server anfetchen und Rückmeldung abwarten -> await
   * Antwort mit JSON im Body -> const response -> clientseitig werden Daten dann verarbeitet
   * falls response ok -> updatePageContent + name = hashtag = ""
   * sonst -> error
   */
  document
    .getElementById("tag-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const requestData = {};
      if (form.checkValidity()) {
        requestData["latitude"] = form.latitude.value;
        requestData["longitude"] = form.longitude.value;
        requestData["name"] = form.name.value;
        requestData["hashtag"] = form.hashtag.value;

        page = 1;
        pageCount = 1;
        searchTerm = searchTerm;

        const response = await fetch("/api/geotags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
        if (response.ok) {
          //was passiert mit geotag?
          const geotag = await response.json();
          await updatePageContent();
          document.getElementById("name").value = "";
          document.getElementById("hashtag").value = "";
          return true;
        } else {
          console.error("Error while adding geotag");
        }
      }
      return false;
    });

    /** 
     * JQuery-Zugriff -> Discovery-Formular
     * Eventlistener -> Submit
     * Default-Prozedere verhindern -> preventDefault
     * Daten des Formulars extrahieren -> requestData
     * Daten überprüfen -> checkValidity
     * 
     * Variable mit quereyParameter wird dabei erstellt
     * 
     * Seite, Seitenanzahl festlegen -> Defaultwerte = 1, 1
     * 
     * ggf. hiddenLatitude/-Longitude und Searchterm an queryParameters anhängen
     * 
     * dann Server anfetchen, Antwort abwarten -> await
     * 
     * falls response.ok -> Seiteninhalte updaten 
     * sonst -> error
     * 
     */
  document
    .getElementById("discoveryFilterForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      if (form.checkValidity()) {
        const queryParameters = new URLSearchParams();
        const hiddenLatitude = form.hiddenLatitude.value;
        const hiddenLongitude = form.hiddenLongitude.value;
        const searchterm = form.searchterm.value;
        page = 1;
        pageCount = 1;
        searchTerm = searchterm;

        if (hiddenLatitude !== "")
          queryParameters.append("latitude", hiddenLatitude);
        if (hiddenLongitude !== "")
          queryParameters.append("longitude", hiddenLongitude);
        if (searchterm !== "") queryParameters.append("searchterm", searchterm);
        queryParameters.append("page", page);
        const response = await fetch(`/api/geotags?${queryParameters}`);
        if (response.ok) {
          const data = await response.json();
          await updatePageContent(data);
        } else {
          console.error("Error while adding geotag");
        }

        return;
      }

      return false;
    });
});






/*
Probleme:
- Wenn man neuen Request macht muss, die Pagination zurückgesetzt werden (page = 1)
- Wenn man eine neue Seite aufruft, muss das alte Suchergebnis übernommen werden (previous Page / next Page )
- 

*/
