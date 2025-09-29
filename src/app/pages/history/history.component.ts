import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../enviroment/enviroment';
import { isPlatformBrowser, NgFor } from '@angular/common';
import { History } from '../../models/history';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ NgFor, RouterModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  history: History[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
  this.http.get<any[]>(`${environment.apiUrl}/history`)
    .subscribe(data => {
      this.history = data;
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const table = document.querySelector('#table-1');
        if (table) {
          (window as any).$('#table-1').DataTable();
        }
      }, 100);
    }
  }

  showDetail(item: any) {
    // misalnya mau console log dulu
    console.log("Detail data:", item);

    // kalau mau buka modal / halaman baru:
    // this.router.navigate(['/detail', item.id]);   <-- jika ada routing
  }


  
  
}
