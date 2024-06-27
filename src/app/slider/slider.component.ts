import {Component, OnDestroy, OnInit, signal, AfterViewInit, ElementRef} from "@angular/core";
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
export class SliderComponent implements OnInit, OnDestroy, AfterViewInit {

  slides$!: Observable<Slide[]>
  readonly currentSlide = signal(0)
  readonly interval = setInterval(() => this.currentSlide.update(currentValue => currentValue + 1), 10_000)

  constructor(private sliderService: SliderService, private el: ElementRef<HTMLDivElement>) {
  }

  ngOnInit() {
    this.slides$ = this.sliderService.getBanners()
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngAfterViewInit() {
    interval(10_000).subscribe(() => {
      const slider = this.el.nativeElement.firstElementChild;

      if (!slider) {
        return
      }

      if (slider.scrollLeft == slider.scrollWidth - slider.clientWidth) {
        slider.scrollTo({left: 0, behavior: "smooth"})
      } else {
        slider.scrollBy({left: slider.clientWidth, behavior: "smooth"})
      }
    })
  }
}
