import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  img = [
    {
      name: "img1",
    }, {
      name: "img2",
    }, {
      name: "img3",
    }, {
      name: "img4",
    }, {
      name: "img5",
    }
  ]

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    allowTouchMove: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    breakpoints: {
      300: {
        slidesPerView: 1
      }
    },
    loop: true
  };

}
