import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-process',
  templateUrl: './process.page.html',
  styleUrls: ['./process.page.scss'],
})
export class ProcessPage implements OnInit {

  application;

  constructor(private route: ActivatedRoute, 
              private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.application = this.route.snapshot.data['application']
  }

  async showActionSheet(){
    await this.actionSheetController.create({
      header:'Actions',
      buttons:[
        {
          text: 'Stop Process',
          role: 'destructive',
          handler: () =>{
            console.log("Stop clicked")
          }
        },

        {
          text: 'Start Process',
          handler: () =>{
            console.log("Start clicked")
          }
        },

        {
          text: 'Process Status',
          handler: () =>{
            console.log("Status clicked")
          }
        },

        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(res => res.present());
  }
}
