import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FavouriteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorite: Array<any>;

  constructor(public http: Http) {
    console.log('Hello FavoriteProvider Provider');
    this.favorite = [];
  }

  addFavorite(id: number): boolean {
    this.favorite.push(id);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorite.some(el => el===id);
  }
}
