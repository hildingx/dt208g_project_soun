import { Component } from '@angular/core';
import { Course } from '../models/course';
import { CourseDataService } from '../services/course-data.service';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../services/schedule.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-search.component.html',
  styleUrl: './course-search.component.css'
})
export class CourseSearchComponent {
  //Egenskaper
  courseList: Course[] = [];
  filteredCourseList: Course[] = [];
  filterValue: string = "";

  constructor(private courseData: CourseDataService, private scheduleService: ScheduleService) {}

  //Metoder
  ngOnInit() {
    this.courseData.getCourses().subscribe(data => {
      this.courseList = data;
      this.filteredCourseList = data;
    });
  }

  applyFilter(): void {
    this.filteredCourseList = this.courseList.filter((course) =>
      course.courseCode.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  addToSchedule(course: Course) {
    this.scheduleService.addCourse(course);
  }
}