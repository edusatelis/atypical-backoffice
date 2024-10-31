import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DemandStatusEnum } from 'src/app/enums/demand-status.enum';

@Component({
  selector: 'app-demand-map-info',
  templateUrl: './demand-map-info.component.html',
  styleUrls: ['./demand-map-info.component.scss']
})
export class DemandMapInfoComponent {

  response: any;


  constructor(
    private modalService: NgbModal
  ) {}

  back() {
    this.modalService.dismissAll();
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
