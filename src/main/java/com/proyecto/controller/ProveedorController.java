package com.proyecto.controller;

import com.proyecto.entity.Proveedor;
import com.proyecto.service.ProveedorService;
import com.proyecto.util.AppSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.proyecto.util.MessagesUtil.*;

@Controller
public class ProveedorController {

	@Autowired
	ProveedorService ProveedorService;

	private final static String DEFAULT_PARAM_VALUE = "-1";
	private final static String DEFAULT_MESSAGE_KEY = "MSG_OK";
	private final static String DEFAULT_MESSAGE_EMPTY_KEY = "MSG_EMPTY";
	private final static String DEFAULT_MESSAGE_ERROR_KEY = "MSG_ERROR";
	private final static String DEFAULT_LIST_KEY = "LIST";

	@GetMapping("/buscarPorGestionProveedor")
	@ResponseBody
	public Map<String, Object> listaComplejo(
			@RequestParam(name = "ruc" , required = false, defaultValue = "") String ruc,
			@RequestParam(name = "razon_social" , required = false, defaultValue = "") String razon_social) {
		try {
			List<Proveedor> Proveedors = ProveedorService.buscarPorFiltrosGestionProveedor("%" +
					ruc + "%", "%" + razon_social + "%");

			return Proveedors.isEmpty()
					? Collections.singletonMap(DEFAULT_MESSAGE_EMPTY_KEY, MESSAGE_LIST_EMPTY)
					: Collections.singletonMap(DEFAULT_LIST_KEY, Proveedors);
		} catch (Exception e) {
			// log.error("Error al procesar la solicitud: " + e.getMessage(), e);
			return Collections.singletonMap(DEFAULT_MESSAGE_KEY, MSG_ERROR_DEFAULT);
		}

	}

	@RequestMapping("/insertProveedor")
	@ResponseBody
	public Map<?, ?> registrarProveedor( Proveedor obj, @RequestParam(name = "cod_proveedor") Long cod) {
		HashMap<String, Object> map = new HashMap<String, Object>();

		System.out.println("CODIGO Proveedor : " + obj.getId_prov());
		System.out.println("NOMBRE Proveedor : " + obj.getRazon_social());
		System.out.println("DIRECCION Proveedor : " + obj.getDireccion_fiscal());
		System.out.println("TELEFONO Proveedor : " + obj.getTelefono_contacto());
		System.out.println("CONTACTO Proveedor : " + obj.getTipo_contacto());
		System.out.println("NOMBRE Proveedor : " + obj.getNombre_contacto());
		System.out.println("EMAIL Proveedor : " + obj.getEmail_contacto());

		System.out.println("REGISTROS : " + obj.getRegistros().getActivo() + " " + obj.getRegistros().getCreation_date() + " " + obj.getRegistros().getModification_date());

		try {
			if (cod == 0) {
				Proveedor objSalida = ProveedorService.insertar(obj);
				System.out.println("ID NUEVO PROVEEDOR : " + objSalida.getId_prov());

				if (objSalida == null) {
					System.out.println("ERROR AL REGISTRAR PROVEEDOR");
					map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
				} else {
					List<Proveedor> list = new ArrayList<>();
					list.add(ProveedorService.buscarPorId(objSalida.getId_prov()).get());
					System.out.print("ID NUEVO PROVEEDOR : " + obj.getId_prov());
					map.put(DEFAULT_LIST_KEY, list);
					map.put(DEFAULT_MESSAGE_KEY, MSG_REGISTRO_OK);
				}
			} else {
				obj.setId_prov(cod);
				obj.getRegistros().setActivo(AppSettings.ACTIVO);
				obj.getRegistros().setModification_date(new Date());
				Proveedor objSalida = ProveedorService.actualizar(obj);
				if (objSalida == null) {
					map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
				} else {
					List<Proveedor> list = new ArrayList<>();
					list.add(ProveedorService.buscarPorId(objSalida.getId_prov()).get());
					System.out.print("ID PROVEEDOR ACTUALIZADO: " + obj.getId_prov());
					map.put(DEFAULT_LIST_KEY, list);
					map.put(DEFAULT_MESSAGE_KEY, MSG_ACTUALIZACION_OK);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			map.put("mensaje", "Error en el Registro");
			e.printStackTrace();
		}

		return map;
	}

	@PostMapping("/cambiarEstadoProveedorCrud")
	@ResponseBody
	public Map<?, ?> changeEstadoProveedorCrud(Long id_proveedor) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		//Buscar Sala Por ID
		Proveedor objProveedor = ProveedorService.buscarPorId(id_proveedor).get(); //Update new data
		objProveedor.getRegistros().setModification_date(new Date());
		objProveedor.getRegistros().setActivo(objProveedor.getRegistros().getActivo() == AppSettings.ACTIVO ? AppSettings.INACTIVO : AppSettings.ACTIVO);
		Proveedor objSalida =  ProveedorService.actualizar(objProveedor);
		if (objSalida == null) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
		} else {
			List<Proveedor> listProveedor = new ArrayList<>();
			listProveedor.add(ProveedorService.buscarPorId(objSalida.getId_prov()).get());
			map.put(DEFAULT_LIST_KEY, listProveedor);
		}
		return map;
	}

}
