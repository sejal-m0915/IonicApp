import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'top',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
        },
      ],
      color: 'dark',
    });
    await toast.present();
  }
}
