import { Component, Input } from "@angular/core";
import { SlidesData } from "src/app/@types/interfaces";

@Component({
  selector: "app-slide-item",
  templateUrl: "./slide-item.component.html"
})
export class SlideItemComponent {
  // PROPS
  @Input("slide") slide: SlidesData;
  @Input("index") index: number;
  itemHeight: number;

  constructor() {
    this.itemHeight = 100 / 4;
  }
}
