export interface Gerencia {
    id?: string;
    nombre?: string;
    empresa?: string;
    subgerencias?: Subgerencia[];
}

export interface Subgerencia {
    nombre?: string;
    areas?: Area[];
}

export interface Area {
    nombre?: string;
    servicios?: Servicio[];
}

export interface Servicio {
    nombre?: string;
    responsable?: Responsable;
    equipo?: Responsable[];
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
