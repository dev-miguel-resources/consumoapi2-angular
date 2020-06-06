import { Info } from "./info";

export class SearchResult<T> {
    info: Info;
    results: T[];
}