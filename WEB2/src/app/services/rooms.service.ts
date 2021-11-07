import { ISalaResposta } from './Interfaces/sala.interface';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { IContact, ISala } from './exercicios.interface';
import { HttpRoomService } from './http-room.service';

export interface IPutSala{
  isShow: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  att: IPutSala = {} as IPutSala;
  constructor(private http: HttpRoomService) {
  }

   registerRoom( room: ISala): Observable<Object> {
    const stringify = JSON.stringify(room);
    const roomJson = JSON.parse(stringify);

     return  this.http.post(`register`, roomJson);
   }

   registerContact( room: IContact): Observable<Object> {
    const stringify = JSON.stringify(room);
    const roomJson = JSON.parse(stringify);

     return  this.http.post(`contacted`, roomJson);
   }

   getSalasByProfessorId(id: string) {

    return this.http.get(`salas/${id}`);
   }

   getSalasByAlunoId(idAluno: string): Observable<Object> {
    const stringify = JSON.stringify(idAluno);
    const idJson = JSON.parse(stringify);

    return this.http.get(`salas/aluno/${idJson}`);
   }

  getSalaByCodigo(codSala: string): Observable<Object>{
    const stringify = JSON.stringify(codSala);
    const codeJson = JSON.parse(stringify);

    return this.http.get(`sala/${codeJson}`);
   }

   updateSala(isShow: boolean, id: string) {
     this.att.isShow = isShow;
    const stringify = JSON.stringify(this.att);
    const isShowJson = JSON.parse(stringify);

    return this.http.patch('update', isShowJson, id);
   }

   updateSalaAlunosById(sala: ISalaResposta, idAluno: string) {
   const stringify = JSON.stringify(idAluno);
   const salaJson = JSON.parse(stringify);

   return this.http.patch('update', salaJson, sala._id);
  }

}
