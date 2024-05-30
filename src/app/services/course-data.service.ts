import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseDataService {
  //URL till json med kursdata
  private url:string = "assets/miun_courses.json";

  //Injecerar HttpClient för att utföra HTTP-anrop
  constructor(private http: HttpClient) { }

  //Hämtar kursdata från json och returnerar en observable av course-arrayen
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}
