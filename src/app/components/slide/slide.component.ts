import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit
} from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { SlidesData } from "src/app/@types/interfaces";

@Component({
  selector: "app-slide",
  templateUrl: "./slide.component.html"
})
export class SlideComponent implements AfterViewInit {
  // Slides
  @ViewChild("slides", { static: false }) slides: ElementRef;
  slidesData: SlidesData[] = [];
  slideTimeout: number = 3000;
  slidesList: HTMLElement[];
  i: number = 0;

  constructor(public _appService: AppService) {
    this.slidesData = this._appService.getSlideData();
    this.changleSlide.call(this, 0);
  }

  ngAfterViewInit() {
    // Set Slides

    // Slides
    const slides: HTMLElement[] = Array.from(
      this.slides.nativeElement.children
    );

    if (slides) {
      this.slidesList = slides;
    }

    // Set Position
    for (let [index, slide] of slides.entries()) {
      slide.style.left = 100 * index + "%";
    }
  }

  changleSlide(index: number) {
    // Start In Micro Task Queue After DOM INIT Slides
    Promise.resolve()
      .then(() => {
        this.slides.nativeElement.style.transform = `translate3d(${-100 *
          index}%, 0, 0)`;
        if (this.i >= this.slides.nativeElement.children.length - 1) {
          this.i = -1;
        }
        this.startSlide();
      })
      .catch(err => console.log(err));
  }

  startSlide() {
    setTimeout(() => {
      const self = this;
      this.i++;
      this.changleSlide.call(self, this.i);
      this._appService.changeSlide(this.i);
    }, this.slideTimeout);
  }
}
