package com.proyecto.repository;

import com.proyecto.entity.*;
import org.springframework.data.jpa.repository.*;

import java.util.*;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

	@Query("select c from Cliente c where c.registros.activo = true")
	List<Cliente> listarRegistrosActivoTrue();
}
