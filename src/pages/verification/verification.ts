import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from 'firebase';
/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {
  public userProfile: any;
  public userState: any;
  public userType: any;
  userId ;
  userInfo;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public authProvider: AuthProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    firebase.auth().onAuthStateChanged( user => {
      if (user) { 
        this.userId = user.uid;
        this.userInfo = firebase.database().ref(`/userProfile/${user.uid}`)
      };
      console.log(this.userId);
      //console.log(this.userInfo.email);
      this.userInfo.on('value', userSnapshot =>{
      this.userProfile = userSnapshot.val();
      this.userState = this.userProfile.negeri;
      this.userType = this.userProfile.type;
      console.log(this.userType);
  });
    });
 
  }
  
  verify(type){
    if(type == "user"){
      this.navCtrl.setRoot('UserPage');
    }else{
      this.authProvider.logoutUser().then( () => {
        this.navCtrl.setRoot('LoginPage');
      });
    }
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
}
