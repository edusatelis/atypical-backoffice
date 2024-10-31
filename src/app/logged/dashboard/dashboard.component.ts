import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { finalize } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { ConstructionService } from 'src/app/services/construction.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DemandService } from 'src/app/services/demand.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { HelpService } from 'src/app/services/help.service';
import { SatisfactionResearchService } from 'src/app/services/satisfaction-research.service';
import { UserService } from 'src/app/services/user.service';

interface list {
  program: number;
  interaction: number;
  platform: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  selectedValueFilterMonths: number = 1;
  selectedValueFilterType: string = 'beneficiary'

  listProfessional: list = {
    program: 0,
    interaction: 0,
    platform: 0
  };
  listBenefiario: list = {
    program: 0,
    interaction: 0,
    platform: 0
  };

  submited: boolean = false;
  loading: boolean = false;
  message: string = '';

  beneficiary: number = 0;
  companies: number = 0;
  demands: number = 0;
  help: number = 0;
  inconsistency: number = 0;
  construction: number = 0;






  form: FormGroup;
  formDados: FormGroup;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };
  
  public barChartType: ChartType = 'bar';
  
  public barChartData: any = {};

  demandChart: number = 0;
  vistoryChart: number = 0;
  constructionChart: number = 0;
  constructionConcludedChart: number = 0;





  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private satisfactionResearchService: SatisfactionResearchService,
    private userService: UserService,
    private companyService: CompanyService,
    private demandService: DemandService,
    private helpService: HelpService,
    private constructionService: ConstructionService,
    private dashboardService: DashboardService
  ) {
    this.formDados = this.formBuilder.group({
      monthDados: [1],

    })
    this.form = this.formBuilder.group({
      month: [1],
    })
  }

  ngOnInit() {
    this.dashboardService.getCharts().subscribe({
      next: data=>{

        this.demandChart = data.demands
        this.vistoryChart = data.vistory
        this.constructionChart = data.construction
        this.constructionConcludedChart = data.constructionConcluded

        this.barChartData = {
          labels: [' '],
          datasets: [
            { label: 'Demanda cadastradas', data: [this.demandChart], backgroundColor: '#FFEB3B' },  // Cor amarela
            { label: 'Vistorias', data: [this.vistoryChart], backgroundColor: '#2196F3' },             // Cor azul
            //{ label: 'Projetos entregues', data: [0], backgroundColor: '#9C27B0' },    // Cor roxa
            { label: 'Obras cadastradas', data: [this.constructionChart], backgroundColor: '#008480' },     // Cor #008480
            { label: 'Obras finalizadas', data: [this.constructionConcludedChart], backgroundColor: '#52DD5F' }      // Cor #52DD5F
          ]
        }
      }
    })
    this.searchList()
    this.loadingCount()
    
        
  }

  loadingCount(){
    let month =  this.formDados.controls['monthDados'].value
    
    this.dashboardService.getUserData(month).subscribe({
      next: data=>{
        this.beneficiary = data.beneficiario;
        this.companies = data.agent;
        this.demands = data.demands;
        this.help = data.help;
        this.inconsistency = data.inconsistency;
        this.construction = data.constructions;
      }
    })
  }

  searchList(){
    var month =  this.form.controls['month'].value
    this.satisfactionResearchService.listBeneficiaryMonth(month).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        let program = 0;
        let interaction = 0;
        let platform = 0;


        if(data.length> 0){

          for(let i=0; i< data.length; i++){
              program += data[i].programGrade
              interaction += data[i].professionalGrade
              platform += data[i].plataformGrade
          }
  
          this.listBenefiario = {
            platform: platform / data.length,
            interaction: interaction / data.length,
            program: program / data.length 
          };
        }else{
          this.listBenefiario = {
            platform: 0,
            interaction: 0,
            program: 0
          };
        }

      }
    })

    this.satisfactionResearchService.listProfessionalMonth(month).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        let program = 0;
        let interaction = 0;
        let platform = 0;


        if(data.length > 0){

          for(let i=0; i< data.length; i++){
              program += data[i].programGrade
              interaction += data[i].professionalGrade
              platform += data[i].plataformGrade
          }
  
          this.listProfessional = {
            platform: platform / data.length,
            interaction: interaction / data.length,
            program: program / data.length 
          };
        }else{
          this.listProfessional = {
            platform: 0,
            interaction: 0,
            program: 0 
          };
        }


      }
    })
  }
}
