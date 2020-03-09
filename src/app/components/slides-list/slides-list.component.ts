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
  @ViewChild("list", { static: false }) list: ElementRef;

  constructor(public _appService: AppService) {
    this.slidesData = this._appService.getSlideData();
  }

  ngOnInit() {
    this._appService.getCurrentSlide().subscribe((index: number) => {
      this.currentIndex = index;
      this.value = this.currentIndex * -16.6667 + "rem";
      this.list.nativeElement.style.transform = `translate3d(0, ${this.value}, 0)`;
      this.list.nativeElement.children &&
        this.list.nativeElement.children[0]["children"][
          index == 0 ? index : index - 1
        ]["children"][0].classList.remove("active");
      this.list.nativeElement.children &&
        this.list.nativeElement.children[0]["children"][index][
          "children"
        ][0].classList.add("active");
    });
  }
}
