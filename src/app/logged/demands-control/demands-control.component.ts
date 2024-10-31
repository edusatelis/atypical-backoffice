import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { DemandStatusEnum } from 'src/app/enums/demand-status.enum';
import { DemandService } from 'src/app/services/demand.service';
import { DemandsInfoComponent } from './demands-info/demands-info.component';

@Component({
  selector: 'app-demands-control',
  templateUrl: './demands-control.component.html',
  styleUrls: ['./demands-control.component.scss']
})
export class DemandsControlComponent {
  mapOn: boolean = false;

  response: any = [];
  page: number = 0;

  filtersOn: boolean = false;

  formSearch: FormGroup;
  Search: FormGroup;

  submited: boolean = false;

  responseOriginal: string = '';

  loading: boolean = false;
  message: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: MatDialog,
    private demandService: DemandService

  ) {
    this.formSearch = this.formBuilder.group({
      phase: [''],
      status: [''],
      visitDeliveryDate: [''],
    })
    this.Search = this.formBuilder.group({
      busca: ['']
    })
  }

  ngOnInit() {
    this.message = 'Carregando Demandas';
    this.loading = true;
    this.demandService.list().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: data => {
        // console.log(data);
        this.response = data;
        this.responseOriginal = JSON.stringify(data);
      }
    })
  }

  search() {

    const searchTerm = this.Search.controls['busca'].value
    if (searchTerm) {

        this.response = this.response.filter((item: any) =>  item.beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      const arr = JSON.parse(this.responseOriginal);

        this.response = [...arr];
    }
  }

  openMap() {
    this.mapOn = !this.mapOn
  }

  openFilters() {
    this.filtersOn = !this.filtersOn
  }

  submit() {
    // this.response = []
    // this.submited = true;

    const arr = JSON.parse(this.responseOriginal);
    let verifyStatusOk: any = [];
    let verifyPhaseOk: any = [];

    if (this.formSearch.controls['status'].value !== '' && this.formSearch.controls['status'].value !== null && this.formSearch.controls['status'].value !== undefined) {
      for (let item of arr) {
        const verifyStatus = this.getStatus(item);
        if (verifyStatus === this.formSearch.controls['status'].value) {
          verifyStatusOk.push(item);
        }
      }
    } else {
      verifyStatusOk = arr; 
    }

    if (this.formSearch.controls['phase'].value !== '' && this.formSearch.controls['phase'].value !== null && this.formSearch.controls['phase'].value !== undefined) {
      for (let iterator of verifyStatusOk) {
        const verifyPhase = this.getPhase(iterator.status);
        if (verifyPhase === this.formSearch.controls['phase'].value) {
          verifyPhaseOk.push(iterator);
        }
      }
    } else {
      verifyPhaseOk = verifyStatusOk;
    }

    this.response = verifyPhaseOk;
}

  openInfo(user: any) {
    const modalRef = this.modalService.open(DemandsInfoComponent, {
      height: '600px',
      width: '680px',
    });
    modalRef.componentInstance.response = user;
    modalRef.afterClosed().subscribe({
      next: data => {

      }
    })
  }

  openProfessionalDetails(professional: any) {
    console.log(professional)
     this.router.navigate([`/logged/professional-detail/${professional.id}`])
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
      case DemandStatusEnum.CADASTRADO_VISTORIA:
        return 'Vistoria';
      case DemandStatusEnum.RASCUNHO:
        return 'Vistoria';
      case DemandStatusEnum.EM_ANALISE:
        return 'Projeto de melhoria';
      case DemandStatusEnum.ESPERANDO_MELHORIA:
        return 'Projeto de melhoria';
      case DemandStatusEnum.ESPERANDO_OBRA: 
        return 'Obra em andamento';
      case DemandStatusEnum.CONCLUIR_OBRAS:
        return 'Obra em andamento';
      case DemandStatusEnum.ESPERANDO_VALIDACAO:
        return 'Obra em andamento';
      case DemandStatusEnum.CONCLUIDO:
        return 'Concluído';
      default:
        return 'Status Desconhecido';
    }
  }
}
