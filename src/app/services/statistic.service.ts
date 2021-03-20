import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app-injection-tokens';
import { RoomEntity } from './interfaces/room.interface';
import { NoteEntity } from './interfaces/statistic.interface';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl:string,
    ) { 
  } 

  getNotes(): Observable<Array<NoteEntity>>{
    return this.http.get<Array<NoteEntity>>(`${this.apiUrl}/v1/api/note/all`);
  }
}
