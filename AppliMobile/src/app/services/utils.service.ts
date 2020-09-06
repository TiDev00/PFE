import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  isLoading = false;

  constructor(private toast: ToastController,
              private loadingController: LoadingController) { }

  async presentToast(message: string, color:string){
    const toast = await this.toast.create({
      message: message,
      position: 'top',
      color: color,
      duration: 2000
    })
    toast.present();
  }

  async presentLoader() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: 'circular',
      translucent: true
      // duration: 5000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss()}
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}