import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { SharedModule } from "../shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { counterService } from "../Services/counter.service";

const routes: Routes = [
    { path: "", component: LoginComponent }
]

@NgModule({
    declarations: [LoginComponent],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        CommonModule
    ],
    providers: [counterService]
})
export class AuthModule {

}