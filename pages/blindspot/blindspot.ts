
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';


export interface BlindspotData {occupied:boolean};


@Component({
  selector: 'page-blindspot',
  templateUrl: 'blindspot.html'
})
export class Blindspot{

 

  private oneTimeReadingsCollection: AngularFirestoreCollection<BlindspotData>;
  oneTimeReadings: Observable<BlindspotData[]>;

 
  leftside:boolean;
  rightside:boolean;


  constructor(public navCtrl: NavController,firestore: AngularFirestore) {
   
   this.leftside = false;
   this.rightside = false; 

    this.oneTimeReadingsCollection = firestore.collection<BlindspotData>('blindspot');
    this.oneTimeReadings = this.oneTimeReadingsCollection.valueChanges();
    this.oneTimeReadings.subscribe((data)=>{
      
        this.leftside = data[0].occupied;
        this.rightside = data[1].occupied;

    });

    

  }
  

}