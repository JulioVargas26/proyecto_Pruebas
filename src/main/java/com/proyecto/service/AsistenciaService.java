package com.proyecto.service;


import com.proyecto.entity.Asistencia;

import java.util.List;

public interface AsistenciaService {
    
    List<Asistencia> listarAsistencia();

    List<Asistencia> buscarAsistenciaPorNomApe(String nom_asis);

    List<Asistencia> buscarPorFiltrosGestionAsistencia(String cod_asis, String nom_asis);

    String registrarAsistencia(String codigo,String tipo);

    long calcularHorasTotales(Long idUsuario, int mes, int anio);
}
