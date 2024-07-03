import {Component, OnInit, AfterViewInit, ElementRef, signal, effect} from "@angular/core";
import {SliderFrameComponent} from "./slider-frame/slider-frame.component";
import {NgForOf, NgIf} from "@angular/common";
import {Slide, SliderService} from "./slider.service";
import {interval, Subscription} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-slider',
  imports: [
    SliderFrameComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: 'slider.component.html',
  styleUrl: './slider.component.css',
  host: {
    '(touchstart)': 'onSwipe()',
    '(scrollend)': 'onScroll($event)'
  }
})
export class SliderComponent implements OnInit, AfterViewInit {
  private isUserSwiped = signal(false);
  private intervalSubscription: Subscription | undefined;
  slides?: Slide[]

  constructor(private sliderService: SliderService, private el: ElementRef<HTMLDivElement>) {
    effect(() => {
      if (this.isUserSwiped()) {
        this.intervalSubscription?.unsubscribe()
      }
    });
  }

  ngOnInit() {
    this.sliderService.getBanners().subscribe(data => this.slides = data)
  }

  ngAfterViewInit() {
    if (this.isUserSwiped()) {
      return;
    }
    this.intervalSubscription = interval(10_000).subscribe(() => {
      const slider = this.el.nativeElement;

      slider.scrollBy({left: slider.clientWidth, behavior: "smooth"})
    })
  }

  onSwipe() {
    this.isUserSwiped.set(true)
  }

  onScroll(event: Event) {
    if (event.target instanceof Element) {
      if (event.target.scrollLeft == event.target.scrollWidth - event.target.clientWidth) {

        const firstSlide = this.slides?.shift();
        if (firstSlide) {
          this.slides?.push(firstSlide)
        }

        event.target.scrollBy({left: -event.target.clientWidth, behavior: "instant"})
      } else if (event.target.scrollLeft === 0) {

        const lastSlide = this.slides?.pop();
        if (lastSlide) {
          this.slides?.unshift(lastSlide)
        }

        event.target.scrollBy({left: event.target.clientWidth, behavior: "instant"})
      }
    }
  }
}
