import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../enviroment/enviroment';
import { History } from '../../models/history';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  imports: [],
  templateUrl: './history-detail.component.html',
  styleUrl: './history-detail.component.scss'
})
export class HistoryDetailComponent {

  history: History = {
    id: 0,
    name: '',
    age: 0,
    image: '',
    result: '',
    confidence: 0,
    cancerProbability: 0,
    nonCancerProbability: 0,
    dateInput: '',
    imageDate: ''
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<History>(`${environment.apiUrl}/history/${id}`)
      .subscribe(data => {
        this.history = data;
        console.log("Detail History:", data);
      });
  }

}
