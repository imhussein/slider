import { Component, Input } from "@angular/core";
import { SlidesData } from "src/app/@types/interfaces";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-slide-item",
  templateUrl: "./slide-item.component.html"
})
export class SlideItemComponent {
  // PROPS
  @Input("slide") slide: SlidesData;
  @Input("index") index: number;
  itemHeight: number;

  constructor(public _appService: AppService) {
    this.itemHeight = 100 / 4;
  }
}
