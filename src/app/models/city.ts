import { Country } from "./country";
import { Photo } from "./photo";

export interface City {
    id: number,
    name: string,
    id_country: number,
    id_stay_cat: number,
    country: Country;
    cat: object;
    photo: Photo[];
    picture: any;
}
