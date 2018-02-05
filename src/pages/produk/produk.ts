import { AuthProvider } from './../../providers/auth/auth';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-produk',
  templateUrl: 'produk.html',
})
export class ProdukPage {
  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref().child('/produk');
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public authProvider: AuthProvider, private inAppBrowser: InAppBrowser) {
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
  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }

  openWebpage(){
    
        const options: InAppBrowserOptions ={
          zoom: 'no'
        }
        const browser = this.inAppBrowser.create('https://www.youtube.com/watch?v=SPJ9TdHaI3A&t=104s', '_blank', options)
        
      }

}
