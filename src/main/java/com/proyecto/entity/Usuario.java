package com.proyecto.entity;

import com.fasterxml.jackson.annotation.*;
import com.proyecto.util.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Table(name="usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idUsuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idUsuario;

	@Column(unique = true)
	private String login;
	private String password;


	private String nombres;
	private String apellidos;
	private String dni;
	private String correo;
	private String direccion;
	private String telefono;

	@Column(name="codigo",length = 50, nullable = false)
	private String codigo;

	@JsonBackReference
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "usuario")
	private List<UsuarioHasRol> usuarioHasRol;

	@Temporal(TemporalType.DATE)
	/*@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "America/Lima")*/
	private String fechaNacimiento;

	public String getNombreCompleto() {
		return nombres.concat(" ").concat(apellidos);
	}

	@Embedded
	private Registros registros = new Registros();



}
