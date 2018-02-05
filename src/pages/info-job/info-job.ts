import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-info-job',
  templateUrl: 'info-job.html',
})
export class InfoJobPage {
  jobGambar;
  jobServis;
  jobNegeri;
  jobAlamatPenuh;
  jobBeratPakaian;
  jobJumlahHarga;
  jobID;
  jobTarikh;
  jobMasa;
  jobOwner;
  jobOwnerPhone
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  }

}
