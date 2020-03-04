import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2/';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';


  constructor(private http: HttpClient) { }

getPokemon(offset = 0) {
  return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=30`)
  .pipe(
    map(result => {
      // tslint:disable-next-line: no-string-literal
      return result['results'];
    }),
    map(pokemons => {
      return pokemons.map((poke, index) => {
        poke.image = this.getPokeImage(offset + index + 1);
        poke.pokeIndex = offset + index + 1;
        return poke;
      });
    })
  );
}

getPokeImage(index) {
  return `${this.imageUrl}${index}.png`;
}

findPokemon(search) {
  return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
    map(pokemon => {
      // tslint:disable-next-line: no-string-literal
      pokemon['image'] = this.getPokeImage(pokemon['id']);
      // tslint:disable-next-line: no-string-literal
      pokemon['pokeIndex'] = pokemon['id'];
      return pokemon;
    })
  );
}

getPokeDetails(index) {
  return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
    map(poke => {
      // tslint:disable-next-line: prefer-const
      // tslint:disable-next-line: no-string-literal
      // tslint:disable-next-line:prefer-const
      let sprites = Object.keys(poke['sprites']);
      // tslint:disable-next-line: no-string-literal
      poke['images'] = sprites
      .map(spriteKey => poke['sprites'][spriteKey])
      .filter(img => img);
      return poke;
    })
  );
}
}
