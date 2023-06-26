// File origin: VS1LAB A3
/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

const { PAGE_SIZE } = require("./discovery-response");

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
class InMemoryGeoTagStore {
  #geotags = [];

  getGeoTags() {
    return this.#geotags;
  }

  getGeoTagById(id) {
    return this.#geotags.find((geotag) => geotag.id === id);
  }

  searchGeoTags(searchterm) {
    return this.#geotags.filter((geotag) => {
      return (
        geotag.name.includes(searchterm) || geotag.hashtag.includes(searchterm)
      );
    });
  }

  getNearbyGeoTags(latitude, longitude, radius) {
    return this.#geotags.filter((geotag) => {
      // Compute distance between geotag and location
      const distance = Math.sqrt(
        Math.pow(latitude - geotag.latitude, 2) +
          Math.pow(longitude - geotag.longitude, 2)
      );
      return distance <= radius;
    });
  }

  searchNearbyGeoTags(latitude, longitude, radius, searchterm) {
    return this.getNearbyGeoTags(latitude, longitude, radius).filter(
      (geotag) => {
        return (
          geotag.name.includes(searchterm) ||
          geotag.hashtag.includes(searchterm)
        );
      }
    );
  }

  addGeoTag(geotag) {
    this.#geotags.push(geotag);
  }

  updateGeoTag(id, { name, hashtag, latitude, longitude }) {
    const updatedGeotag = this.#geotags.find((geotag) => geotag.id === id);
    if (updatedGeotag) {
      if (name) updatedGeotag.name = name;
      if (hashtag) updatedGeotag.hashtag = hashtag;
      if (latitude) updatedGeotag.latitude = latitude;
      if (longitude) updatedGeotag.longitude = longitude;
    }
    return updatedGeotag;
  }

  removeGeoTag(name) {
    this.#geotags = this.#geotags.filter((geotag) => geotag.name !== name);
  }

  removeGeoTagById(id) {
    const deletedTag = this.#geotags.find((geotag) => geotag.id === id);
    this.#geotags = this.#geotags.filter((geotag) => geotag.id !== id);

    return deletedTag;
  }
}

module.exports = InMemoryGeoTagStore;
