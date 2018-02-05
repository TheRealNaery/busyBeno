import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import 'rxjs/add/operator/map';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-upload-profile',
  templateUrl: 'upload-profile.html',
})
export class UploadProfilePage {

  public userProfile: any;
  public userPic: any;
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  userId ;
  userInfo;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,  public cameraPlugin: Camera) {
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
      this.userPic = this.userProfile.gambarProfil;
  });
    });
  }

  takePhoto(userId): void {
    // Here we'll take the picture
    this.cameraPlugin.getPicture({
      quality : 100,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      // Send the picture to Firebase Storage
      const selfieRef = firebase.storage().ref(`profilePictures/users/${userId}/profilePicture.png`);
      selfieRef
        .putString(profilePicture, 'base64', {contentType: 'image/png'})
        .then(savedProfilePicture => {
          firebase
            .database()
            .ref(`userProfile/${userId}`)
            .update({
            gambarProfil: savedProfilePicture.downloadURL
          });
        });
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  selectPhoto(userId): void {
    // Here we'll take the picture
    this.cameraPlugin.getPicture({
      quality : 100,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      // Send the picture to Firebase Storage
      const selfieRef = firebase.storage().ref(`profilePictures/users/${userId}/profilePicture.png`);
      selfieRef
        .putString(profilePicture, 'base64', {contentType: 'image/png'})
        .then(savedProfilePicture => {
          firebase
            .database()
            .ref(`userProfile/${userId}`)
            .update({
            gambarProfil: savedProfilePicture.downloadURL
          });
        });
        this.navCtrl.push('UserProfilePage');
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
}
