import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DemandStatusEnum } from 'src/app/enums/demand-status.enum';

@Component({
  selector: 'app-demands-info',
  templateUrl: './demands-info.component.html',
  styleUrls: ['./demands-info.component.scss']
})
export class DemandsInfoComponent {

  response: any;

  count: number = 0;


  constructor(
    private router: Router,
    private modalService: MatDialog,

  ) {

  }

  ngOnInit() {

    if(this.response.workRequest){
      for(let i =0; i< this.response.workRequest.room.length; i++){
          this.count += this.response.workRequest.room[i].roomSolutions.length;
      }
    }
  }

  close() {
    this.modalService.closeAll();
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

  getStatusClass(status: string): string {
    switch (status) {
      case DemandStatusEnum.CADASTRADO_VISTORIA || DemandStatusEnum.RASCUNHO:
        return 'status-requested';
      case DemandStatusEnum.RASCUNHO:
        return 'status-requested';
      case DemandStatusEnum.ESPERANDO_MELHORIA:
        return 'status-pending';
      case DemandStatusEnum.EM_ANALISE:
        return 'status-pending';
      case DemandStatusEnum.ESPERANDO_OBRA:
        return 'status-pending';
      case DemandStatusEnum.ESPERANDO_VALIDACAO:
        return 'status-pending';
      case 'refused':
        return 'status-refused';
      case 'new':
        return 'status-new';
      default:
        return 'status-default';
    }
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

  getInterventionDetails(value: string) {
    switch (value) {
      case 'NOVO_COMODO_ISOLADO':
        return { description: 'Novo cômodo isolado adaptável' };
      case 'NOVO_COMODO_CONTIGUO':
        return { description: 'Novo cômodo contiguo adaptável' };
      case 'NOVO_BANHEIRO_ISOLADO':
        return { description: 'Novo banheiro isolado adaptável' };
      case 'NOVO_BANHEIRO_CONTIGUO':
        return { description: 'Novo banheiro contíguo adaptável' };
      case 'REFORMA_BANHEIRO':
        return { description: 'Reforma de banheiro' };
      case 'ADAPTACAO_BANHEIRO':
        return { description: 'Adaptação de banheiro' };
      case 'REVESTIMENTO_PINTURA_EXTERNA':
        return { description: 'Revestimento e pintura externa da casa' };
      case 'REVESTIMENTO_PINTURA_INTERNA':
        return { description: 'Revestimento e pintura interna cômodo' };
      case 'PINTURA_INTERNA':
        return { description: 'Pintura interna cômodo' };
      case 'PINTURA_EXTERNA':
        return { description: 'Pintura externa da casa' };
      case 'FOSSA_SEPTICA_SUMIDOURO':
        return { description: 'Fossa séptica e sumidouro' };
      case 'COBERTURA':
        return { description: 'Cobertura - substituição de telha' };
      case 'COBERTURA_MADEIRA':
        return {
          description:
            'Cobertura - substituição da trama de madeira com as Telhas',
        };
      case 'COBERTURA_MADEIRA_CINTA':
        return {
          description:
            'Cobertura - substituição de telha, trama de madeira e cinta de amarração',
        };
      case 'INSTALACAO_CAIXA':
        return { description: `Instalação de caixa d'água` };
      case 'RAMPA_ACESSIBILIDADE':
        return { description: 'Rampa acessibilidade' };
      case 'ENTRADA_ENERGIA':
        return { description: 'Entrada energia casa' };
      case 'INSTALACAO_ELETRICA':
        return { description: 'Instalações elétricas - cômodo' };
      case 'INSTALACAO_HIDROSSANITARIA':
        return { description: 'Instalações hidrosanitárias' };
      case 'INSTALACAO_RETIRADA_PORTA':
        return { description: 'Retirada/colocação de porta' };
      case 'INSTALACAO_RETIRADA_JANELA':
        return { description: 'Retirada colocação de janela' };
      case 'CONTRAPISO_REVESTIMENTO':
        return {
          description: 'Contrapiso e revestimento cerâmico piso cômodo',
        };
      case 'FORRO':
        return { description: 'Forro de cômodo' };
      default:
        return { description: '' };
    }
  }
}
