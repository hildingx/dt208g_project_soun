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

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.courseSchedule = this.scheduleService.getSchedule();
    this.totalPoints = this.scheduleService.getTotalPoints();
  }

  removeCourse(courseCode: string) {
    this.scheduleService.removeCourse(courseCode);
    this.courseSchedule = this.scheduleService.getSchedule();
    this.totalPoints = this.scheduleService.getTotalPoints();
  }
}


