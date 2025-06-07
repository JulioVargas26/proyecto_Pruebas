package com.proyecto.repository;

import com.proyecto.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	@Query("select u from Usuario u where u.login=?1")
    Usuario iniciarSesion(String login);

	@Query("Select p from Opcion p, RolHasOpcion pr, Rol r, UsuarioHasRol u where  p.idOpcion = pr.opcion.idOpcion and pr.rol.idRol = r.idRol and r.idRol = u.rol.idRol and u.usuario.idUsuario = :var_idUsuario")
	List<Opcion> traerEnlacesDeUsuario(@Param("var_idUsuario") Long idUsuario);

	@Query("Select r from Rol r, UsuarioHasRol u where r.idRol = u.rol.idRol and u.usuario.idUsuario = :var_idUsuario")
	List<Rol> traerRolesDeUsuario(@Param("var_idUsuario") Long idUsuario);

	@Query("Select x from Usuario  x where x.correo = ?1")
	Usuario findByCorreo(String correo);

	@Query("Select u.rol, u.usuario from UsuarioHasRol u where u.usuario.idUsuario = ?1")
	List<Object> getObjUsuario(Long idUsuario);

	@Query("Select r from Rol r, UsuarioHasRol u where r.idRol = u.rol.idRol and u.usuario.dni = :var_dni")
	List<Rol> traerRolesPorDni(@Param("var_dni") String dni);

	Usuario findByLogin(String login);

	Optional<Usuario> findByCodigo(String codigo);

	@Query("select u from Usuario u " +
			"where u.registros.activo = true")
	List<Usuario> listarRegistrosActivoTrue();
}
