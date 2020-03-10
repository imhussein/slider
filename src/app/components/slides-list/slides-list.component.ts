import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { SlidesData } from "src/app/@types/interfaces";
import { Subscription } from "rxjs";

@Component({
  selector: "app-slides-list",
  templateUrl: "./slides-list.component.html"
})
export class SlidesListComponent implements OnInit {
  slidesData: SlidesData[];
  currentIndex: number;
  currentIndexSub: Subscription;
  value: string;
  height: number;
  @ViewChild("list", { static: false }) list: ElementRef;

  constructor(public _appService: AppService) {
    this.slidesData = this._appService.getSlideData();
  }

  ngOnInit() {
    // Change Slide
    this._appService.getCurrentSlide().subscribe((index: number) => {
      this.currentIndex = index;
      this.value = this.currentIndex * -(100 / 5) + "%";
      const slides: SlidesData[] = this._appService.getSlideData();

      // Check If The Current Index is The Start Of The Last 5 indexes of the slides
      if (this.currentIndex <= slides.length - 5) {
        this.list.nativeElement.children[0].style.transform = `translate3d(0, ${this.value}, 0)`;
      }

      // If Current Index is the first slide
      // Remove Transtion
      if (this.currentIndex === 0) {
        this.list.nativeElement.children[0].style.transition = "none";
      } else {
        this.list.nativeElement.children[0].style.transition =
          "transform 0.6s cubic-bezier(1, 0, 0, 1)";
      }

      // Add Class Active To Current Slide
      const element =
        this.list.nativeElement.children &&
        this.list.nativeElement.children[0]["children"];

      // Reset Active Class
      const elements = [];
      [...element].forEach((element: HTMLElement, index: number) => {
        element.children[0].classList.remove("active");
      });

      // Add Class Active
      this.list.nativeElement.children &&
        this.list.nativeElement.children[0]["children"][index][
          "children"
        ][0].classList.add("active");
    });
  }
}
