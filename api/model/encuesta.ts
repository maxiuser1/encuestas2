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
