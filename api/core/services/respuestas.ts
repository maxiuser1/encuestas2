import { getGuid } from '../../common/Utils';
import {
    Area,
    Campana,
    Encuesta,
    Evaluacion,
    Gerencia,
    Gerenciard,
    Respuesta,
    Servicio,
    Subgerencia,
} from '../../model/gerencia';

export class Respuestas {
    public getResults(
        gerencias: Gerencia[],
        encuesta: Encuesta,
        campana: Campana
    ): Respuesta[] {
        const envi = process.env['envi'] ?? process.env['envi'];

        let respuestas: Respuesta[] = [];

        for (const gerencia of gerencias as Array<Gerencia>) {
            if (gerencia.gerenciasrd) {
                for (const gerenciaRd of gerencia.gerenciasrd as Array<Gerenciard>) {
                    if (gerenciaRd.subgerencias) {
                        for (const subgerencia of gerenciaRd.subgerencias as Array<Subgerencia>) {
                            if (subgerencia.areas) {
                                for (const area of subgerencia.areas as Array<Area>) {
                                    const servicios = area.servicios;
                                    procesarServicio(
                                        servicios,
                                        gerencia,
                                        gerenciaRd,
                                        subgerencia,
                                        area
                                    );
                                }
                            }

                            const servicios = subgerencia.servicios;
                            procesarServicio(
                                servicios,
                                gerencia,
                                gerenciaRd,
                                subgerencia,
                                null
                            );
                        }
                    }

                    if (gerenciaRd.areas) {
                        for (const area of gerenciaRd.areas as Array<Area>) {
                            const servicios = area.servicios;
                            procesarServicio(
                                servicios,
                                gerencia,
                                gerenciaRd,
                                null,
                                area
                            );
                        }
                    }
                }
            }

            if (gerencia.subgerencias) {
                for (const subgerencia of gerencia.subgerencias as Array<Subgerencia>) {
                    if (subgerencia.areas) {
                        for (const area of subgerencia.areas as Array<Area>) {
                            const servicios = area.servicios;
                            procesarServicio(
                                servicios,
                                gerencia,
                                null,
                                subgerencia,
                                area
                            );
                        }
                    }

                    const servicios = subgerencia.servicios;
                    procesarServicio(
                        servicios,
                        gerencia,
                        null,
                        subgerencia,
                        null
                    );
                }
            }

            if (gerencia.areas) {
                for (const area of gerencia.areas as Array<Area>) {
                    const servicios = area.servicios;
                    procesarServicio(servicios, gerencia, null, null, area);
                }
            }
        }

        function procesarServicio(
            servicios: Servicio[],
            gerencia: Gerencia,
            gerenciaRd: Gerenciard,
            subgerencia: Subgerencia,
            area: Area
        ) {
            if (servicios) {
                for (const servicio of servicios as Array<Servicio>) {
                    if (servicio.definidos && servicio.definidos.length > 0) {
                        for (const evaluador of servicio.definidos) {
                            let evaluacion: Evaluacion = {
                                gerenciaId: gerencia?.id,
                                gerencia: gerencia?.nombre,
                                gerenciardId: gerenciaRd?.id,
                                gerenciard: gerenciaRd?.nombre,
                                subgerenciaId: subgerencia?.id,
                                subgerencia: subgerencia?.nombre,
                                areaId: area?.id,
                                area: area?.nombre,
                                servicioId: servicio.id,
                                servicio: servicio.nombre,
                                preguntas: [],
                                responsableId: servicio.responsable?.id,
                                responsable: servicio.responsable?.name,
                            };

                            for (let cadaPregunta of encuesta.preguntas) {
                                if (
                                    cadaPregunta.tipos.some(
                                        (t) => t == servicio.tipo
                                    )
                                )
                                    evaluacion.preguntas.push({
                                        glosa: cadaPregunta.glosa,
                                        preguntaId: cadaPregunta.id,
                                        valor: '',
                                    });
                            }

                            if (
                                respuestas.some(
                                    (t) => t.evaluador.id == evaluador.id
                                )
                            ) {
                                let respuesta =
                                    respuestas[
                                        respuestas.findIndex(
                                            (t) =>
                                                t.evaluador.id == evaluador.id
                                        )
                                    ];
                                respuesta.evaluaciones.push(evaluacion);
                            } else {
                                let respuesta: Respuesta = {
                                    id: getGuid(),
                                    evaluador: {
                                        id: evaluador.id,
                                        name: evaluador.name,
                                        email:
                                            envi == 'PROD'
                                                ? evaluador.email
                                                : 'pe.jose.calderon@gmail.com',
                                    },
                                    evaluaciones: [],
                                    campana: {
                                        id: campana.id,
                                        nombre: campana.nombre,
                                        fechaLimite: campana.fechaLimite,
                                        encuestaId: campana.encuestaId,
                                        estado: campana.estado,
                                    },
                                };
                                respuesta.evaluaciones.push(evaluacion);
                                respuestas.push(respuesta);
                            }
                        }
                    }
                }
            }
        }
        return respuestas;
    }
}
