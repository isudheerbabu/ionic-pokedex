import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details: any;
  slideOpts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }
  };
  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let index = this.route.snapshot.paramMap.get('index');
    this.pokeService.getPokeDetails(index).subscribe(details => {
      this.details = details;
    });
  }

}
