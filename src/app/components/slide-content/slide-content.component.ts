import { Component, Input } from "@angular/core";
import { SlidesData } from "src/app/@types/interfaces";

@Component({
  selector: "app-slide-content",
  templateUrl: "./slide-content.component.html"
})
export class SlideContent {
  // PROPS
  @Input("slide") slide: SlidesData;
  @Input("index") index: number;
}
