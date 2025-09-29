import { Routes } from '@angular/router';
import { PredictComponent } from './pages/predict/predict.component';
import { MainComponent } from './pages/main/main.component';
import { HistoryComponent } from './pages/history/history.component';
import { HistoryDetailComponent } from './pages/history-detail/history-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'predict', component: PredictComponent },
    { path: 'main', component: MainComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'history-detail/:id', component: HistoryDetailComponent }
];
