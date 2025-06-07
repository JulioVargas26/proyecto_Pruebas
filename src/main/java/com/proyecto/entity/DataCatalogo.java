package com.proyecto.entity;

import com.fasterxml.jackson.annotation.*;
import com.proyecto.util.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "data_catalogo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id_data_catalogo")
public class DataCatalogo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_data_catalogo;
	private String descripcion;

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_catalogo")
	private Catalogo catalogo;

	@Embedded
	private Registros registros = new Registros();

}
