import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController , ActionSheetController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentsPage } from '../../pages/comments/comments';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite : boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private favoriteservice: FavoriteProvider,
    public modalCtrl : ModalController,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    @Inject('BaseURL') private BaseURL) {
      this.dish = navParams.get('dish');
      this.numcomments = this.dish.comments.length;
      this.favorite = favoriteservice.isFavorite(this.dish.id);
      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating );
      this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addtoFavorite(){
    console.log("Adding t Favorites", this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000}).present();
  }

  openComments() { 
    let modal = this.modalCtrl.create(CommentsPage);
    modal.present();
    modal.onDidDismiss(data => {
      data.date = new Date().toISOString();
      if (data !== undefined) {
        this.dish.comments.push(data);
      }
    });
  
  }

  openActionSheet() { 
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Please Select an Action',
      buttons: [
        {
          text: 'Add To Favorites',
          handler: () => {
            this.addtoFavorite();
          }
        },
        {
          text: 'Add Comments',
          handler: () => {
            this.openComments();
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log('Action Cancelled');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
