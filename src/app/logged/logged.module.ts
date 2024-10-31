import { NgModule } from "@angular/core";
import { LoggedComponent } from "./logged.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CommonModule } from "@angular/common";
import { LoggedRouterModule } from "./logged.router";
import { SharedModule } from "../shared/shared.module";
import { ToastrService } from "../services/toastr.service";
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { SidebarService } from "../services/sidebar.service";
import { UserControlComponent } from './user-control/user-control.component';
import { NgxPaginationModule } from "ngx-pagination";
import { RegisterUserComponent } from './user-control/register-user/register-user.component';
import { RegisterViewerComponent } from './user-control/register-viewer/register-viewer.component';
import { RoleControlComponent } from './role-control/role-control.component';
import { RegisterRoleModalComponent } from './role-control/register-role-modal/register-role-modal.component';
import { RegisteredProfessionalsComponent } from './registered-professionals/registered-professionals.component';
import { ProfessionalDetailsComponent } from './registered-professionals/professional-details/professional-details.component';
import { DemandsControlComponent } from './demands-control/demands-control.component';
import { SearchControlComponent } from './search-control/search-control.component';
import { HelpRequestsComponent } from './help-requests/help-requests.component';
import { MessageHelpModalComponent } from './help-requests/message-help-modal/message-help-modal.component';
import { InconsistencyControlComponent } from './inconsistency-control/inconsistency-control.component';
import { InconsistencyDetailModalComponent } from './inconsistency-control/inconsistency-detail-modal/inconsistency-detail-modal.component';
import { UserService } from "../services/user.service";
import { HttpClientModule } from "@angular/common/http";
import { RoleService } from "../services/role.service";
import { EditUserComponent } from './user-control/edit-user/edit-user.component';
import { DeleteUserComponent } from './user-control/delete-user/delete-user.component';
import { EditRoleComponent } from './role-control/edit-role/edit-role.component';
import { DeleteRoleComponent } from './role-control/delete-role/delete-role.component';
import { AuthenticationGuard } from "../guards/login.guard";
import { AuthenticationService } from "../services/authentication.service";
import { ProfessionalService } from "../services/professional.service";
import { EmployeeService } from "../services/employee.service";
import { DemandService } from "../services/demand.service";
import { CompanyService } from "../services/company.service";
import { HelpService } from "../services/help.service";
import { SatisfactionResearchService } from "../services/satisfaction-research.service";
import { SearchControlDetailComponent } from './search-control/search-control-detail/search-control-detail.component';
import { PromotingAgentComponent } from './promoting-agent/promoting-agent.component';
import { NewPromotingAgentComponent } from './promoting-agent/new-promoting-agent/new-promoting-agent.component';
import { NgxMaskDirective } from "ngx-mask";
import { PromotingAgentDetailsComponent } from './promoting-agent/promoting-agent-details/promoting-agent-details.component';
import { ConstructionService } from "../services/construction.service";
import { NgChartsModule } from "ng2-charts";
import { DashboardService } from "../services/dashboard.service";
import { MapComponent } from "./map/map.component";
import { MapDemandComponent } from './map-demand/map-demand.component';
import { DemandMapInfoComponent } from './demands-control/demand-map-info/demand-map-info.component';
import { DemandsInfoComponent } from './demands-control/demands-info/demands-info.component';

@NgModule({
    declarations: [
        LoggedComponent,
        DashboardComponent,
        NavbarComponent,
        UserControlComponent,
        RegisterUserComponent,
        RegisterViewerComponent,
        RoleControlComponent,
        RegisterRoleModalComponent,
        RegisteredProfessionalsComponent,
        ProfessionalDetailsComponent,
        DemandsControlComponent,
        SearchControlComponent,
        HelpRequestsComponent,
        MessageHelpModalComponent,
        InconsistencyControlComponent,
        InconsistencyDetailModalComponent,
        EditUserComponent,
        DeleteUserComponent,
        EditRoleComponent,
        DeleteRoleComponent,
        SearchControlDetailComponent,
        PromotingAgentComponent,
        NewPromotingAgentComponent,
        PromotingAgentDetailsComponent,
        MapComponent,
        MapDemandComponent,
        DemandMapInfoComponent,
        DemandsInfoComponent
    ],
    imports: [
        CommonModule,
        LoggedRouterModule,
        SharedModule,
        NgxPaginationModule,
        HttpClientModule,
        NgxMaskDirective,
        NgChartsModule
    ],
    providers: [
        ToastrService,
        SidebarService,
        UserService,
        RoleService,
        AuthenticationGuard,
        AuthenticationService,
        ProfessionalService,
        EmployeeService,
        DemandService,
        CompanyService,
        HelpService,
        SatisfactionResearchService,
        ConstructionService,
        DashboardService
        
    ]
})
export class LoggedModule { }