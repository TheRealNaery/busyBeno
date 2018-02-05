import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-berita',
  templateUrl: 'berita.html',
})
export class BeritaPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
}

  ionViewDidLoad() {
 
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
}
