import {Component, Input} from "@angular/core";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {Slide} from "../slider.service";

@Component({
  standalone: true,
  selector: 'app-slider-frame',
  templateUrl: './slider-frame.component.html',
  styleUrl: './slider-frame.component.css',
  imports: [
    NgOptimizedImage,
    NgStyle
  ]
})
export class SliderFrameComponent {
  @Input({required: true}) slide!: Slide;
}
