import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { colorEnum } from '../enums/rate.enum';
import { SomeBodyRateEntity } from '../services/interfaces/rate.interfaces';
import { PlayService } from '../services/play.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  roomId: string = "";

  subscriptionResult!: Subscription | null;
  subscriptionRate!: Subscription | null;

  rates: Array<SomeBodyRateEntity> = [];

  result?: colorEnum;

  timeLeft: number = 10;

  interval:any;

  startTimer() {
    clearInterval(this.interval);
    this.timeLeft = 10;
    this.interval = setInterval(() => {
      if(this.timeLeft == 1) {
        this.result = colorEnum.noColor;
      }
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 10;
        clearInterval(this.interval);
      }
    },1000)
  }

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

   rate(color: string){
    this.playService.rateEvent(color,this.roomId);
   }

  ngOnInit(): void {
    this.playService.authEvent();
    this.playService.enterRoomEvent(this.roomId);
    this.subscriptionResult = this.playService.getObsResult().subscribe(res => {
      this.result = res.color;
      this.rates.splice(0,this.rates.length);
      this.startTimer();
    });
    this.subscriptionRate = this.playService.getObsRate().subscribe(res => this.rates.push(res));
  }

  ngOnDestroy(): void{
    this.playService.leaveRoomEvent(this.roomId);
    this.subscriptionResult!.unsubscribe();
    this.subscriptionResult = null;
    this.subscriptionRate!.unsubscribe();
    this.subscriptionRate = null;
  }

}
