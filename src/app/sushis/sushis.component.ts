import { Component, OnInit, Input } from '@angular/core';
import { Sushi } from '../sushi'
import {SushiService} from '../sushi.service';

@Component({
  selector: 'app-sushis',
  templateUrl: './sushis.component.html',
  styleUrls: ['./sushis.component.css']
})
export class SushisComponent implements OnInit {

  constructor(private sushiService: SushiService){}

  sushis: Sushi[];

  getSushis(): void {
    this.sushiService.getSushis()
    .subscribe(sushis => this.sushis = sushis)
  }

  ngOnInit(){
    this.getSushis();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.sushiService.addSushi({ name } as Sushi)
      .subscribe(sushi => {
        this.sushis.push(sushi);
      });
  }

  delete(sushi: Sushi): void {
    this.sushis = this.sushis.filter(h => h !== sushi);
    this.sushiService.deleteSushi(sushi).subscribe();
  }

}
