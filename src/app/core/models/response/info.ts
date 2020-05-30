interface IInfo {
    count: number;
    pages: number; 
    next: string;
    prev: string;
}

export class Info implements IInfo {
    count: number;
    pages: number;
    next: string;
    prev: string;
}