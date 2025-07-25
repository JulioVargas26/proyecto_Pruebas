package com.proyecto.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rol")
@Getter
@Setter
public class Rol {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idRol;
	private String nombre;

}
