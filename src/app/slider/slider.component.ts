import {Component} from "@angular/core";
import {SliderFrameComponent} from "./slider-frame/slider-frame.component";
import {NgForOf} from "@angular/common";

export interface Slide {
  title: string;
  text: string;
  images: {
    background: string;
    foreground: string;
  }
}

@Component({
  standalone: true,
  selector: 'app-slider',
  imports: [
    SliderFrameComponent,
    NgForOf
  ],
  templateUrl: 'slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  slides: Slide[] = [{
    title: 'WinzUp Loyalty Program',
    text: 'Get up to 35% in rewards: daily rakeback, weekly cashback and level-up bonuses',
    images: {
      background: 'assets/winzup-bg.webp',
      foreground: 'assets/winzup.png'
    }
  },{
    title: 'Valentine\'s Fortune Drops',
    text: 'Trigger random prizes and win a share of €30,000!',
    images: {
      background: 'assets/valentines-bg.png',
      foreground: 'assets/valentines.png'
    }
  },{
    title: 'Wheel of Winz',
    text: 'Spin the wheel to win up to €15,000 weekly',
    images: {
      background: 'assets/wheel-bg.webp',
      foreground: 'assets/wheel.png'
    }
  }]

  currentSlide = 0

  back() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  forward() {
    this.currentSlide = (this.currentSlide - 1) % this.slides.length;
  }
}
