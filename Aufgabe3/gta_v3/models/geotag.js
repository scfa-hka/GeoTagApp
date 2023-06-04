// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */

class GeoTag {

    // TODO: ... your code here ...
    // Location values for latitude and longitude are private properties to protect them from changes.

    constructor (longitude, latitude, name, hashtag) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.hashtag =hashtag;
    }
    
}

module.exports = GeoTag;
