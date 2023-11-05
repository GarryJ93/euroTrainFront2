import { City } from "./city";
import { TransportCompany } from "./transport-company";
import { TransportType } from "./transport-type";
import { User } from "./user";

export interface Itinerary {
    id?: number,
    id_origin_city: number,
    id_destination_city: number,
    id_user: number,
    originCity: City;
    destinationCity: City;
    company: TransportCompany[],
    type: TransportType[],
    cityStop: City[],
    creator: User,
}
