import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,@Inject('BaseURL') private BaseURL,
  private emailcomposer:EmailComposer, private callnumber: CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendEmail() {
    let email = {
      to: 'confusion@food.net',
      subject : '[ConFusion]: Query',
      body : "Dear Sir/Madam",
      isHtml : true
    };
    this.emailcomposer.open(email);
  }

  callRestaurant () {
    this.callnumber.callNumber('85212345678', true)
    .then(() => console.log("Launched Dialer"))
    .catch(()=> console.log("Error Launching Dialer"));
  }
}
