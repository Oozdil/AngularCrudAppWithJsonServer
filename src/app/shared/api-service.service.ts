import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpClient: HttpClient) {

  }

  postEmployee(data: any) {
    return this.httpClient.post<any>("http://localhost:3000/posts", data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getEmployee() {   
    return this.httpClient.get<any>("http://localhost:3000/posts")
      .pipe(map((res: any) => {
        //console.log(res);
        return res;
      }));
  }
  updateEmployee(data: any,id:number) {
    return this.httpClient.put<any>("http://localhost:3000/posts/"+id, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  deleteEmployee(id:number) {
    return this.httpClient.delete<any>("http://localhost:3000/posts/"+id)
      .pipe(map((res: any) => {
        return res;
      }));
  }

}
