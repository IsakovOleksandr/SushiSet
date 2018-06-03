import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Sushi } from '../sushi';
import { SushiService } from '../sushi.service';

@Component({
  selector: 'app-sushi-search',
  templateUrl: './sushi-search.component.html',
  styleUrls: ['./sushi-search.component.css']
})
export class SushiSearchComponent implements OnInit {
  sushis$: Observable<Sushi[]>;
  private searchTerms = new Subject<string>();

  constructor(private sushiService: SushiService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.sushis$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),

      switchMap((term:string)=> this.sushiService.searchSushis(term)),
    );
  }

}
