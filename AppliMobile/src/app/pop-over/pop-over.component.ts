import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Requete } from '../models/requete';
import { ApiService } from '../services/api.service';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss'],
})
export class PopOverComponent implements OnInit {

  process;
  response;
  

  constructor(private navParams: NavParams, 
              private popOver: PopoverController,
              private request: Requete,
              private apiService: ApiService,
              private utils: UtilsService) { }

  ngOnInit() {
    this.process = this.navParams.get('process')
  }

  envoi(actions){
    this.request.serverName = this.process.server.serverName
    this.request.commandName = actions.commands.commandName
    this.request.Status = actions.commands.forStatus

    this.apiService.postCommand(this.request)
    .subscribe(
      data=>{
        this.response = data
        if (this.response.output === null){
          if (this.response.traitement === 'OK'){
            this.utils.presentToast("Task successfully completed",'success')
          }
          this.utils.presentToast("Unable to complete task", 'warning')
        }

        if (this.response.output === '1'){
          this.utils.presentToast("Application is running",'light'); 
        }

        if (this.response.output ==='2'){
          this.utils.presentToast("Application is stopped",'dark')
        }
      },

      error=>{
        this.utils.presentToast("Error in server",'danger');
      }
    )
  }

  closePopOver(){
    this.popOver.dismiss();
  }

}
