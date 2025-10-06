import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { environment } from '../../../enviroment/enviroment';
import { PredictResponse } from '../../models/predict-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-predict',
  standalone: true,
  imports: [FormsModule, CommonModule],      
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.scss'
})
export class PredictComponent {

  formData: any = {
    name: '',
    age: null,
    imageDate: '',
    file: null
  };

  result: any = {
    predictedClass: '',
    confidence: '',
    probCancer: '',
    probNonCancer: ''
  }

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      name: '',
      age: '',
      imageDate: '',
      file: null,
    };

    this.result = {
      predictedClass: '',
      confidence: '',
      probCancer: '',
      probNonCancer: ''
    }
  }


  onFileSelected(event: any) {
    this.formData.file = event.target.files[0];
    console.log('File selected:', this.formData.file);
  }

  private formatTanggal(dateString: string): string {
    const dateObj = new Date(dateString);
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }

  onSubmit() {
    const uploadData = new FormData();
    uploadData.append('name', this.formData.name);
    uploadData.append('age', this.formData.age);
    if (this.formData.imageDate) {
      uploadData.append('imageDate', this.formatTanggal(this.formData.imageDate));
    }
    if (this.formData.file) {
      uploadData.append('file', this.formData.file);
    }

    console.log('Submitting form with data:', this.formData);

    // this.result = this.formData;
   
    this.http.post<PredictResponse>(`${environment.apiUrl}/v2/predict`, uploadData).subscribe({
      next: (res) => {
        console.log('API Response:', res);

        if (res.status === 'Success' && res.data) {
          // mapping hasil prediksi ke result
          this.result.predictedClass = res.data.predicted_class;
          this.result.confidence = res.data.confidence;
          this.result.probCancer = res.data.probabilities.Cancer;
          this.result.probNonCancer = res.data.probabilities['Non-Cancer'];
        } else {
          // handle kalau status Error tapi gak dilempar ke error handler
          alert(`Gagal: ${res.message}`);
        }

        console.log('Result set to:', this.result);
      },
        error: (err) => {
        console.error('Error:', err);

        // Jika server memang mengirim pesan error seperti di contohmu
        if (err.status === 400 && err.error && err.error.message) {
          alert(`Gagal: ${err.error.message}`);
        } 
        // fallback jika error tidak dalam format yang diharapkan
        else if (err.error?.message) {
          alert(`Gagal: ${err.error.message}`);
        } else {
          alert('Terjadi kesalahan saat mengirim data.');
        }
      }
    });
  }
  
}
