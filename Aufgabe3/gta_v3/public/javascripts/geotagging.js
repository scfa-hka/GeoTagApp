// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console.
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

/**
 * TODO: 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation() {
  const mapManager = new MapManager("wCJTfvQc4B3JNmqRvKm9cemnYAKk59Ha");
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

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
  updateLocation();
});
