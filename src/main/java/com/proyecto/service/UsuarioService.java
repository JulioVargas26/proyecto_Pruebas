package com.proyecto.service;


import com.proyecto.entity.*;

import java.util.*;

public interface UsuarioService {

	Usuario validarSesion(String vLogin);
	/*Usuario login(String login, String password);*/

	/*public abstract Usuario login(Usuario bean);*/

	List<Opcion> traerEnlacesDeUsuario(Long idUsuario);

	List<Rol> traerRolesDeUsuario(Long idUsuario);

	Usuario buscaPorLogin(String login);
	Usuario buscarPorCorreo(String correo);
	Usuario registrarUsuario(Usuario obj);
	Usuario actualizar(Usuario obj);
	List<Usuario> BuscaPorNombreUsu(String usu);

	// ROL DE USUARIO
	List<Usuario> listaUsuario();

	List<Rol> traerRolDeUsuario(Long idUsuario);

	Optional<UsuarioHasRol> buscaRol(UsuarioHasRolPK ojb);

	UsuarioHasRol insertaRol(UsuarioHasRol ojb);

	void eliminaRol(UsuarioHasRol obj);

	List<Object> getObjUsuario(Long idUsuario);

	List<Rol> traerRolesPorDni(String dni);

	List<Usuario> listarRegistrosActivoTrue();

	Optional<Usuario> buscarPorId(Long id);

}
