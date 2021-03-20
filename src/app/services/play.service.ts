import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as io from 'socket.io-client';
import { ACCESS_TOKEN_KEY } from './auth.service';
import { ResultEntity } from './interfaces/rate.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
  private socket: SocketIOClient.Socket;

  constructor(
    private router:Router
  ) { 
    this.socket=io('http://localhost:4000');
    this.authEvent();
    this.resultRateEvent();
    console.log('Service start');
  }

  authEvent(){
    this.socket.on('errorAuth', (err : any) => {
      alert(err.message);
      this.router.navigate(['rooms']);
    });
    this.socket.emit('auth', { token: localStorage.getItem(ACCESS_TOKEN_KEY)});
  }

  enterRoomEvent(roomId: string){
    this.socket.emit('enterRoom', { id: roomId});
  }

  leaveRoomEvent(roomId: string){
    this.socket.emit('leaveRoom', { id: roomId});
  }

  emit(event:string, data:any){
    this.socket.emit(event,data);
  }

  resultObservable!:Observable<ResultEntity>;

  resultRateEvent():void{
    this.resultObservable = Observable.create((observer:any) => {
      this.socket.on('resultRate',(result:ResultEntity) => {
        console.log(result);
        observer.next(result);
      });
    });
  }

  getSubResult():Observable<ResultEntity>{
    return this.resultObservable;
  }
}