package com.proyecto.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.*;

@Entity
@Table(name = "asistencia")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id_asistencia")
public class Asistencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asistencia")
    private Long id_asistencia;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha; 

    @Column(name = "hora_entrada", nullable = false)
    private LocalTime hora_entrada;

    @Column(name = "hora_salida")
    private LocalTime hora_salida;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

}
