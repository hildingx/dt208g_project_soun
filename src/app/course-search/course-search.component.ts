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
  courseList: Course[] = []; //Lista med alla kurser
  filteredCourseList: Course[] = []; //Lista med filtrerade kurser
  filterValue: string = ""; //Input vid textfiltrering
  subjectFilter: string = ''; //Input vid ämnesfiltrering
  subjects: string[] = []; //Unika ämnen för dropdown
  sortColumn: keyof Course | '' = ''; //Sorteringskolumn
  sortDirection: string = 'asc'; //Sorteringsriktning
  courseCount: number = 0; //Antal kurser i filtrerade listan

  //Paginering
  p: number = 1;
  itemsPerPage: number = 15; //Antal kurser per sida

  //Notifiering
  showAdded = false; //Visningsstatus för notifiering
  showAddedMessage = ''; //Notifieringsmeddelande

  constructor(private courseData: CourseDataService, private scheduleService: ScheduleService) {}

  //Metoder

  //Körs när komponenten initiers
  ngOnInit() {
    //Hämta kurser och unika ämnen från kursdata servicen / metoden för att sortera ut unika ämnen
    this.courseData.getCourses().subscribe(data => {
      this.courseList = data;
      this.filteredCourseList = data;
      this.courseCount = this.filteredCourseList.length; //Initialt antal kurser
      this.subjects = this.getUniqueSubjects(data);
    });
  }

  //Sortera ut unika ämnen
  getUniqueSubjects(courses: Course[]): string[] {
    const subjects = courses.map(course => course.subject);
    return Array.from(new Set(subjects)).sort();
  }

  //Filtrera kurslista baserat på filtervärden
  applyFilter(): void {
    this.filteredCourseList = this.courseList.filter(course =>
      (course.courseCode.toLowerCase().includes(this.filterValue.toLowerCase()) ||
       course.courseName.toLowerCase().includes(this.filterValue.toLowerCase())) &&
      (this.subjectFilter === '' || course.subject === this.subjectFilter)
    );

    this.courseCount = this.filteredCourseList.length; //Uppdatera antal kurser efter filtrering

    //Sortera listan om en sorteringskolumn är vald
    if (this.sortColumn) {
      this.sortData(this.sortColumn);
    }
  }

  //Sortera kurslista baserat på vald kolumn och riktning
  sortData(column: keyof Course): void {
    if (this.sortColumn === column) {
      //Ändra sorteringsriktning om samma kolumn klickas igen
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      //Sortera ny kolumn och riktning
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    //Sortera listan
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

  //Lägg till kurs i ramschemat och visa notifiering
  addToSchedule(course: Course) {
    const courseAdded = this.scheduleService.addCourse(course);
    if (courseAdded) {
      this.showNotification(`Kursen ${course.courseName} är tillagd i ramschemat.`);
    } else {
      this.showNotification(`Kursen ${course.courseName} finns redan i ramschemat.`);
    }
  }

  //Visa notifiering med meddelande om tillagd kurs i tre sekunder
  showNotification(message: string) {
    this.showAddedMessage = message;
    this.showAdded = true;
    setTimeout(() => {
      this.showAdded = false;
    }, 3000);
  }
}