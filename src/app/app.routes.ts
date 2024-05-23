import { Routes } from '@angular/router';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';

export const routes: Routes = [
    { path: "courses", component: CourseSearchComponent },
    { path: "schedule", component: CourseScheduleComponent},
    { path: "", redirectTo: "course-search", pathMatch: "full" }
];
