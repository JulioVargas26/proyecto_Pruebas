package com.proyecto.entity;

import com.proyecto.util.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "catalogo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id_catalogo")
public class Catalogo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_catalogo;
	private String descripcion;

	@Embedded
	private Registros registros = new Registros();

}

