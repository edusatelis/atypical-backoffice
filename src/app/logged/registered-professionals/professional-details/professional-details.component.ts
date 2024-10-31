import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandStatusEnum } from 'src/app/enums/demand-status.enum';
import { CompanyService } from 'src/app/services/company.service';
import { DemandService } from 'src/app/services/demand.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.scss']
})
export class ProfessionalDetailsComponent {

  responseDemands: any = [];
  pageDemands: number = 0;

  employeeId = '';

  employee: any;

  company: any;

  responseContracts: any = [];
  pageContracts: number = 0;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private employeService: EmployeeService,
    private companyService: CompanyService,
    private demandService: DemandService
  ) { }

  back() {
    this.location.back();
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['_id']
    this.employeService.getById(this.employeeId).subscribe({
      next: data => {
        console.log('employe', data);

        this.employee = data;
        this.companyService.getByEmployerId(this.employee?.user?.id).subscribe({
          next: data => {
            console.log('company', data);
            this.demandService.getByProfessionalId(this.employee?.user?.id).subscribe({
              next: data => {
                console.log('demand', data);
                this.responseDemands = data;
              }
            })


            this.company = data;
          }
        })
      }
    })



  }

  getCnpj(cnpj: string) {
    if (cnpj)
      return cnpj.substring(0, 2) + '.' + cnpj.substring(2, 5) + '.' + cnpj.substring(5, 8) + '/' + cnpj.substring(8, 12) + '-' + cnpj.substring(12, 15);
    return
  }

  getCpf(cpf: string) {
    if (cpf)
      return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9, 11);
    return
  }

  getDate(date: any) {
    if (date) {
      let year = date.substring(0, 4)
      let month = date.substring(5, 7)
      let day = date.substring(8, 10)

      return day + '/' + month + '/' + year
    }
    return
  }

  openDemandDetails(item: any) {
    
  }

  getPhase(item: DemandStatusEnum) {
    switch (item) {
      case DemandStatusEnum.RASCUNHO:
        return 'Cadastro de demanda';
      case DemandStatusEnum.CADASTRADO_VISTORIA || DemandStatusEnum.RASCUNHO:
        return 'Vistoria';
      case DemandStatusEnum.EM_ANALISE || DemandStatusEnum.ESPERANDO_MELHORIA:
        return 'Projeto de melhoria';
      case DemandStatusEnum.ESPERANDO_OBRA || DemandStatusEnum.CONCLUIR_OBRAS || DemandStatusEnum.ESPERANDO_VALIDACAO:
        return 'Obra em andamento';
      case DemandStatusEnum.CONCLUIDO:
        return 'Concluído';
      default:
        return 'Status Desconhecido';
    }
  }

  getStatus(item: any): string {
    switch (item.status) {
      case DemandStatusEnum.RASCUNHO:
        return 'Rascunho';
      case DemandStatusEnum.CADASTRADO_VISTORIA:
        return 'Vistoria solicitada';
      case DemandStatusEnum.ESPERANDO_MELHORIA:
        return 'Aguardando intervenções';
      case DemandStatusEnum.EM_ANALISE:
        return 'Aprovação pendente analise';
      case DemandStatusEnum.ESPERANDO_OBRA:
        return 'Cadastrar obra';
      case DemandStatusEnum.CONCLUIR_OBRAS && item?.construction?.status === 'FOTOS_EM_ANALISE':
        return 'Fotos em analise';
      case DemandStatusEnum.CONCLUIR_OBRAS && item?.construction?.status === 'REFAZER_FOTOS':
        return 'Refazer fotos';
      case DemandStatusEnum.CONCLUIR_OBRAS && item?.construction?.status !== 'REFAZER_FOTOS' && item?.construction?.status !== 'FOTOS_EM_ANALISE':
        return 'Obra em andamento';
      case DemandStatusEnum.CONCLUIDO && item?.construction?.status !== 'FOTOS_CONCLUIDAS':
        return 'Obra concluida';
      case DemandStatusEnum.CONCLUIDO && item?.construction?.status === 'FOTOS_CONCLUIDAS':
        return 'Fotos analisadas - Obra concluida';
      case DemandStatusEnum.ESPERANDO_VALIDACAO:
        return 'Aprovação pendente';
      default:
        return 'Status Desconhecido';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'requested':
        return 'status-requested';
      case 'pending':
        return 'status-pending';
      case 'refused':
        return 'status-refused';
      case 'new':
        return 'status-new';
      default:
        return 'status-default';
    }
  }
}
