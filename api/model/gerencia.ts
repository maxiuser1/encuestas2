export interface Gerencia {
    id?: string;
    nombre?: string;
    empresa?: string;
    gerenciasrd?: Gerenciard[];
    subgerencias?: Subgerencia[];
    areas?: Area[];
    responsable?: Responsable;
    compania?: string;
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
    deshabilitado?: boolean;
    compania?: string;
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
    encuestaId?: string;
    listos?: string[];
    total?: number;
    estado?: number; //1 creado, 2 configurado, 3 enviado, 4 terminado, 5 eliminado
}

export interface Encuesta {
    id?: string;
    nombre?: string;
    preguntas?: Pregunta[];
}

export interface Pregunta {
    id?: string;
    glosa?: string;
    tipos?: string[];
    orden?: number;
}

export interface Respuesta {
    id?: string;
    evaluador: Responsable;
    campana?: Campana;
    evaluaciones?: Evaluacion[];
    completada?: boolean;
}

export interface Evaluacion {
    id?: string;

    preguntas?: ItemRespuesta[];
    obligatoria?: boolean;

    gerenciaId?: string;
    gerencia?: string;

    gerenciardId?: string;
    gerenciard?: string;

    subgerenciaId?: string;
    subgerencia?: string;

    areaId?: string;
    area?: string;

    servicioId?: string;
    servicio?: string;

    responsableId?: string;
    responsable?: string;
}

export interface ItemRespuesta {
    id?: string;
    preguntaId?: string;
    glosa?: string;
    valor?: string;
}

export interface Suscripcion {
    id?: string;
    servicioId?: string;
    establecidos?: string[];
    suscritos?: string[];
    compania?: string;
}
