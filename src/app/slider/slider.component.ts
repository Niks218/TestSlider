import {Component, OnInit, AfterViewInit, ElementRef, HostListener, signal, effect} from "@angular/core";
import {SliderFrameComponent} from "./slider-frame/slider-frame.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Slide, SliderService} from "./slider.service";
import {interval, Observable, Subscription} from "rxjs";

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
  private isUserSwiped = signal(false);
  private intervalSubscription: Subscription | undefined;
  slides$!: Observable<Slide[]>

  constructor(private sliderService: SliderService, private el: ElementRef<HTMLDivElement>) {
    effect(() => {
      if (this.isUserSwiped()) {
        this.intervalSubscription?.unsubscribe()
      }
    });
  }

  ngOnInit() {
    this.slides$ = this.sliderService.getBanners()
  }

  ngAfterViewInit() {
    if (this.isUserSwiped()) {
      return;
    }
    this.intervalSubscription = interval(10_000).subscribe(() => {
      const slider = this.el.nativeElement;

      if (slider.scrollLeft == slider.scrollWidth - slider.clientWidth) {
        slider.scrollTo({left: 0, behavior: "smooth"})
      } else {
        slider.scrollBy({left: slider.clientWidth, behavior: "smooth"})
      }
    })
  }

  @HostListener('touchstart')
  onSwipe() {
    this.isUserSwiped.set(true)
  }
}
