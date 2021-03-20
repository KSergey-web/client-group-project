import { Component, OnInit } from '@angular/core';
import { NoteEntity } from '../services/interfaces/statistic.interface';
import { StatisticService } from '../services/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  notes: Array<NoteEntity> = []; 

  constructor(
    private statisticService:StatisticService
  ) { }

  ngOnInit(): void {
    this.statisticService.getNotes().subscribe(notes => {this.notes = notes});
  }
}
