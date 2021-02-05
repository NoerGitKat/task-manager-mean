import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})

// This class handles all kinds of HTTP Requests
export class WebRequestService {
  readonly ROOT_URL_BACKEND: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL_BACKEND = "http://localhost:3000";
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL_BACKEND}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL_BACKEND}/${uri}`, payload);
  }

  put(uri: string, payload: Object) {
    return this.http.put(`${this.ROOT_URL_BACKEND}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL_BACKEND}/${uri}`);
  }
}
