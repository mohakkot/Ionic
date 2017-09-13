import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../../providers/dish/dish';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
/*
  Generated class for the FavouriteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorite: Array<any>;

  constructor(public http: Http,  private dishservice: DishProvider, private storage: Storage,
  private localnotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
    storage.get('favorite').then(fav => {
      if (fav){
        this.favorite=fav;
      }
      else
        this.favorite=[]
    })
  }

  addFavorite(id: number): boolean {
    if(!this.isFavorite(id))
      this.favorite.push(id);
    console.log('favorites' + this.favorite);
    this.storeFav();
    this.localnotifications.schedule({
      id: id,
      text: 'Dish' + id + "has been added successfully added to the favorites"
    });
    return true;
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes().map(dishes => dishes.filter(dish => this.favorite.some(el => el === dish.id)));
  }

  isFavorite(id: number): boolean {
    return this.favorite.some(el => el===id);
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorite.indexOf(id);
    if (index >= 0) {
      this.favorite.splice(index,1);
      this.storeFav();
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
  
  storeFav() {
    this.storage.set('favorite', this.favorite);
  }
}
