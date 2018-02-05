import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-sahkan-job',
  templateUrl: 'sahkan-job.html',
})
export class SahkanJobPage {
  jobGambar;
  jobServis;
  jobNegeri;
  jobAlamatPenuh;
  jobBeratPakaian;
  jobJumlahHarga;
  jobID;
  jobList;
  jobOwner;
  jobOwnerPhone;
  jobTarikh;
  jobMasa;
  nStatus;
  nStatusID;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.jobList = firebase.database().ref("job");
  }

  ionViewDidLoad() {
    this.jobGambar = this.navParams.get('jobGambar');
    this.jobServis = this.navParams.get('jobServis');
    this.jobNegeri = this.navParams.get('jobNegeri');
    this.jobAlamatPenuh = this.navParams.get('jobAlamatPenuh');
    this.jobBeratPakaian = this.navParams.get('jobBeratPakaian');
    this.jobJumlahHarga = this.navParams.get('jobJumlahHarga');
    this.jobID = this.navParams.get('jobID');
    this.jobOwner = this.navParams.get('jobOwner');
    this.jobOwnerPhone = this.navParams.get('jobOwnerPhone');
    this.jobTarikh = this.navParams.get('jobTarikh');
    this.jobMasa = this.navParams.get('jobMasa');
    this.nStatus = "Selesai";
    this.nStatusID = this.jobNegeri+"_Selesai";
  }

  acceptJob(nStatus: string, nStatusID: string): void{
    const jobRef: firebase.database.Reference = firebase.database().ref(`/job/${this.jobID}`);
    jobRef.update({
      jobStatus: nStatus,
      jobStatusID: nStatusID
    }).then(newJob =>{
      this.navCtrl.push('UserProfilePage');
    },error=>{console.log(error);});
  }
}
