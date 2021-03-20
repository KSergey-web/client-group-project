import { Component } from '@angular/core';
import { PlayService } from './services/play.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Roulet';
  
  
  constructor() { }
}
