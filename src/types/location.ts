export interface ISaveLocation extends ILocation {
  userId: string;
}

export interface ILocation {
  display_name: string;
  place_id: string;
  lat: string;
  lon: string;
}
