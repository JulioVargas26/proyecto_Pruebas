package com.proyecto.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
public class UsuarioHasRolPK implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long idUsuario;
	private Long idRol;

}
