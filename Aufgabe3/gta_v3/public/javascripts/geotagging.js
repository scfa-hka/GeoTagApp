// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

console.log("The geoTagging script is going to start...");

function updateLocation(LocationHelper) {
    if (
        $('#latitude').val() === "" ||
        $('#longitude').val() === "" ||
        $('#hiddenLatitude').val() === "" ||
        $('#hiddenLongitude').val() === "" ||
        $('#mapView').attr('src').includes("images/mapview.jpg")
        ){
            $('#latitude').val(LocationHelper.latitude);
            $('#longitude').val(LocationHelper.longitude);    
            $('#hiddenLatitude').val(LocationHelper.latitude);
            $('#hiddenLaongitude').val(LocationHelper.longitude);
            const mapManager = new MapManager('W7TFkY1ZkRX48kEoxar698OIFQwiHAzq');
            $('#mapView').attr('src', mapManager.getMapUrl(LocationHelper.latitude, LocationHelper.longitude, JSON.parse($('#mapView').attr('dataset').tags)));
        }

};

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    LocationHelper.findLocation(updateLocation);

}); 