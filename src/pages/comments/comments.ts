import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CommentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  comment : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController, private formBuilder: FormBuilder) {

    this.comment = this.formBuilder.group({
      author:['', Validators.required],
      rating: 5,
      comment: ['', Validators.required],
      datetime: ''
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.comment.value);
    this.viewCtrl.dismiss(this.comment.value);
  }
}
