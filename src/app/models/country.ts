import { Currency } from "./currency";
import { Language } from "./language";
import { Photo } from "./photo";
import { TravelDocument } from "./travel-document";

export interface Country {
    id: number;
    name: string;
    initial: string;
    schengen: boolean;
    observation: string;
    id_language: number;
    id_currency: number;
    id_travel_document: number;
    language: Language;
    currency: Currency;
    docs: TravelDocument;
    photo: Photo[];
    picture: any;
}
