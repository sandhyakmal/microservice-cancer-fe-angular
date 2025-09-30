import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../enviroment/enviroment';
import { History } from '../../models/history';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './history-detail.component.html',
  styleUrl: './history-detail.component.scss'
})
export class HistoryDetailComponent {

  history: History = {
    id: 0,
    name: '',
    age: 0,
    image: '',
    imagePath: '',
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

    this.http.get<History>(`${environment.apiUrl}/history-detail/${id}`)
      .subscribe(data => {
        this.history = data;
        console.log("Detail History:", data);
      });
  }

  
  getImageUrl(imageUrl: string): string {
    return `${environment.fileUrl}/${imageUrl}`;
  }

}
