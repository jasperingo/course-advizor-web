import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'li[app-how-it-works]',
  template: `
    <div class="flex gap-2 items-start">
      <div class="bg-black text-white rounded-full px-2 py-0.5 text-sm border-2 border-blue-500">{{ number }}</div>
      <div class="text-lg">{{ text }}.</div>
    </div>
  `
})
export class HowItWorksComponent {

  @Input() number!: number;

  @Input() text!: string;

}

@Component({
  selector: 'li[app-home-feature]',
  template: `
    <div class="h-full shadow-lg bg-white rounded">
      <div class="bg-blue-500 rounded-tl rounded-tr">
        <img 
          alt="" 
          width="100" height="100" 
          src="/assets/images/{{ photo }}" 
          class="w-28 h-28 mx-auto rounded-full translate-y-4 border-4 border-blue-500 bg-blue-500" 
          />
      </div>
      <p class="py-12 bg-white px-2 text-center font-bold text-xl rounded-bl rounded-br">{{ text }}</p>
    </div>
  `,
  styles: [':host { @apply mb-4 md:mb-0 md:w-1/3; }']
})
export class HomeFeatureComponent {

  @Input() text!: string;

  @Input() photo!: string;

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  ivrNumber = environment.ivrNumber;

}
