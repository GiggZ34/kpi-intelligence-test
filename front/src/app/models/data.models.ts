export interface IListApi<T> {
  count: number;
  current: number;
  next?: string;
  previous?: string;
  total_pages: number;
  results: T[];
}

export interface IProject {
  id: number;
  titreoperation: string;
  ppi: string;
  annee_d_individualisation?: string;
  nombre_de_lots?: number;
  enveloppe_prev_en_meu?: number;
  montant_des_ap_votes_en_meu?: number;
  mode_de_devolution: string;
  notification_du_marche?: Date;
  cao_attribution?: string;
  company_label?: string;
  project_management_label: string;
  representative_label: string;
  annee_de_livraison?: string;
  etat_d_avancement: string;
  company?: number;
  project_management: number;
  representative: number;
  establishment?: IEstablishment;
}

export interface ILocation {
  latitude?: number;
  longitude?: number;
}

export interface IEstablishment extends ILocation{
  code: string;
  label: string;
  city: string;
  projects?: IProject[];
}

export  interface ICity {
  label: string
}
