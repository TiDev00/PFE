import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopOverComponent } from '../pop-over/pop-over.component';


@Component({
  selector: 'app-process',
  templateUrl: './process.page.html',
  styleUrls: ['./process.page.scss'],
})
export class ProcessPage implements OnInit {

  application;

  constructor(private route: ActivatedRoute, 
              private popOver: PopoverController) { }

  ngOnInit() {
    this.application = this.route.snapshot.data['application']
  }

  async showPopOver(processes){
    const popover = await this.popOver.create({
      component: PopOverComponent,
      componentProps: {
        process: processes
      }
    })
    return popover.present();
  }

}
