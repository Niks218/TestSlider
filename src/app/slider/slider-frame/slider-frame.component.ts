import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {NgOptimizedImage, NgStyle} from "@angular/common";
import {Slide} from "../slider.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  standalone: true,
  selector: 'app-slider-frame',
  templateUrl: './slider-frame.component.html',
  styleUrl: './slider-frame.component.css',
  imports: [
    NgOptimizedImage,
    NgStyle
  ],
  encapsulation: ViewEncapsulation.None
})
export class SliderFrameComponent implements OnInit{
  @Input({required: true, transform}) slide!: Slide;
  sliderText: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.sliderText = this.sanitizer.bypassSecurityTrustHtml(this.slide.text)
  }
}

// should be some proper translation library
function transform(slide: Slide): Slide {
  slide.text = slide.text.replace(/<\d+>(.*?)<\/\d+>/, `<span>${slide.reward}</span>`)
  return slide;
}
