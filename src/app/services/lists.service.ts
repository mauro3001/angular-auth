import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { CreateListDto, List } from '@models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }
  
  createList(dto: CreateListDto) {
    return this.http.post<List>(`${this.apiUrl}/api/v1/lists`, dto, {
      context: checkToken(),
    });
  }

}