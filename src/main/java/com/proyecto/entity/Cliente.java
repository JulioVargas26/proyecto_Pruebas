package com.proyecto.entity;

import com.proyecto.util.Registros;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idCliente")
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCliente;

	private String nombres;
	private String apellidos;

	@Column(unique = true, length = 8, nullable = false)
	private String dni;

	@Column(unique = true, nullable = false, length = 100)
	private String correo;

	@Column(length = 200, nullable = false)
	private String direccion;

	@Column(length = 15, nullable = false)
	private String telefono;

	public String getNombreCompleto() {
		return nombres.concat(" ").concat(apellidos);
	}

	@Embedded
	private Registros registros = new Registros();




}
