import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 
import * as firebase from 'firebase';

/**
 * Generated class for the InfoServisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-servis',
  templateUrl: 'info-servis.html',
})
export class InfoServisPage {

  servisNama;
  servisHarga;
  servisGambar;
  public userProfile: any;
  public userState: any;
  public userType: any;
  public userName: any;
  public userPhone: any;
  userId ;
  userInfo;
  jobs : AngularFireList<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase) {
    this.jobs = this.db.list('/job');
    this.servisNama = this.navParams.get('serNama');
    this.servisHarga = this.navParams.get('serHarga');
    this.servisGambar = this.navParams.get('serGambar');  
  }

  ionViewDidLoad() {
    this.servisNama = this.navParams.get('serNama');
    this.servisHarga = this.navParams.get('serHarga');
    this.servisGambar = this.navParams.get('serGambar');
    firebase.auth().onAuthStateChanged( user => {
      if (user) { 
        this.userId = user.uid;
        this.userInfo = firebase.database().ref(`/userProfile/${user.uid}`)
      };
      console.log(this.userId);
      this.userInfo.on('value', userSnapshot =>{
      this.userProfile = userSnapshot.val();
      this.userState = this.userProfile.negeri;
      this.userType = this.userProfile.type;
      this.userName = this.userProfile.nama;
      this.userPhone = this.userProfile.phoneNo;
  });
    });
    
  }
  addJob(alNoUnit,alAlamat,alPoskod,alNegeri,inBerat,inTarikh,inMasa,servisNama,servisHarga,servisGambar,userName,userPhone){
    const newJobRef: firebase.database.ThenableReference = this.jobs.push({});
let jumlahHarga = servisHarga * inBerat
    return newJobRef.set({
      jobNoUnit:alNoUnit,
      jobAlamat:alAlamat,
      jobPoskod:alPoskod,
      jobNegeri:alNegeri,
      jobID:newJobRef.key,
      jobAlamatPenuh:alNoUnit+", "+alAlamat+", "+alPoskod+", "+alNegeri,
      jobBeratPakaian:inBerat,
      jobServis:servisNama,
      jobStatus:'Belum Diterima',
      jobJumlahHarga:jumlahHarga,
      jobStatusID:alNegeri+"_Belum Diterima",
      jobGambar:servisGambar,
      jobOwner:userName,
      jobOwnerPhone:userPhone,
      jobTarikh:inTarikh,
      jobMasa:inMasa
    }).then(newJob =>{
      this.navCtrl.push('ServisPage');
    },error=>{console.log(error);});

  }
}
