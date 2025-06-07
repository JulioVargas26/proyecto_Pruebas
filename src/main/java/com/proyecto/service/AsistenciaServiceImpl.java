package com.proyecto.service;


import com.proyecto.entity.Asistencia;
import com.proyecto.entity.Usuario;
import com.proyecto.repository.AsistenciaRepository;
import com.proyecto.repository.UsuarioRepository;
import com.proyecto.security.UsuarioNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AsistenciaServiceImpl implements AsistenciaService {

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    private final LocalTime HORA_INICIO = LocalTime.of(8, 0);
    private final LocalTime HORA_FIN = LocalTime.of(17, 0);

    @Override
    public List<Asistencia> listarAsistencia() {
        return asistenciaRepository.findAll();
    }

    @Override
    public List<Asistencia> buscarAsistenciaPorNomApe(String nom_asis) {
        return asistenciaRepository.buscarPorNombresApellidos(nom_asis);
    }

    @Override
    public List<Asistencia> buscarPorFiltrosGestionAsistencia(String cod_asis, String nom_asis) {
        return asistenciaRepository.buscarPorFiltrosGestionAsistencia(cod_asis, nom_asis);
    }

    @Override
    public String registrarAsistencia(String codigo, String tipo) {

        Usuario usuario = usuarioRepository.findByCodigo(codigo).orElseThrow(() -> new UsuarioNotFoundException("Usuario no encontrado"));

        LocalDate hoy = LocalDate.now();
        LocalTime ahora = LocalTime.now();

        Asistencia asistencia = asistenciaRepository.findByFechaAndUsuario(hoy, usuario).orElse(new Asistencia());

        asistencia.setUsuario(usuario);
        asistencia.setFecha(hoy);

        if ("ingreso".equals(tipo)) {
            if (ahora.isBefore(HORA_INICIO)) {
                return "Solo puede marcar ingreso a partir de las 8:00";
            }
            if (asistencia.getHora_entrada() != null) {
                return "El ingreso ya ha sido registrado.";
            }
            asistencia.setHora_entrada(ahora);
        }
        else if ("salida".equals(tipo)) {
            if (asistencia.getHora_entrada() == null) {
                return "Debe registrar primero el ingreso.";
            }
            if (asistencia.getHora_salida() != null) {
                return "La salida ya ha sido registrada.";
            }
            asistencia.setHora_salida(ahora);
        }
        else {
            return "Tipo no válido.";
        }


        asistenciaRepository.save(asistencia);
        return "Registro exitoso.";

    }

    @Override
    public long calcularHorasTotales(Long idUsuario, int mes, int anio) {
        List<Asistencia> asistencias = asistenciaRepository.findByUsuarioAndMes(idUsuario, mes, anio);
        long totalHoras = 0;

        for (Asistencia asistencia : asistencias) {
            if (asistencia.getHora_entrada() != null && asistencia.getHora_salida() != null) {
                Duration duracion = Duration.between(asistencia.getHora_entrada(), asistencia.getHora_salida());
                totalHoras += duracion.toHours();
            }
        }

        return totalHoras;
    }

}
