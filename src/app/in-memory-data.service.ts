import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sushis = [
        { id: 2, name: 'Pasto' },
        { id: 3, name: 'Mia' },
        { id: 4, name: 'California' },
        { id: 5, name: 'Philadelphia' }
    ];
    return {sushis};
  }
}