import { Country } from "./country";
import { Photo } from "./photo";
import { StayCat } from "./stay-cat";

export interface City {
    id: number,
    name: string,
    id_country: number,
    id_stay_cat: number,
    country: Country;
    category: StayCat;
    photo: Photo[];
    picture: any;
    isVisible: boolean;
}
