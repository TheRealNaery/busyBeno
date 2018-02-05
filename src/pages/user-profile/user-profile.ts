import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  public userProfile: any;
  public userState: any;
  userId ;
  userInfo;
  jobList;
  userNama;
  public senaraiKerja: Array<any> = [];
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
      this.userNama = this.userProfile.nama;
      this.jobList = firebase.database().ref("job");//.orderBy('jobStatusID').equalTo(this.userState+"_Belum Diterima");
      this.jobList.orderByChild('jobOwner').equalTo(this.userNama).on('value', jobSnapshot => {
      this.senaraiKerja = [];
      jobSnapshot.forEach( jobSnap => {
        this.senaraiKerja.push(jobSnap.val());
        return false;
      });
      
      });
  });
    });
    
  }

  openJob(jobGambar,jobServis,jobNegeri,jobAlamatPenuh,jobBeratPakaian,jobJumlahHarga,jobID,jobOwner,jobOwnerPhone,jobTarikh,jobMasa){
    let jobData = {
      jobGambar : jobGambar,
      jobServis : jobServis,
      jobNegeri : jobNegeri,
      jobAlamatPenuh : jobAlamatPenuh,
      jobBeratPakaian : jobBeratPakaian,
      jobJumlahHarga : jobJumlahHarga,
      jobID : jobID,
      jobOwner : jobOwner,
      jobOwnerPhone : jobOwnerPhone,
      jobTarikh : jobTarikh,
      jobMasa : jobMasa
  }
  this.navCtrl.push('InfoJobPage', jobData);
  }

  openJobSah(jobGambar,jobServis,jobNegeri,jobAlamatPenuh,jobBeratPakaian,jobJumlahHarga,jobID,jobOwner,jobOwnerPhone,jobTarikh,jobMasa){
    let jobData = {
      jobGambar : jobGambar,
      jobServis : jobServis,
      jobNegeri : jobNegeri,
      jobAlamatPenuh : jobAlamatPenuh,
      jobBeratPakaian : jobBeratPakaian,
      jobJumlahHarga : jobJumlahHarga,
      jobID : jobID,
      jobOwner : jobOwner,
      jobOwnerPhone : jobOwnerPhone,
      jobTarikh : jobTarikh,
      jobMasa : jobMasa
  }
  this.navCtrl.push('SahkanJobPage', jobData);
  }
  openUpload(){
    this.navCtrl.push('UploadProfilePage');  
  }

  logMeOut() {
    this.authProvider.logoutUser().then( () => {
      this.navCtrl.setRoot('LoginPage');
    });
  }
}
