import { NgModule } from "@angular/core";
import { CreateTaskComponent } from "./create-task/create-task.component";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared.module";
import { OverviewComponent } from './overview/overview.component';
import { RouterModule, Routes } from "@angular/router";
import { StatsComponent } from './stats/stats.component';
import { DashBoardRouteModule } from "./dashboard-route.module";



@NgModule({
    declarations: [
        DashboardComponent,
        CreateTaskComponent,
        TaskDetailsComponent,
        OverviewComponent,
        StatsComponent,
    ],
    exports: [
        // DashboardComponent,
        // CreateTaskComponent,
        // TaskDetailsComponent,
        SharedModule,
        DashBoardRouteModule
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ]

})
export class DashBoardModule {

}