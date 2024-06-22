import { Component, EnvironmentInjector, Optional, inject } from '@angular/core';
import { AlertController, IonRouterOutlet, NavController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
declare var navigator: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  tap = 0;
  public environmentInjector = inject(EnvironmentInjector);


  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.platform.ready().then(() => {
      this.exitAppOnAlert();
    });
  }


  public exitAppOnAlert(): void {
    if (Capacitor.getPlatform() == 'android') {
      this.platform.backButton.subscribeWithPriority(10, async () => {
        const currentUrl = this.router.url;
        if (currentUrl === '/client' || currentUrl === '/login') {
          this.alertExit();
        } else {
          this.navCtrl.back();
        }
      });
    }
  }

  async alertExit() {
    console.log('alert');
    const alert = await this.alertCtrl.create({
      message: 'Are you sure you want to exit the App?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => { App.exitApp(); }
        },
        {
          text: 'No',
          role: 'cancel'
        },
      ],
      cssClass: 'custom_alert'
    });
    alert.present();
  }


}
