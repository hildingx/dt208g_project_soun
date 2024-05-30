import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  //Nyckel som används för att lagra och hämta ramschemat från localstorage
  private scheduleKey = 'courseSchedule';

  constructor() {}

  //Hämtar ramschemat från localstorage och returernar som en array
  getSchedule(): Course[] {
    return JSON.parse(localStorage.getItem(this.scheduleKey) || '[]');
  }

  //Lägger till kurs i ramschemat och sparar uppdaterat schema till localstorage
  addCourse(course: Course): void {
    const schedule = this.getSchedule();
    schedule.push(course);
    localStorage.setItem(this.scheduleKey, JSON.stringify(schedule));
  }

  //Tar bort kurs från ramschema och sparar uppdaterat schema till localstorage
  removeCourse(courseCode: string): void {
    let schedule = this.getSchedule();
    schedule = schedule.filter(course => course.courseCode !== courseCode);
    localStorage.setItem(this.scheduleKey, JSON.stringify(schedule));
  }

  //Beräknar och returnerar det totala antalet hp
  getTotalPoints(): number {
    return this.getSchedule().reduce((total, course) => total + course.points, 0);
  }
}