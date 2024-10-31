import { RouterModule, Routes } from "@angular/router";
import { LoggedComponent } from "./logged.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { UserControlComponent } from "./user-control/user-control.component";
import { RoleControlComponent } from "./role-control/role-control.component";
import { RegisteredProfessionalsComponent } from "./registered-professionals/registered-professionals.component";
import { ProfessionalDetailsComponent } from "./registered-professionals/professional-details/professional-details.component";
import { DemandsControlComponent } from "./demands-control/demands-control.component";
import { SearchControlComponent } from "./search-control/search-control.component";
import { HelpRequestsComponent } from "./help-requests/help-requests.component";
import { InconsistencyControlComponent } from "./inconsistency-control/inconsistency-control.component";
import { AuthenticationGuard } from "../guards/login.guard";
import { PromotingAgentComponent } from "./promoting-agent/promoting-agent.component";
import { PromotingAgentDetailsComponent } from "./promoting-agent/promoting-agent-details/promoting-agent-details.component";

const routes: Routes = [
    {
        path: '',
        component: LoggedComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'user-control', component: UserControlComponent },
            { path: 'role-control', component: RoleControlComponent },
            { path: 'registered-professionals', component: RegisteredProfessionalsComponent },
            { path: 'professional-detail/:_id', component: ProfessionalDetailsComponent },
            { path: 'demands-control', component: DemandsControlComponent },
            { path: 'search-control', component: SearchControlComponent },
            { path: 'help-requests', component: HelpRequestsComponent },
            { path: 'inconsistency-control', component: InconsistencyControlComponent },
            { path: 'promoting-agent', component: PromotingAgentComponent },
            { path: 'promoting-agent-detail/:id', component: PromotingAgentDetailsComponent },


        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoggedRouterModule { }