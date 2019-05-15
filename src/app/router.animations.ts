import { trigger, transition, group, query, style, animate, animateChild } from '@angular/animations';

export class RouterAnimations {
  static routeSlide =
    trigger('routeSlide', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({transform: 'translate({{xEnter}}%, {{yEnter}}%)'}),
            animate('.5s ease-in-out', style({transform: 'translate(0%,0%)'}))
          ], {optional: true}),
          query(':leave', [
            style({transform: 'translate(0%, 0%)'}),
            animate('.5s ease-in-out', style({transform: 'translate({{xLeave}}%, {{yLeave}})'}))
          ], {optional: true}),
        ])
      ]),
    ]);

  static animRoutes =
    trigger('animRoutes', [
        transition('* <=> *', [
        group([
            query(
            ':enter',
            [
                style({
                opacity: 0,
                transform: 'translateY(9rem) rotate(-180deg)'
                }),
                animate(
                '0.35s cubic-bezier(0, 1.8, 1, 1.8)',
                style({ opacity: 1, transform: 'translateY(0) rotate(0)' })
                ),
                animateChild()
            ],
            { optional: true }
            ),
            query(
            ':leave',
            [animate('0.35s', style({ opacity: 0 })), animateChild()],
            { optional: true }
            )
        ])
        ])
    ]);
}
