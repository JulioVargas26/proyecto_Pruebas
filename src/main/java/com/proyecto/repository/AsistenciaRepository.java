package com.proyecto.repository;


import com.proyecto.entity.Asistencia;
import com.proyecto.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AsistenciaRepository extends JpaRepository<Asistencia, Long> {

    Optional<Asistencia> findByFechaAndUsuario(LocalDate fecha, Usuario usuario);

    @Query("SELECT a FROM Asistencia a WHERE a.usuario.idUsuario = :idUsuario AND MONTH(a.fecha) = :mes AND YEAR(a.fecha) = :anio")
    List<Asistencia> findByUsuarioAndMes(@Param("idUsuario") Long idUsuario, @Param("mes") int mes, @Param("anio") int anio);

    @Query("SELECT a FROM Asistencia a WHERE a.usuario.codigo LIKE %:cod_asis% AND CONCAT(a.usuario.nombres, ' ', a.usuario.apellidos) LIKE %:nom_asis%")
    List<Asistencia> buscarPorFiltrosGestionAsistencia(String cod_asis, String nom_asis);

    @Query("SELECT a FROM Asistencia a WHERE CONCAT(a.usuario.nombres, ' ', a.usuario.apellidos) LIKE %:nom_asis%")
    List<Asistencia> buscarPorNombresApellidos(String nom_asis);

} 
