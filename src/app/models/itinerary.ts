import { City } from "./city";
import { TransportCompany } from "./transport-company";
import { TransportType } from "./transport-type";

export interface Itinerary {
    id_itinerary: number,
    id_origin_city: number,
    id_destination_city: number,
    id_user: number,
    originCity: City;
    destinationCity: City;
    company: TransportCompany[],
    type: TransportType[],
    cityStop: City[]
}
