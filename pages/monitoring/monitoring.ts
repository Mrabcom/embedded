
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';


export interface Reading {
  timestamp: Date; 
  value: number; 
  name:string, 
  type:string
  };


@Component({
  selector: 'page-monitoring',
  templateUrl: 'monitoring.html'
})
export class Monitoring{

  @ViewChild("lineCanvas") lineCanvas: ElementRef;

  private lineChart: Chart;

  private oneTimeReadingsCollection: AngularFirestoreCollection<Reading>;
  oneTimeReadings: Observable<Reading[]>;

  private overTime1ReadingsCollection: AngularFirestoreCollection<Reading>;
  overTimeReadings: Observable<Reading[]>;

  localReadings:Reading[];
  
  overTime1Timestamps:string[];
  overTime1Values:number[];  
  
  oneTime1Name:string;
  oneTime1Value:number;
  oneTime1Units:string;

  oneTime2Name:string;
  oneTime2Value:number; 
  oneTime2Units:string;

  oneTime3Name:string;
  oneTime3Value:number;
  oneTime3Units:string; 

  constructor(public navCtrl: NavController,firestore: AngularFirestore) {
   
    this.overTime1Values = [];
    this.overTime1Timestamps = [];

    this.oneTime1Name = "";
    this.oneTime1Value = 0;
    this.oneTime1Units = "";

    this.oneTime2Name = "";
    this.oneTime2Value = 0;
    this.oneTime2Units = "";

    this.oneTime3Name = "";
    this.oneTime3Value = 0;
    this.oneTime3Units = "";

    this.oneTimeReadingsCollection = firestore.collection<Reading>('readings');
    this.oneTimeReadings = this.oneTimeReadingsCollection.valueChanges();
    this.oneTimeReadings.subscribe((data)=>{
      
        this.oneTime1Name = data[0].name;
        this.oneTime1Value = data[0].value;
        this.oneTime1Units = data[0].units;

        this.oneTime2Name = data[1].name;
        this.oneTime2Value = data[1].value;
        this.oneTime2Units = data[1].units;

        this.oneTime3Name = data[2].name;
        this.oneTime3Value = data[2].value;
        this.oneTime3Units = data[2].units;

    });

    this.overTime1ReadingsCollection = firestore.collection<Reading>('readings/overTime1/readings');
    this.overTimeReadings = this.overTime1ReadingsCollection.valueChanges();
    this.overTimeReadings.subscribe((data)=>{
       this.overTime1Timestamps = [];
       this.overTime1Values = [];
       this.extractValuesTimeStamps(data);
    });
  

  }
  extractValuesTimeStamps(data){
          for (let i = 0 ; i < data.length; i++)
          {
            this.overTime1Values.push(data[i].value);
            this.overTime1Timestamps.push(data[i].timestamp.toDate().getSeconds().toString())
            this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: "line",
            data: {
            labels: this.overTime1Timestamps,
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.overTime1Values,
                    spanGaps: false
                }
              ]
            }
            });
          } 
  }

  getMotionString():string{
    if (this.oneTime3Value)
      return "Detected";
    else
      return "Undetected";
  }

}