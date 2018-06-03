import { Injectable } from '@angular/core';
import {Sushi} from './sushi';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SushiService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** Log a SushiService message with the MessageService */
  private log(message: string) {
    this.messageService.add('SushiService: ' + message);
  }
  
  private sushisUrl = 'api/sushis';  // URL to web api

  getSushis(): Observable<Sushi[]> {
  // TODO: send the message _after_ fetching the sushis
  return this.http.get<Sushi[]>(this.sushisUrl)
    .pipe(
      tap(sushis => this.log(`fetched sushis`)),
      catchError(this.handleError('getSushis',[]))
   );
  }

  getSushi(id: number): Observable<Sushi> {
    // TODO: send the message _after_ fetching the sushi
    const url = `${this.sushisUrl}/${id}`;
    this.messageService.add(`SushiService: fetched sushi id=${id}`);
    return this.http.get<Sushi>(url).pipe(
      tap(_ => this.log(`fetched sushis id=${id}`)),
      catchError(this.handleError<Sushi>(`getSushi id=${id}`))
    );
  }

  /** POST: add a new sushi to the server */
addSushi(sushi: Sushi): Observable<Sushi> {
  return this.http.post<Sushi>(this.sushisUrl, sushi, httpOptions).pipe(
    tap((sushi: Sushi) => this.log(`added sushi w/ id=${sushi.id}`)),
    catchError(this.handleError<Sushi>('addSushi'))
  );
}

  updateSushi (sushi: Sushi): Observable<any> {
    return this.http.put(this.sushisUrl, sushi, httpOptions).pipe(
      tap(_ => this.log(`updated sushi id=${sushi.id}`)),
      catchError(this.handleError<any>('updateSushi'))
    );
  }

  /** DELETE: delete the sushi from the server */
deleteSushi (sushi: Sushi | number): Observable<Sushi> {
  const id = typeof sushi === 'number' ? sushi : sushi.id;
  const url = `${this.sushisUrl}/${id}`;

  return this.http.delete<Sushi>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted sushi id=${id}`)),
    catchError(this.handleError<Sushi>('deleteSushi'))
  );
}

/* GET sushis whose name contains search term */
searchSushis(term: string): Observable<Sushi[]> {
  if (!term.trim()) {
    // if not search term, return empty sushi array.
    return of([]);
  }
  return this.http.get<Sushi[]>(`${this.sushisUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found sushis matching "${term}"`)),
    catchError(this.handleError<Sushi[]>('searchSushis', []))
  );
}
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
