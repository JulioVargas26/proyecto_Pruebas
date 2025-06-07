package com.proyecto.service;

import com.proyecto.entity.*;
import com.proyecto.repository.*;
import com.proyecto.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository repository;

	@Autowired
	private UsuarioHasRolRepository usuarioHasRolRepository;

	@Autowired
    private BCryptPasswordEncoder encriptar;

	public Usuario validarSesion(String vLogin) {
		return repository.iniciarSesion(vLogin);
	}

	@Override
	public List<Opcion> traerEnlacesDeUsuario(Long id_usuario) {
		return repository.traerEnlacesDeUsuario(id_usuario);
	}

	@Override
	public List<Rol> traerRolesDeUsuario(Long id_usuario) {
		return repository.traerRolesDeUsuario(id_usuario);
	}

	@Override
	public Usuario buscaPorLogin(String login) {
		return repository.findByLogin(login);
	}

	@Override
	public Usuario buscarPorCorreo(String correo) {
		return repository.findByCorreo(correo);
	}

	@Override
	public Usuario registrarUsuario(Usuario bean) {
		// Guardar el Usuario

		bean.setPassword(encriptar.encode(bean.getPassword()));
		bean.setCodigo(bean.getLogin());
		Usuario objSalida = repository.save(bean);

		Long id_rol = AppSettings.ROL_USUARIO;

		// Configurar UsuarioHasRolPK
		UsuarioHasRolPK hasRolPK = new UsuarioHasRolPK();
		hasRolPK.setIdUsuario(objSalida.getIdUsuario());
		hasRolPK.setIdRol(id_rol);

		// Crear y guardar UsuarioHasRol
		UsuarioHasRol usuarioHasRol = new UsuarioHasRol();
		usuarioHasRol.setUsuarioHasRolPk(hasRolPK);
		usuarioHasRolRepository.save(usuarioHasRol);

		return objSalida;
	}

	@Override
	public Usuario actualizar(Usuario p) {
		return repository.save(p);
	}

	@Override
	public List<Usuario> BuscaPorNombreUsu(String usu) {
		return repository.findAll();
	}



	// ROL DE USUARIO

	@Override
	public List<Usuario> listaUsuario() {
		return repository.findAll();
	}

	@Override
	public List<Rol> traerRolDeUsuario(Long id_usuario) {
		return repository.traerRolesDeUsuario(id_usuario);
	}

	@Override
	public Optional<UsuarioHasRol> buscaRol(UsuarioHasRolPK ojb) {
		return usuarioHasRolRepository.findById(ojb);
	}

	@Override
	public UsuarioHasRol insertaRol(UsuarioHasRol ojb) {
		return usuarioHasRolRepository.save(ojb);
	}

	@Override
	public void eliminaRol(UsuarioHasRol obj) {
		usuarioHasRolRepository.delete(obj);
	}

	@Override
	public List<Object> getObjUsuario(Long id_usuario) {
		return repository.getObjUsuario(id_usuario);
	}

	@Override
	public List<Rol> traerRolesPorDni(String dni) {
		return repository.traerRolesPorDni(dni);
	}

	@Override
	public List<Usuario> listarRegistrosActivoTrue() {
		return repository.listarRegistrosActivoTrue();
	}

	@Override
	public Optional<Usuario> buscarPorId(Long id) {
		return repository.findById(id);
	}

}
