import { Component } from '@angular/core';
import { Course } from '../models/course';
import { CourseDataService } from '../services/course-data.service';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../services/schedule.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-course-search',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './course-search.component.html',
  styleUrl: './course-search.component.css'
})
export class CourseSearchComponent {
  //Egenskaper
  courseList: Course[] = [];
  filteredCourseList: Course[] = [];
  filterValue: string = "";
  subjectFilter: string = '';
  subjects: string[] = [];
  sortColumn: keyof Course | '' = '';
  sortDirection: string = 'asc';

  //Paginering
  p: number = 1;
  itemsPerPage: number = 15;

  //Notifiering
  showAdded = false;
  showAddedMessage = '';

  constructor(private courseData: CourseDataService, private scheduleService: ScheduleService) {}

  //Metoder
  ngOnInit() {
    this.courseData.getCourses().subscribe(data => {
      this.courseList = data;
      this.filteredCourseList = data;
      this.subjects = this.getUniqueSubjects(data);
    });
  }

  getUniqueSubjects(courses: Course[]): string[] {
    const subjects = courses.map(course => course.subject);
    return Array.from(new Set(subjects)).sort();
  }

  applyFilter(): void {
    this.filteredCourseList = this.courseList.filter(course =>
      (course.courseCode.toLowerCase().includes(this.filterValue.toLowerCase()) ||
       course.courseName.toLowerCase().includes(this.filterValue.toLowerCase())) &&
      (this.subjectFilter === '' || course.subject === this.subjectFilter)
    );
    if (this.sortColumn) {
      this.sortData(this.sortColumn);
    }
  }

  sortData(column: keyof Course): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredCourseList.sort((a, b) => {
      let comparison = 0;
      if (a[column] > b[column]) {
        comparison = 1;
      } else if (a[column] < b[column]) {
        comparison = -1;
      }
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  addToSchedule(course: Course) {
    this.scheduleService.addCourse(course);
    this.showNotification(`Kursen ${course.courseName} är tillagd i ramschemat.`);
  }

  showNotification(message: string) {
    this.showAddedMessage = message;
    this.showAdded = true;
    setTimeout(() => {
      this.showAdded = false;
    }, 3000); // Stänger notisen efter 3 sekunder
  }
}