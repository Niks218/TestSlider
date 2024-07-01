import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


export interface Slide {
  title: string;
  text: string;
  reward: string;
  images: {
    background: string;
    foreground: string;
  }
}

@Injectable({providedIn:'root'})
export class SliderService {
  constructor(private http: HttpClient) { }

  getBanners(): Observable<Slide[]> {
    return this.http.get<Slide[]>('/banners')
  }
}
