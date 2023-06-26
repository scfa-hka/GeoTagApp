const PAGE_SIZE = 5;
class DiscoveryResponse {
  constructor(geoTags, page, pageCount, totalRecordCount) {
    this.records = geoTags;
    this.page = page;
    this.pageCount = pageCount;
    this.totalRecordCount = totalRecordCount;
  }
}

module.exports = { DiscoveryResponse, PAGE_SIZE };
