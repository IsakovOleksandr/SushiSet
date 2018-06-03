import { Component, OnInit } from '@angular/core';
import { Sushi } from '../sushi';
import { SushiService } from '../sushi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  sushis: Sushi[] = [];

  constructor(private sushiService: SushiService) { }

  ngOnInit() {
    this.getSushis();
  }

  getSushis(): void {
    this.sushiService.getSushis()
      .subscribe(sushis => this.sushis = sushis.slice(1, 5));
  }
}