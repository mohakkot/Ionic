import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm : FormGroup;
  image : string = 'assets/images/logo.png';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private viewCtrl : ViewController,
  private camera: Camera,
  private formbuilder : FormBuilder) {
    this.registerForm = this.formbuilder.group({
      firstname: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(25)]],
      username: ['',[Validators.required,Validators.minLength(5), Validators.maxLength(15)]],
      password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(16)]],
      telnum : ['', [Validators.required, Validators.pattern]],
      email : ['', [Validators.required, Validators.email]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  getPicture() { 
    const options : CameraOptions ={
      quality : 100,
      targetHeight : 100,
      targetWidth : 100,
      correctOrientation: true,
      allowEdit : true,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.PNG,
      cameraDirection: this.camera.Direction.BACK
    } 

    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData;
      console.log(imageData);
    },
    (err) =>  {console.log("Error Obtaining the Picture")});
  }

  getFromLibrary() {

    const options : CameraOptions ={
      quality : 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetHeight : 100,
      targetWidth : 100,
      correctOrientation: true,
      allowEdit : true,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.PNG,
      cameraDirection: this.camera.Direction.BACK
    } 
    this.camera.getPicture(options).then((imageData) => {
      this.image = imageData;
      console.log(imageData);
    },
    (err) =>  {console.log("Error Obtaining the Picture")});
  }

  dismiss() {
    this.viewCtrl.dismiss(true);
  }

  onSubmit() {
    console.log("Data Registered" + this.registerForm.value);
    this.dismiss();
  }
}
