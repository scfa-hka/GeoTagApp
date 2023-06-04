// File origin: VS1LAB A3

const GeoTagExamples = require("./geotag-examples");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{

    // TODO: ... your code here ...

    #geotags = GeoTagExamples.tagList();

    addGeotag(geotag) {
        this.#geotags.push(geotag);
    }
    
    removeGeoTag(geotag) {
        delete this.#geotags[geotag];
    }

    getNearbyGeoTags(location) {
        var proximity = 5.0;
        var NearbyGeoTags = [];

        for (i = 0; i < this.#geotags.length(); i++){
            if (calculateDistance(this.#geotags[i], location) <= proximity) {
                NearbyGeoTags.push(this.#geotags[i]);
            }
        }
        return NearbyGeoTags;    
    }

    searchNearbyGeoTags(keyword) {
        var NearbyGeoTags = getNearbyGeoTags();
        var searchResults = [];
        for (i = 0; i < NearbyGeoTags.length(); i++){
            if (NearbyGeoTags[i].name().includes(keyword) || NearbyGeoTags[i].hashtag().includes(keyword)){
                searchResults.push(NearbyGeoTags[i]);
            }
        }
        return searchResults;
    }

    calculateDistance(geotag, location) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(location.latitude() - geotag.latitude());  // deg2rad below
        var dLon = deg2rad(location.longitude() - geotag.longitude()); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      deg2rad(deg) {
        return deg * (Math.PI/180)
      }
}

module.exports = InMemoryGeoTagStore
