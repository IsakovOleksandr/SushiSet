import { TestBed, inject } from '@angular/core/testing';

import { SushiService } from './sushi.service';

describe('SushiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SushiService]
    });
  });

  it('should be created', inject([SushiService], (service: SushiService) => {
    expect(service).toBeTruthy();
  }));
});
