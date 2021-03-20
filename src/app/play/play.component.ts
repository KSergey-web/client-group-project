import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayService } from '../services/play.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  roomId: string = "";

  subscription!: Subscription;

  constructor( 
    private playService: PlayService, 
    private activateRoute: ActivatedRoute
    ) {
      activateRoute.params.subscribe(params=>{
      this.roomId=params['id'];
  }, err =>{ 
      console.error(err);
    });
   }

  ngOnInit(): void {
    this.playService.authEvent();
    this.playService.enterRoomEvent(this.roomId);
    this.subscription = this.playService.getSubResult().subscribe(res => alert(res.color));
  }

  ngOnDestroy(): void{
    this.playService.leaveRoomEvent(this.roomId);
    this.subscription.unsubscribe();
  }

}
