import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../models/course';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-course-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-schedule.component.html',
  styleUrl: './course-schedule.component.css'
})
export class CourseScheduleComponent {
  courseSchedule: Course[] = [];
  totalPoints: number = 0;

  //Notifiering
  showRemoved = false; //Visningsstatus för notifiering
  showRemovedMessage = ''; //Notifieringsmeddelande

  constructor(private scheduleService: ScheduleService) {}

  //Körs när komponenten initieras
  ngOnInit() {
    //Hämta kurser från schedule service och beräkna totalpoäng
    this.courseSchedule = this.scheduleService.getSchedule();
    this.totalPoints = this.scheduleService.getTotalPoints();
  }

  //Ta bort kurs från ramschemat, räkna om totalpoäng och visa notifiering
  removeCourse(courseCode: string) {
    //Anropa metod från scheduleservice för att ta bort kurs
    this.scheduleService.removeCourse(courseCode);
    //Uppdatera kurslista och totalpoäng efter borttagning
    this.courseSchedule = this.scheduleService.getSchedule();
    this.totalPoints = this.scheduleService.getTotalPoints();
    //Visa notifering om borttagen kurs
    this.showNotification(`Kursen ${courseCode} är borttagen från ramschemat.`);
  }

  //Visa notifiering med meddelande om tillagd kurs i tre sekunder
  showNotification(message: string) {
    this.showRemovedMessage = message;
    this.showRemoved = true;
    setTimeout(() => {
      this.showRemoved = false;
    }, 3000);
  }
}