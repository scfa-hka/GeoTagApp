// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

console.log("The geoTagging script is going to start...");

function updateLocation(LocationHelper) {
    $('#latitude').val(LocationHelper.latitude);
    $('#longitude').val(LocationHelper.longitude);    
    $('#current_latitude').val(LocationHelper.latitude);
    $('#current_longitude').val(LocationHelper.longitude);
    var mapManager = new MapManager('W7TFkY1ZkRX48kEoxar698OIFQwiHAzq');
    $('#mapView').attr('src', mapManager.getMapUrl(LocationHelper.latitude, LocationHelper.longitude));
};

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    LocationHelper.findLocation(updateLocation);

}); 