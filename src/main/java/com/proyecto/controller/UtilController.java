package com.proyecto.controller;

import com.proyecto.entity.*;
import com.proyecto.service.*;
import com.proyecto.util.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class UtilController {

	@Autowired
	private DataCatalogoService dataCatalogoService;
	@Autowired
	private ProductoService productoService;
	@Autowired
	private ProveedorService proveedorService;
    @Autowired
    private UsuarioService usuarioService;
	@Autowired
	private ClienteService clienteService;
    @Autowired
    private AsistenciaService asistenciaService;

	@GetMapping("/listarProductoActivoTrue")
	@ResponseBody
	public List<Producto> listarProducto() {
		return productoService.listarRegistrosActivoTrue();
	}

	@GetMapping("/listarProveedorActivoTrue")
	@ResponseBody
	public List<Proveedor> listarProveedor() {
		return proveedorService.listarRegistrosActivoTrue();
	}

	@GetMapping("/listarUsuariosActivoTrue")
	@ResponseBody
	public List<Usuario> listarUsuario() {
		return usuarioService.listaUsuario();
	}

	@GetMapping("/listarAsistencias")
	@ResponseBody
	public List<Asistencia> listarAsistencia() {
		return asistenciaService.listarAsistencia();
	}

	@GetMapping("/listarClienteActivoTrue")
	@ResponseBody
	public List<Cliente> listarCliente() {
		return clienteService.listarRegistrosActivoTrue();
	}


	@GetMapping("/listaTipoContacto")
	@ResponseBody
	public HashMap<String, String> listaTipoContacto() {
		TipoContacto[] tipoContactos = TipoContacto.values();
		HashMap<String, String> map = new HashMap<String, String>();
		for (TipoContacto item : tipoContactos) {
			map.put(item.toString(), item.toString());
		}
		System.out.println("listar tipo documento " + map);
		return map;
	}

	@GetMapping("/listaTipoDocumento")
	@ResponseBody
	public HashMap<String, String> listaTipoDocumento() {
		TipoDocumento[] tipoDocumentos = TipoDocumento.values();
		HashMap<String, String> map = new HashMap<String, String>();
		for (TipoDocumento item : tipoDocumentos) {
			map.put(item.toString(), item.toString());
		}
		System.out.println("listar tipo documento " + map);
		return map;
	}

	@GetMapping("/listaTipoMoneda")
	@ResponseBody
	public HashMap<String, String> listaTipoMoneda() {
		TipoMoneda[] monedas = TipoMoneda.values();
		HashMap<String, String> map = new HashMap<String, String>();
		for (TipoMoneda item : monedas) {
			map.put(item.toString().substring(0, 3), item.toString().substring(4));
		}
		System.out.println("listar tipo moneda " + map);
		return map;
	}

	@GetMapping("/listarPorDataCatalogo/{catalogoId}")
	@ResponseBody
	public List<DataCatalogo> dataCatalogoList(@PathVariable Long catalogoId) {
		return dataCatalogoService.listarPorCatalogo(catalogoId);
	}



}
