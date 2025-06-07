package com.proyecto.repository;

import com.proyecto.entity.Opcion;
import com.proyecto.entity.Rol;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RolRepository extends JpaRepository<Rol, Long>{

	//@Query("Select x from Rol x where x.login = :#{#rol.login} and x.password = :#{#rol.password}")
	@Query("Select x from Rol x where x.nombre = :#{#rol.nombre}")
	Rol login(@Param(value ="rol") Rol bean);

	@Query("Select u.opcion from RolHasOpcion u where u.rol.idRol = ?1")
	List<Opcion> traerOpcionDeRol(Long idRol);

	@Query("Select u.opcion, u.rol from RolHasOpcion u where u.rol.idRol = ?1")
	List<Object> getObjRol(Long idRol);
}
