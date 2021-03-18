import { Component, OnInit } from '@angular/core';
import { CURRENT_USER_ID } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
}
