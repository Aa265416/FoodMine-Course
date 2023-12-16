import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchterm: string = '';
  constructor(activatedroute: ActivatedRoute, private route: Router) {
    activatedroute.params.subscribe((params) => {
      if (params.searchTerm) this.searchterm = params.searchTerm;
    });
  }

  //input search method for url

  search(term: string): void {
    if (term) this.route.navigateByUrl('/search/' + term);
  }
}
