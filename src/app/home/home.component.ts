import { Component, OnInit } from '@angular/core';
import { ChargingStationService } from '../services/charging-stations.service';
import { ChargingStation } from '../models/chargingStation.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private chargingStationService: ChargingStationService, private router: Router) {}
  ngOnInit(){
    this.loadChargingStations();
    console.log(this.operation);
  }


  allChargingStations: any
  filteredStations: any
  loadingStations: boolean = false
  operation: string = "none";
  currentStation: any = null;
  urlMaps: string = "https://www.google.com/maps/place/"
  searchTerm: string = '';
  stationDeleted: boolean = false;
  stationCreated: boolean = false;

  stationToEdit: ChargingStation ={
    name: '',
    stationLatitude: 0,
    stationLongitude: 0
  };

  chargingStationData: ChargingStation = {
    name: "",
    stationLatitude: 0,
    stationLongitude: 0,
  }


  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.chargingStationService.createChargingStation(this.chargingStationData).subscribe(
        response => {
          console.log('Dados enviados com sucesso:', response);
          form.resetForm();
          this.stationCreated = true;
          this.reloadPage()
        },
        error => {
          console.error('Erro ao enviar dados:', error);
        }
      );
    }

  }

  putForm(form: NgForm): void {
    console.log(this.currentStation);
    this.currentStation.name = this.chargingStationData.name
    this.currentStation.stationLatitude = this.chargingStationData.stationLatitude
    this.currentStation.stationLongitude = this.chargingStationData.stationLongitude
    if (form.valid) {
      this.chargingStationService.updateChargingStation(this.currentStation.id, this.currentStation).subscribe(
        response => {
          console.log('Dados enviados com sucesso:', response);
          form.resetForm();
          this.stationCreated = true;
          this.reloadPage()
        },
        error => {
          console.error('Erro ao enviar dados:', error);
        }
      );
    }

  }


  goToMaps(lat: string, long: string): void {
    window.open(this.urlMaps + lat + "," + long , "_blank");
  }

  changeOperation(op: string){
    this.operation = op
    this.currentStation = null
    console.log(this.operation);
  }

  editStation(station: ChargingStation){
    this.operation = 'editStation'
    this.stationToEdit = station;
  }

  chooseStation(station: any){
    this.currentStation = station
    this.operation = "none"
    console.log(this.currentStation)
  }

  deleteChargingStation(){
    this.chargingStationService.deleteChargingStation(this.currentStation.id)
    .subscribe(
      response => {
        this.stationDeleted = true;
        console.log('Estação elininada:', this.currentStation.name);
        this.reloadPage()
      },
      error => {
        console.error('Erro ao eliminar a estação de carregamento:', error);
      }
    );
  }


  searchStations() {
    if (!this.searchTerm.trim()) {
      this.filteredStations = this.allChargingStations;
    } else {
      this.filteredStations = this.allChargingStations.filter((station: { name: string; }) =>
        station.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  loadChargingStations() {
    this.loadingStations = true;
    this.chargingStationService.getChargingStations()
      .subscribe(
        (data) => {
          this.allChargingStations = data;
          this.loadingStations = false;
          this.searchStations();
          console.log('Estações de carregamento obtidas:');
        },
        (error) => {
          console.error('Erro ao obter estações de carregamento:', error);
        }
      );
  }

  reloadPage(){
    this.currentStation = null;
    this.filteredStations = null;
    this.searchTerm = "";
    this.loadChargingStations();
  }

  logout(){
    this.router.navigate(['/']);
  }

}
