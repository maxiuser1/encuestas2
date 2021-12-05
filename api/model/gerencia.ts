export interface Gerencia {
    id?: string;
    nombre?: string;
    empresa?: string;
    gerenciasrd?: Gerenciard[];
    subgerencias?: Subgerencia[];
    areas?: Area[];
    responsable?: Responsable;
}

export interface Gerenciard {
    id?: string;
    nombre?: string;
    areas?: Area[];
    responsable?: Responsable;
    subgerencias?: Subgerencia[];
}

export interface Subgerencia {
    id?: string;
    nombre?: string;
    areas?: Area[];
    responsable?: Responsable;
    servicios?: Servicio[];
}

export interface Area {
    id?: string;
    nombre?: string;
    servicios?: Servicio[];
    responsable?: Responsable;
}

export interface Servicio {
    id?: string;
    nombre?: string;
    responsable?: Responsable;
    equipo?: Responsable[];
    ascritos?: Responsable[];
    definidos?: Responsable[];
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

export interface Asignable {
    id?: string;
    nombre?: string;
    responsable?: Responsable;
}

export interface Campana {
    id?: string;
    nombre?: string;
    fechaLimite?: Date;
}

export interface Encuesta {
    id?: string;
    nombre?: string;
}

export interface Respuesta {
    id?: string;
    evaluador?: Responsable;
    campana?: Campana;
    evaluaciones?: Evaluacion[];
    completada?: boolean;
}

export interface Evaluacion {
    id?: string;
    servicioId?: string;
    servicioNombre?: string;
    preguntas?: ItemPregunta[];
    obligatoria?: boolean;
}

export interface ItemPregunta {
    id?: string;
    glosa?: string;
    valor?: string;
}
