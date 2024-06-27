import {Component, Input} from "@angular/core";
import {Slide} from "../slider.component";
import {NgOptimizedImage, NgStyle} from "@angular/common";

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
