import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon = [];
  @ViewChild(IonInfiniteScroll, {static: false}) infinite: IonInfiniteScroll;

  constructor(private pokeService: PokemonService) {}

ngOnInit() {
  this.loadPokemon();
}

loadPokemon(loadMore = false, event?) {
  if (loadMore) {
    this.offset += 30;
  }
  this.pokeService.getPokemon(this.offset).subscribe(res => {
    this.pokemon = [...this.pokemon, ...res];
    if (event) {
      event.target.complete();
    }

    // tslint:disable-next-line: triple-equals
    if (this.offset == 125) {
      this.infinite.disabled = true;
    }
  });
}

onSearchChange(e) {
// tslint:disable-next-line:prefer-const
let value = e.detail.value;

// tslint:disable-next-line: triple-equals
if (value == '') {
  this.offset = 0;
  this.loadPokemon();
  return;
}

this.pokeService.findPokemon(value).subscribe(res => {
  this.pokemon = [res];
}, err => {
  this.pokemon = [];
});
}
}
