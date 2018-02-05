import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the UserPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  userProfileRoot = 'UserProfilePage'
  servisRoot = 'ServisPage'
  produkRoot = 'ProdukPage'
  beritaRoot = 'BeritaPage'


  constructor(public navCtrl: NavController) {}

}
