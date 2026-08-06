export interface TempleLocation {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
}

export const TEMPLE_LOCATION = {
  name: "Sheetla Mata Mandir, Lagdevi",
  lat: 31.75645448730022,
  lng: 76.59971548895543,
  zoom: 17,
  get mapEmbedUrl(): string {
    return `https://maps.google.com/maps?q=${this.lat},${this.lng}&z=${this.zoom}&output=embed`;
  },
  get mapDirectionsUrl(): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${this.lat},${this.lng}`;
  }
};

export interface TempleInfo {
  name: string;
  hindiName: string;
  location: string;
  state: string;
  tagline: string;
  hindiTagline: string;
  openingTime: string;
  closingTime: string;
  morningAarti: string;
  eveningAarti: string;
  address: string;
  pincode: string;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
}

export const templeData: TempleInfo = {
  name: "Sheetla Mata Mandir",
  hindiName: "शीतला माता मंदिर",
  location: "Village Lagdevi",
  state: "Himachal Pradesh",
  tagline: "A sacred place of faith, devotion and togetherness in the heart of Lagdevi.",
  hindiTagline: "आस्था, श्रद्धा और हमारी संस्कृति का पवित्र स्थान",
  openingTime: "4:00 AM",
  closingTime: "9:00 PM",
  morningAarti: "6:00 AM",
  eveningAarti: "7:00 PM",
  address: "Sheetla Mata Mandir, Village Lagdevi, Tehsil Bamson (Tauni Devi), District Hamirpur, Himachal Pradesh",
  pincode: "177022",
  get mapEmbedUrl() {
    return TEMPLE_LOCATION.mapEmbedUrl;
  },
  get mapDirectionsUrl() {
    return TEMPLE_LOCATION.mapDirectionsUrl;
  },
};
