import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; //Este modulo se debe cargar en el app module
import { Observable } from "rxjs"; //Esto me premite recibir las respuestas que me devuelva el backend
import { User } from "../models/user";
import { global } from "./global";

@Injectable() //El injectable me permite inyectar la clase dentro de una propiedad
export class UserService {
    public url: string;
    public identity;
    public token;

    constructor(private _http: HttpClient) {
        this.url = global.url;
    }

    prueba() {
        return "Hola mundo desde el servicio de angular";
    }

    register(user): Observable<any> {
        //Convertir el objeto de usuario a un json string
        let params = JSON.stringify(user); //La unica manera de enviar objetos de javascript
        //por http es que sea string o enteros

        //Definir las cabeceras
        let headers = new HttpHeaders().set("Content-Type", "application/json");

        //Hacer peticion Ajax
        return this._http.post(this.url + "register", params, { headers: headers });
    }

    signup(user, gettoken = null): Observable<any> {
        //Comprobar si llega el gettoken
        if (gettoken != null) {
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set("Content-type", "application/json");

        return this._http.post(this.url + "login", params, { headers: headers });
    }

    getIdentity() {
        //Saco la identidad del local storage. Parseo para convertirlo en objeto, recordar que
        //al guardarse en el localStorage se guarda como json string
        let identity = JSON.parse(localStorage.getItem("identity"));

        if (identity && identity != null && identity != undefined && identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        //No necesito parsear aqui, recordar que el token ya es un string de por si, no necesita ser objeto
        let token = localStorage.getItem("token");

        if (token && token != null && token != undefined && token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    update(user): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders()
            .set("Content-Type", "application/json")
            .set("Authorization", this.getToken());

        return this._http.put(this.url + "update", params, { headers: headers });
    }

    getUsers(): Observable<any> {
        return this._http.get(this.url + "users");
    }

    getUser(userId): Observable<any> {
        return this._http.get(this.url + "user/" + userId);
    }
}
