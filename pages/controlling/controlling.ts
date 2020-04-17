import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';


export interface Control { id:string; type: string; value: number; name:string }



@Component({
  selector: 'page-controlling',
  templateUrl: 'controlling.html'
})
export class Controlling {

  controls: Observable<Control[]>;
  led1:boolean;
  led2:boolean;
  event1:boolean;
  event2:boolean;
  event3:boolean;
  motor1:number;
  angle1:number;

  private controlCollection: AngularFirestoreCollection<Control>;
  constructor(public navCtrl: NavController,firestore: AngularFirestore) {

    this.controlCollection = firestore.collection<Control>('controls');
    this.controls = this.controlCollection.valueChanges();
    this.controls.subscribe((data)=>{
     
      this.angle1 = data[0].value;
      this.event1 = data[1].value;
      this.event2 = data[2].value;
      this.event3 = data[3].value;
      this.led1 = data[4].value;
      this.led2 = data[5].value;
      this.motor1 = data[6].value;
    });

    this.led1 = false;
    this.led2 = false;
    this.event1 = false;
    this.event2 = false;
    this.event3 = false; 
    this.motor1 = 50;
    this.angle1 = 50; 

  }
  raiseEvent1(){
    this.controlCollection.doc("event1").update({value:true});
    setTimeout(()=>{ 
      this.controlCollection.doc("event1").update({value:false});
     }, 3000);
     
  }

  raiseEvent2(){
    this.controlCollection.doc("event2").update({value:true});
    setTimeout(()=>{ 
      this.controlCollection.doc("event2").update({value:false});
     }, 3000);  
  }

  raiseEvent3(){
    this.controlCollection.doc("event3").update({value:true});
    setTimeout(()=>{ 
      this.controlCollection.doc("event3").update({value:false});
     }, 3000); 
  }


  motor1Changed(){
    this.controlCollection.doc("motor1").update({value:this.motor1});
  }
  angle1Changed(){
    this.controlCollection.doc("angle1").update({value:this.angle1});
  }
  led1Changed(){
    this.controlCollection.doc("led1").update({value:this.led1});
  }
  led2Changed(){
    this.controlCollection.doc("led2").update({value:this.led2});
  }
}
