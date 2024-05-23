import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private scheduleKey = 'courseSchedule';

  constructor() {}

  getSchedule(): Course[] {
    return JSON.parse(localStorage.getItem(this.scheduleKey) || '[]');
  }

  addCourse(course: Course): void {
    const schedule = this.getSchedule();
    schedule.push(course);
    localStorage.setItem(this.scheduleKey, JSON.stringify(schedule));
  }

  removeCourse(courseCode: string): void {
    let schedule = this.getSchedule();
    schedule = schedule.filter(course => course.courseCode !== courseCode);
    localStorage.setItem(this.scheduleKey, JSON.stringify(schedule));
  }

  getTotalPoints(): number {
    return this.getSchedule().reduce((total, course) => total + course.points, 0);
  }
}