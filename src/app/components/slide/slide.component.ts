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
export class SlideComponent implements AfterViewInit, OnInit {
  // PROPS
  @ViewChild("slides", { static: false }) slides: ElementRef;
  slidesData: SlidesData[] = [];
  slideTimeout: number = 9000;
  slidesList: HTMLElement[];
  i: number = 0;
  r: number = 27;
  PI: number = 2 * Math.PI * this.r;
  index = 0;
  timeout: any;
  currentSlide: number;
  @ViewChild("pagination", { static: false }) pagination: ElementRef;
  @ViewChild("controls", { static: false }) controls: ElementRef;

  constructor(public _appService: AppService) {
    this.slidesData = this._appService.getSlideData();
    this.changleSlide.call(this, 0);
  }

  ngAfterViewInit() {
    // Slides
    const slides: HTMLElement[] = Array.from(
      this.slides.nativeElement.children
    );
    const self = this;

    // Check For Slides
    if (slides) {
      this.slidesList = slides;
    }

    // Set Position
    for (let [index, slide] of slides.entries()) {
      slide.style.left = 100 * index + "%";
    }

    // IF DOM Initialize Controlls
    if (this.controls) {
      const svgs = this.controls.nativeElement.querySelectorAll("svg");
      svgs.forEach(svg => {
        // Mouseenter Event
        svg.addEventListener("mouseenter", function(e) {
          if (self.index <= self.PI) {
            self.animate(this);
          }
        });

        // Mouse Leave Event
        svg.addEventListener("mouseleave", function(e) {
          if (self.index > 0) {
            self.reset(this);
          }
        });
      });
    }
  }

  // After Component Init
  ngOnInit() {
    // Reset Active Class
    this._appService.getCurrentSlide().subscribe((res: number) => {
      [...this.pagination.nativeElement.children].forEach(
        (element: HTMLElement) => {
          element.classList.remove("active");
        }
      );

      // Add Active Class To Current Pagination Based On Current Slide
      this.pagination.nativeElement.children[res].classList.add("active");
    });
  }

  // Slide
  slide(index) {
    this.slides.nativeElement.style.transform = `translate3d(${-100 *
      index}%, 0, 0)`;
  }

  // On Pgaination Click
  onPaginationClick(index) {
    this.i = index - 1;
    this._appService.changeSlide(index);
    this.slide(index);
  }

  // Previous Slide
  prevSlide() {
    this.i <= 0 ? (this.i = this.slidesData.length - 1) : (this.i -= 1);
    this.slide(this.i);
    this._appService.changeSlide(this.i);
  }

  // Next Slide
  nextSlide() {
    this.i === this.slidesData.length - 1 ? (this.i = 0) : (this.i += 1);
    this.slide(this.i);
    this._appService.changeSlide(this.i);
  }

  // Animate SVG Controlls
  animate(self) {
    this.timeout = setTimeout(() => {
      this.index++;
      self.children[0].setAttribute("stroke-dashoffset", this.index);
      if (this.index <= this.PI) {
        this.animate(self);
      }
    }, 5);
  }

  // Reset SVG Stroke Offset
  reset(self) {
    this.index = 0;
    window.clearTimeout(this.timeout);
    self.children[0].setAttribute("stroke-dashoffset", this.index);
  }

  // Change Slide
  changleSlide(index: number) {
    // Start In Micro Task Queue After DOM INIT Slides
    Promise.resolve()
      .then(() => {
        this.slide(index);
        if (this.i >= this.slides.nativeElement.children.length - 1) {
          this.i = -1;
        }
        this.startSlide();
      })
      .catch(err => console.log(err));
  }

  // Start Slide
  startSlide() {
    setTimeout(() => {
      const self = this;
      this.i++;
      this.changleSlide.call(self, this.i);
      this._appService.changeSlide(this.i);
    }, this.slideTimeout);
  }
}
