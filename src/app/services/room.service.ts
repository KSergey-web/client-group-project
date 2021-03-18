import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../app-injection-tokens';
import { RoomEntity } from './interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl:string,
    ) { 
  } 

  getRooms(): Observable<Array<RoomEntity>>{
    return this.http.get<Array<RoomEntity>>(`${this.apiUrl}/v1/api/room/all`);
  }

  createRoom(name: string): Observable<RoomEntity>{
    return this.http.post<RoomEntity>(`${this.apiUrl}/v1/api/room/`, {name});
  }

  deleteRoom(room: RoomEntity): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/v1/api/room/${room._id}`).pipe(map(() => room));
  }
}
