import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../../providers/dish/dish';
/*
  Generated class for the FavouriteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorite: Array<any>;

  constructor(public http: Http,  private dishservice: DishProvider) {
    console.log('Hello FavoriteProvider Provider');
    this.favorite = [];
  }

  addFavorite(id: number): boolean {
    if(!this.isFavorite(id))
      this.favorite.push(id);
    console.log('favorites' + this.favorite)
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
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}
