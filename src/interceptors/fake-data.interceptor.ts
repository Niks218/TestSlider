import {HttpHandlerFn, HttpRequest, HttpResponse} from "@angular/common/http";
import {delay, of} from "rxjs";

export default function fakeDataInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  if (req.url === '/banners') {
    return of(new HttpResponse({
      status: 200,
      body: [{
        title: 'WinzUp Loyalty Program',
        text: 'Get up to 35% in rewards: daily rakeback, weekly cashback and level-up bonuses',
        images: {
          background: 'assets/winzup-bg.webp',
          foreground: 'assets/winzup.png'
        }
      }, {
        title: 'Valentine\'s Fortune Drops',
        text: 'Trigger random prizes and win a share of €30,000!',
        images: {
          background: 'assets/valentines-bg.png',
          foreground: 'assets/valentines.png'
        }
      }, {
        title: 'Wheel of Winz',
        text: 'Spin the wheel to win up to €15,000 weekly',
        images: {
          background: 'assets/wheel-bg.webp',
          foreground: 'assets/wheel.png'
        }
      }]
    })).pipe(delay(500))
  }

  return next(req)
}
