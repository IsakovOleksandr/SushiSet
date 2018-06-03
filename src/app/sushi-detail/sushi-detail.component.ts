import { Component, OnInit, Input } from '@angular/core';
import { Sushi } from '../sushi';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { SushiService }  from '../sushi.service';

@Component({
  selector: 'app-sushi-detail',
  templateUrl: './sushi-detail.component.html',
  styleUrls: ['./sushi-detail.component.css']
})
export class SushiDetailComponent implements OnInit {
  @Input() sushi: Sushi;
  
  constructor(
    private route: ActivatedRoute,
    private sushiService: SushiService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getSushi();
  }
  getSushi(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.sushiService.getSushi(id)
      .subscribe(sushi => this.sushi = sushi);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.sushiService.updateSushi(this.sushi)
      .subscribe(() => this.goBack());
  }
}
