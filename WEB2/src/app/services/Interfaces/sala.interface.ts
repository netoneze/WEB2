export interface ISala {
  codigo: string;
  description: string;
  idAluno?: string[];
  idProfessor?: string;
  createdAt?: string;
  isShow: boolean;
}

export interface ISalaResposta {
  idAluno?: string[];
  _id: string;
  codigo: string;
  description: string;
  idProfessor: string;
  __v: string;
}
