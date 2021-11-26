export interface Gerencia {
    id?: string;
    nombre?: string;
    empresa?: string;
    subgerencias?: Subgerencia[];
    responsable?: Responsable;
}

export interface Subgerencia {
    nombre?: string;
    areas?: Area[];
    responsable?: Responsable;
}

export interface Area {
    nombre?: string;
    servicios?: Servicio[];
    responsable?: Responsable;
}

export interface Servicio {
    nombre?: string;
    responsable?: Responsable;
    equipo?: Responsable[];
    ascritos?: Responsable[];
    tipo?: string;
}

export interface Responsable {
    id?: string;
    name?: string;
    email?: string;
}

export interface Persona {
    id?: string;
    name?: string;
    email?: string;
}
