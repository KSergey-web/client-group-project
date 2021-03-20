import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as io from 'socket.io-client';
import { colorEnum } from '../enums/rate.enum';
import { ACCESS_TOKEN_KEY} from './auth.service';
import { RateDTO, ResultEntity, SomeBodyRateEntity } from './interfaces/rate.interfaces';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  private socket: SocketIOClient.Socket;

  constructor(
    private router:Router,
    private userService: UserService
  ) { 
    this.socket=io('http://localhost:4000');
    this.authEvent();
    this.resultRateEvent();
    this.someBodyRateEvent();
  }

  authEvent(){
    this.socket.on('errorAuth', (err : any) => {
      alert(err.message);
      this.router.navigate(['auth']);
    });
    this.socket.emit('auth', { token: localStorage.getItem(ACCESS_TOKEN_KEY)});
  }

  enterRoomEvent(roomId: string){
    this.socket.emit('enterRoom', { id: roomId});
  }

  leaveRoomEvent(roomId: string){
    this.socket.emit('leaveRoom', { id: roomId});
  }

  resultObservable!:Observable<ResultEntity>;

  private resultRateEvent():void {
    this.resultObservable =  new Observable((observer:any) => {
      this.socket.on('resultRate',(result:ResultEntity) => {
        observer.next(result);
      });
    });
  }

  getObsResult():Observable<ResultEntity>{
    return this.resultObservable;
  }

  rateEvent(color: string, roomId: string){
    const rate: RateDTO= {
      color: color,
      user: this.userService.getCurrentUserId(),
      login: this.userService.getCurrentUserLogin(),
      room: roomId
    }
    console.warn(rate);
    this.socket.emit("rate",rate);
  }

  private someBodyRateEvent():void {
    this.rateObservable =  new Observable((observer:any) => {
      this.socket.on('someBodyRate',(rate :SomeBodyRateEntity) => {
        observer.next(rate);
      });
    });
  }

  rateObservable!:Observable<SomeBodyRateEntity>;

  getObsRate():Observable<SomeBodyRateEntity>{
    return this.rateObservable;
  }
}