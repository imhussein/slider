import { NgModule } from "@angular/core";
import { SliderComponent } from "../components/slider/slider.component";
import { SlideComponent } from "../components/slide/slide.component";
import { SlideItemComponent } from "../components/slide-item/slide-item.component";
import { SlidesListComponent } from "../components/slides-list/slides-list.component";
import { AppService } from "../services/app.service";
import { BrowserModule } from "@angular/platform-browser";
import { SlideContent } from "../components/slide-content/slide-content.component";

// Slider Module
@NgModule({
  declarations: [
    SliderComponent,
    SlideComponent,
    SlideItemComponent,
    SlidesListComponent,
    SlideContent
  ],
  imports: [BrowserModule],
  exports: [
    SlideComponent,
    SliderComponent,
    SlideItemComponent,
    SlidesListComponent,
    SlideContent
  ],
  providers: [AppService]
})
export class SliderModule {}
