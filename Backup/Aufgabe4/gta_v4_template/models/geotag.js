// File origin: VS1LAB A3

const generateId = require("../utils/generate-id");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** *
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {
  constructor(latitude, longitude, name, hashtag) {
    this.id = generateId();
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.hashtag = hashtag;
  }
}

module.exports = GeoTag;
