package com.proyecto.controller;

import com.proyecto.data.DTOProductoSave;
import com.proyecto.data.DTOProductoUpdate;
import com.proyecto.entity.DataCatalogo;
import com.proyecto.entity.Producto;
import com.proyecto.repository.ProductoRepository;
import com.proyecto.service.ProductoService;
import com.proyecto.util.AppSettings;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.proyecto.util.MessagesUtil.*;

@Controller
public class ProductoController {

    @Autowired
    ProductoService productoService;

    @GetMapping("/buscarPorGestionProducto")
    @ResponseBody
    public Map<String, Object> listaComplejo(@RequestParam(name = "cod_prod", required = false, defaultValue = "") String cod_prod, @RequestParam(name = "des_prod", required = false, defaultValue = "") String des_prod) {
        try {
            List<Producto> productos = productoService.buscarPorFiltrosGestionProducto("%" + cod_prod + "%", "%" + des_prod + "%");

            return productos.isEmpty() ? Collections.singletonMap(DEFAULT_MESSAGE_EMPTY_KEY, MESSAGE_LIST_EMPTY) : Collections.singletonMap(DEFAULT_LIST_KEY, productos);
        } catch (Exception e) {
            // log.error("Error al procesar la solicitud: " + e.getMessage(), e);
            return Collections.singletonMap(DEFAULT_MESSAGE_KEY, MSG_ERROR_DEFAULT);
        }

    }

    @RequestMapping("/insertProducto")
    @ResponseBody
    public Map<?, ?> registrarProducto(@ModelAttribute Producto obj, @RequestParam(name = "cod_producto") Long cod) {
        HashMap<String, Object> map = new HashMap<String, Object>();

        System.out.println("CODIGO PRODUCTO : " + obj.getCod_prod());
        System.out.println("DESCRIPCION PRODUCTO : " + obj.getDes_prod());
        System.out.println("TIPO MONEDA : " + obj.getTip_mone());
        System.out.println("PRECIO PRODUCTO : " + obj.getPre_prod());
        System.out.println("STOCK PRODUCTO : " + obj.getSto_prod());
        System.out.println("TIPO DOCUMENTO : " + obj.getTip_docu());
        System.out.println("DOCUMENTO PRODUCTO : " + obj.getDoc_prod());
        System.out.println("DATA CATALOGO : " + obj.getData_catalogo().getId_data_catalogo());
        System.out.println("REGISTROS : " + obj.getRegistros().getActivo() + " " + obj.getRegistros().getCreation_date() + " " + obj.getRegistros().getModification_date());

        try {
            if (cod == 0) {
                Producto objSalida = productoService.insertar(obj);
                System.out.println("ID NUEVO PRODUCTO : " + objSalida.getId_prod());

                if (objSalida == null) {
                    System.out.println("ERROR AL REGISTRAR PRODUCTO");
                    map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
                } else {
                    List<Producto> list = new ArrayList<>();
                    list.add(productoService.buscarPorId(objSalida.getId_prod()).get());
                    System.out.print("ID NUEVO PRODUCTO : " + obj.getId_prod());
                    map.put(DEFAULT_LIST_KEY, list);
                    map.put(DEFAULT_MESSAGE_KEY, MSG_REGISTRO_OK);
                }
            } else {
                obj.setId_prod(cod);
                obj.getRegistros().setActivo(AppSettings.ACTIVO);
                obj.getRegistros().setModification_date(new Date());
                Producto objSalida = productoService.actualizar(obj);
                if (objSalida == null) {
                    map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
                } else {
                    List<Producto> list = new ArrayList<>();
                    list.add(productoService.buscarPorId(objSalida.getId_prod()).get());
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

    /*@PutMapping("/actualizarProducto")
    @ResponseBody
    public Map<?, ?> updateProducto(Producto obj) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        if (ValidacionesUtil.esVacioInt(obj.getCodigo_producto())) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, "Campo Codigo no puede ser CERO");
			return map;
		}
		if (ValidacionesUtil.esVacio(obj.getNombre_producto())) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, "Campo apellido paterno vacío");
			return map;
		}
		if (ValidacionesUtil.esVacioDouble(obj.getStock_producto())) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, "Campo apellido materno vacío");
			return map;
		}
		if (ValidacionesUtil.esVacioDouble(obj.getPrecio_producto())) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, "Campo salario aprox. vacío");
			return map;
		}

		if (ValidacionesUtil.esVacio(String.valueOf(obj.getTipo_documento()))) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, "Escoge un tipo de documento");
			return map;
		}
		TipoDocumento[] tipoDocumentos = TipoDocumento.values();
		boolean coincidenciatipoDocumentos = false;
		for (TipoDocumento item : tipoDocumentos) {
			if (obj.getTipo_documento().equalsIgnoreCase(item.toString().substring(0, 3))) {
				obj.setTipo_documento(item.toString());
				coincidenciatipoDocumentos = true;
			}
		}
		if (!coincidenciatipoDocumentos) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, "Valor de Tipo Documento no valido");
			return map;
		}

		if (ValidacionesUtil.esVacio(obj.getDocumento_producto())) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, "Campo número documento vacío");
			return map;
		}

		if (ValidacionesUtil.esVacio(obj.getDescripcion_producto())) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, "Campo descripcion vacío");
			return map;
		}

		if (ValidacionesUtil.esVacio(obj.getTipo().getDescripcion())) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, "Escoge un tipo de producto");
			return map;
		}

     DataCatalogo dataCatalogo= dataCatalogoService.getFindById(obj.getData_catalogo().getIdDataCatalogo());
		if (dataCatalogo == null) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_TIPO_ERROR);
			return map;
		}
		obj.setData_catalogo(dataCatalogo);
		obj.getRegistros().setActivo(AppSettings.ACTIVO);
		obj.getRegistros().setModification_date(new Date());
		Producto objSalida = productoService.actualizar(obj);
		if (objSalida == null) {
			map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
		} else {
			List<Producto> list = new ArrayList<>();
			list.add(productoService.buscarPorId(objSalida.getId_prod()).get());
			map.put(DEFAULT_LIST_KEY, list);
			map.put(DEFAULT_MESSAGE_KEY, MSG_ACTUALIZACION_OK);
		}
		return map;
	}
*/

    @PostMapping("/cambiarEstadoProductoCrud")
    @ResponseBody
    public Map<?, ?> changeEstadoProductoCrud(Long id_producto) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        //Buscar Sala Por ID
        Producto objProducto = productoService.buscarPorId(id_producto).get(); //Update new data
        objProducto.getRegistros().setModification_date(new Date());
        objProducto.getRegistros().setActivo(objProducto.getRegistros().getActivo() == AppSettings.ACTIVO ? AppSettings.INACTIVO : AppSettings.ACTIVO);
        Producto objSalida = productoService.actualizar(objProducto);
        if (objSalida == null) {
            map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
        } else {
            List<Producto> listProducto = new ArrayList<>();
            listProducto.add(productoService.buscarPorId(objSalida.getId_prod()).get());
            map.put(DEFAULT_LIST_KEY, listProducto);
        }
        return map;
    }

}
