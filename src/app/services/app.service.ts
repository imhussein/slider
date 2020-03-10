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
        image:
          "https://images.unsplash.com/photo-1456973336295-46fc683d4276?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      },
      {
        image: "https://tympanus.net/Tutorials/the-substance/ph1.jpg"
      },
      {
        image:
          "https://tympanus.net/Tutorials/the-substance/photo-1515036551567-bf1198cccc35.jpeg"
      },
      {
        image:
          "https://tympanus.net/Tutorials/the-substance/photo-1519608487953-e999c86e7455.jpeg"
      },
      {
        image:
          "https://tympanus.net/Tutorials/the-substance/photo-1548191265-cc70d3d45ba1.jpeg"
      },
      {
        image:
          "https://images.unsplash.com/photo-1516426617986-06a0fa870623?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      },
      {
        image:
          "https://images.unsplash.com/photo-1558980664-ce6960be307d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      },
      {
        image:
          "https://images.unsplash.com/photo-1583737227036-29e06120e4b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1067&q=80"
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
