package com.proyecto.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "opcion")
@Getter
@Setter
public class Opcion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idOpcion;

	private Long tipo;
	private String url_icono;
	private String nombre;
	private String ruta;
	private boolean estado;

}
