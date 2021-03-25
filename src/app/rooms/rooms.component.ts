import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RoomEntity } from '../services/interfaces/room.interface';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  nameRoom = new FormControl('');

  rooms: Array<RoomEntity> = []; 

  observableRooms!: Observable<Array<RoomEntity>>;
  constructor(
    private roomService: RoomService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.observableRooms = this.roomService.getRooms();
    this.observableRooms.subscribe(rooms => {this.rooms = rooms});
  }

  createRoom(): void{
    let str = this.nameRoom.value
    if (str.trim() == '') {
      alert("Введите название комнаты.");
      return;
    }
    this.roomService.createRoom(this.nameRoom.value).subscribe(room => this.rooms.push(room));
  }

  deleteRoom(): void{
    if (!this.selectedRoom) {
      alert("Комната не выбрана");
      return;
    }
    this.roomService.deleteRoom(this.selectedRoom).subscribe(room => {
      const ind = this.rooms.indexOf(room);
      this.rooms.splice(ind,1);
    }, err => alert("Вы не являетесь создателем этой комнаты"));
  }

  selectedRoom?: RoomEntity;
  onSelect(room: RoomEntity): void {
    this.selectedRoom = room;
  }

  enterRoom(room: RoomEntity){
    this.router.navigate(['play',room._id]);
  } 
}
