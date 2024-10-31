import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandStatusEnum } from 'src/app/enums/demand-status.enum';
import { CompanyService } from 'src/app/services/company.service';
import { DemandService } from 'src/app/services/demand.service';

@Component({
  selector: 'app-promoting-agent-details',
  templateUrl: './promoting-agent-details.component.html',
  styleUrls: ['./promoting-agent-details.component.scss']
})
export class PromotingAgentDetailsComponent {
  responseDemands: any = [];
  pageDemands: number = 0;

  agentId = '';

  agent: any;
  demand: any;


  responseContracts: any = [];
  pageContracts: number = 0;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private demandService: DemandService
  ) { }

  back() {
    this.location.back();
  }

  ngOnInit() {
    this.agentId = this.route.snapshot.params['id']
    this.companyService.getById(this.agentId).subscribe({
      next: data => {
        this.agent = data;
      }
    })

    this.demandService.getByCompany(this.agentId).subscribe({
      next: data=>{
        console.log(data)
        this.demand = data;
      }
    })
  }

  getCnpj(cnpj: string){
    if(cnpj)
      return cnpj.substring(0,2) + '.' + cnpj.substring(2,5) + '.' + cnpj.substring(5,8) + '/' + cnpj.substring(8,12) + '-' + cnpj.substring(12,15);
    return
  }

  getCpf(cpf: string){
    if(cpf)
      return cpf.substring(0,3) + '.'+ cpf.substring(3,6) + '.' + cpf.substring(6,9) + '-' + cpf.substring(9,11);
    return
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
    switch (item) {
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

  openDemandDetails(item: any) { }

}
