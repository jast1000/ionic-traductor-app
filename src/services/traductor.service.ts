import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class TraductorService {

    private API: string = "https://translation.googleapis.com/";
    private REQUEST_TIMEOUT: number = 5000;
    private KEY_GOOGLE: string = "AIzaSyBhTroZu0YZrTdpawN80GzHV9JIrvESJmM";

    constructor(private http: Http) { }

    public traducir(texto: string, lenguajeDe: string, lenguajeA: string): Promise<any> {
        let url: string = this.API + "language/translate/v2";
        let params = new URLSearchParams();
        params.set("key", this.KEY_GOOGLE);
        params.set("q", texto);
        params.set("target", lenguajeA);
        params.set("source", lenguajeDe);
        return this.http.get(url, new RequestOptions({ search: params }))
            .timeout(this.REQUEST_TIMEOUT)
            .map(response => response.json())
            .toPromise();
    }

}
