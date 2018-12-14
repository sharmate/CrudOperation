import { Injectable } from '@angular/core';
import { Student } from './student.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';




@Injectable()
export class StudentService {

  selectedStudent: Student;
  studentList:Student[];

  constructor(private http: Http) { }

  postStudent(stud:Student){
    var body = JSON.stringify(stud);
    var headerOptions = new Headers({'content-type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost/web-api/student.php',body,requestOptions).map(x=>x.json)
  }

  putStudent(id, stud){
    var body = JSON.stringify(stud);
    var headerOptions = new Headers({'content-type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost/web-api/studentEdit.php',body,requestOptions).map(x=>x.json)
  }

  getStudentList(){
    this.http.get('http://localhost/web-api/studentRead.php')
    .map((data:Response)=>{
      return data.json() as Student[];
    }).toPromise().then(x=>{
      this.studentList = x;
    })
  }

  deleteStudent(stud){
    var body = JSON.stringify(stud);
    var headerOptions = new Headers({'content-type':'application/json'})
    var requestOptions = new RequestOptions({method:RequestMethod.Post,headers:headerOptions})
    return this.http.post('http://localhost/web-api/studentDelete.php',body,requestOptions).map(x=>x.json)
  }
}
