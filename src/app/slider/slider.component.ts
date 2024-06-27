import {Component, OnInit} from "@angular/core";
import {SliderFrameComponent} from "./slider-frame/slider-frame.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Slide, SliderService} from "./slider.service";
import {Observable} from "rxjs";

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
export class SliderComponent implements OnInit {

  slides$!: Observable<Slide[]>
  currentSlide = 0

  constructor(private sliderService: SliderService) {
  }

  ngOnInit() {
    this.slides$ = this.sliderService.getBanners()
  }
}
