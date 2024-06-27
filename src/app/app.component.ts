import { Component } from '@angular/core';
import {SliderComponent} from "./slider/slider.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    SliderComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TestSlider';
}
