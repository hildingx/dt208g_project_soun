import { Component } from '@angular/core';
import { Course } from '../models/course';
import { CourseDataService } from '../services/course-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-search.component.html',
  styleUrl: './course-search.component.css'
})
export class CourseSearchComponent {
  //Egenskaper
  courseList: Course[] = [];

  constructor(private courseData: CourseDataService) {}

  //Metoder
  ngOnInit() {
    this.courseData.getCourses().subscribe(data => {
      this.courseList = data;
    });
  }
}
