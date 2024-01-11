import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargingStation } from '../models/chargingStation.model';

@Injectable({
  providedIn: 'root'
})
export class ChargingStationService {
  private baseUrl = 'https://lds13.azurewebsites.net';

  constructor(private http: HttpClient) {}


  getChargingStations(){
    return this.http.get(`${this.baseUrl}/ChargingStation`)
  }

  createChargingStation(chargingStationData: ChargingStation): Observable<any> {
    return this.http.post(`${this.baseUrl}/ChargingStation/ChargingStation`, chargingStationData);
  }

  deleteChargingStation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ChargingStation/${id}`);
  }

  updateChargingStation(id: number, chargingStationData: any): Observable<any> {
    console.log(chargingStationData);
    return this.http.put(`${this.baseUrl}/ChargingStation/${id}`, chargingStationData);
  }

  login(model: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Auth/login`, model);
  }

  async saveUserIdToStorage(token: string): Promise<void> {
    try {
      localStorage.setItem("token", token);
    } catch (error) {
      console.error('Erro ao salvar token no armazenamento local:', error);
    }
  }

}
