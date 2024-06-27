import {Component, OnInit, AfterViewInit, ElementRef} from "@angular/core";
import {SliderFrameComponent} from "./slider-frame/slider-frame.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Slide, SliderService} from "./slider.service";
import {interval, Observable} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-slider',
  imports: [
    SliderFrameComponent,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: 'slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit, AfterViewInit {

  slides$!: Observable<Slide[]>

  constructor(private sliderService: SliderService, private el: ElementRef<HTMLDivElement>) {
  }

  ngOnInit() {
    this.slides$ = this.sliderService.getBanners()
  }

  ngAfterViewInit() {
    interval(10_000).subscribe(() => {
      const slider = this.el.nativeElement;

      if (slider.scrollLeft == slider.scrollWidth - slider.clientWidth) {
        slider.scrollTo({left: 0, behavior: "smooth"})
      } else {
        slider.scrollBy({left: slider.clientWidth, behavior: "smooth"})
      }
    })
  }
}
