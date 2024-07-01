import {HttpHandlerFn, HttpRequest, HttpResponse} from "@angular/common/http";
import {delay, of} from "rxjs";
import {Slide} from "../app/slider/slider.service";

export default function fakeDataInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  if (req.url === '/banners') {
    return of(new HttpResponse<Slide[]>({
      status: 200,
      body: [{
        title: 'WinzUp Loyalty Program',
        text: 'Get up to <0></0>: daily rakeback, weekly cashback and level-up bonuses',
        reward: '35% in rewards',
        images: {
          background: 'assets/winzup-bg.webp',
          foreground: 'assets/winzup.png'
        }
      }, {
        title: 'Valentine\'s Fortune Drops',
        text: 'Trigger random prizes and win a share of <0></0>!',
        reward: '€30,000',
        images: {
          background: 'assets/valentines-bg.png',
          foreground: 'assets/valentines.png'
        }
      }, {
        title: 'Wheel of Winz',
        text: 'Spin the wheel to win up to <0></0> weekly',
        reward: '€15,000',
        images: {
          background: 'assets/wheel-bg.webp',
          foreground: 'assets/wheel.png'
        }
      }]
    })).pipe(delay(500))
  }

  return next(req)
}
