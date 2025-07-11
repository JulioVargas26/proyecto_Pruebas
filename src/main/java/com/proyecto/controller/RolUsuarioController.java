package com.proyecto.controller;

import com.proyecto.entity.*;
import com.proyecto.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class RolUsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private RolService rolService;

	@ResponseBody
	@GetMapping("/listaUsuario")
	public List<Usuario> listaUsuario() {
		return usuarioService.listaUsuario();
	}

	@ResponseBody
	@GetMapping("/listaRoles")
	public List<Rol> listaRol() {
		return rolService.listaRol();
	}

	@ResponseBody
	@GetMapping("/listaRolPorUsuario")
	public List<Rol> listaRolPorUsuario(Long idUsuario) {
		return usuarioService.traerRolDeUsuario(idUsuario);
	}

	@ResponseBody
	@PostMapping("/registraRol")
	public HashMap<String, Object> registro(Long idUsuario, Long idRol) {
		HashMap<String, Object> maps = new HashMap<String, Object>();
		UsuarioHasRolPK pk = new UsuarioHasRolPK();
		pk.setIdUsuario(idUsuario);
		pk.setIdRol(idRol);

		UsuarioHasRol obj = new UsuarioHasRol();
		obj.setUsuarioHasRolPk(pk);

		Optional<UsuarioHasRol> existenRol = usuarioService.buscaRol(pk);
		if (existenRol.isEmpty()) {
			UsuarioHasRol objSalida = usuarioService.insertaRol(obj);
			if (objSalida == null) {
				maps.put("mensaje", "Error en el registro");
			} else {
				maps.put("mensaje", "Registro existoso");
			}
		} else {
			maps.put("mensaje", "Ya existe el rol");
		}
		//List<Opcion> lstOpcion = rolService.traerOpcionDeRol(idRol);
		List<Object> lstRol = usuarioService.getObjUsuario(idUsuario);
		maps.put("lista", lstRol);
		maps.put("usuario", idUsuario);
		return maps;
	}

	@ResponseBody
	@PostMapping("/eliminaRol")
	public HashMap<String, Object> elimina(Long idUsuario, Long idRol) {
		HashMap<String, Object> maps = new HashMap<String, Object>();
		UsuarioHasRolPK pk = new UsuarioHasRolPK();
		pk.setIdRol(idRol);
		pk.setIdUsuario(idUsuario);

		UsuarioHasRol obj = new UsuarioHasRol();
		obj.setUsuarioHasRolPk(pk);

		usuarioService.eliminaRol(obj);
		maps.put("mensaje", "Eliminación exitosa");

		//List<Opcion> lstOpcion = rolService.traerOpcionDeRol(idRol);
		List<Object> lstRol = usuarioService.getObjUsuario(idUsuario);
		maps.put("lista", lstRol);
		maps.put("usuario", idUsuario);
		return maps;
	}

	// Usuario y Rol
	@ResponseBody
	@GetMapping("/getUsuarioListObj")
	public List<Object> getUsuarioListObj(Long idUsuario) {
		List<Object> listObjUsuario = usuarioService.getObjUsuario(idUsuario);
		return listObjUsuario;
	}
	
}
