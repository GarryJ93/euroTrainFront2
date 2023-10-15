import { City } from "./city";

export interface Itinerary {
    id_itinerary: number,
    id_origin_city: number,
    id_destination_city: number,
    id_user: number,
    originCity: City;
    destinationCity: City;
    companyTab: object[],
    transportType: object[],
    cityStop: City[]
}
