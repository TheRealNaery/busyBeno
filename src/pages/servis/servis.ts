import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-servis',
  templateUrl: 'servis.html',
})
export class ServisPage {
  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref().child('/servis');
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    this.itemRef.on('value', itemSnapshot => {
      this.items = [];
      itemSnapshot.forEach( itemSnap => {
        this.items.push(itemSnap.val());
        return false;
      });
    });
  }
  
  openServis(namaServis,hargaServis,gambarServis){
    
        let servisData = {
            serNama : namaServis,
            serHarga : hargaServis,
            serGambar : gambarServis
        }
        this.navCtrl.push('InfoServisPage', servisData);

      }

      logMeOut() {
        this.authProvider.logoutUser().then( () => {
          this.navCtrl.setRoot('LoginPage');
        });
      }
}
