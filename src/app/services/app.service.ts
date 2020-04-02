import { Injectable } from "@angular/core";
import { SlidesData } from "../@types/interfaces";
import { ReplaySubject } from "rxjs";

// App Service
@Injectable({
  providedIn: "root"
})
export class AppService {
  private slidesData: SlidesData[];
  private currentSlide: ReplaySubject<number> = new ReplaySubject<any>();

  constructor() {
    // Slider Data
    this.slidesData = [
      {
        image: "/assets/1.jpeg"
      },
      {
        image: "/assets/2.jpeg"
      },
      {
        image: "/assets/3.jpeg"
      },
      {
        image: "/assets/4.jpeg"
      },
      {
        image: "/assets/5.jpeg"
      },
      {
        image: "/assets/6.jpeg"
      },
      {
        image: "/assets/7.jpeg"
      },
      {
        image: "/assets/8.jpeg"
      }
    ];
  }

  // Get Slides
  getSlideData() {
    return this.slidesData;
  }

  // Push To The Reative Subject
  changeSlide(index: number) {
    this.currentSlide.next(index);
  }

  // Get Slides AS Observable
  getCurrentSlide() {
    return this.currentSlide.asObservable();
  }
}
