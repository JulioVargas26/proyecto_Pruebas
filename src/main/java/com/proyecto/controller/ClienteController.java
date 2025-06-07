package com.proyecto.controller;

import com.proyecto.entity.*;
import com.proyecto.service.*;
import com.proyecto.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.proyecto.util.MessagesUtil.*;

@Controller
public class ClienteController {

    @Autowired
   ClienteService clienteService;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private final static String DEFAULT_PARAM_VALUE = "-1";
    private final static String DEFAULT_MESSAGE_KEY = "MSG_OK";
    private final static String DEFAULT_MESSAGE_EMPTY_KEY = "MSG_EMPTY";
    private final static String DEFAULT_MESSAGE_ERROR_KEY = "MSG_ERROR";
    private final static String DEFAULT_LIST_KEY = "LIST";

 /*   @RequestMapping("/insertUsuario")
    @ResponseBody
    public Map<?, ?> registrarUsuario(@ModelAttribute Usuario obj, @RequestParam(name = "cod_usuario") Long cod) {
        HashMap<String, Object> map = new HashMap<String, Object>();

        System.out.println("ID Usuario : " + obj.getIdUsuario());
        System.out.println("LOGIN Usuario : " + obj.getLogin());
        System.out.println("PASSWORD Usuario : " + obj.getPassword());
        System.out.println("NOMBRES Usuario : " + obj.getNombreCompleto());
        System.out.println("DNI Usuario : " + obj.getDni());
        System.out.println("CORREO Usuario : " + obj.getCorreo());
        System.out.println("DIRECCION Usuario : " + obj.getDireccion());
        System.out.println("TELEFONO Usuario : " + obj.getTelefono());
        System.out.println("FECHA NAC Usuario : " + obj.getFechaNacimiento());

        System.out.println("REGISTROS : " + obj.getRegistros().getActivo() + " " + obj.getRegistros().getCreation_date() + " " + obj.getRegistros().getModification_date());

        try {
            if (cod == 0) {

                Usuario objSalida = usuarioService.registrarUsuario(obj);
                System.out.println("ID NUEVO Usuario : " + objSalida.getIdUsuario());

                if (objSalida == null) {
                    System.out.println("ERROR AL REGISTRAR Usuario");
                    map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
                } else {
                    List<Usuario> list = new ArrayList<>();
                    list.add(usuarioService.buscarPorId(objSalida.getIdUsuario()).get());
                    System.out.print("ID NUEVO Usuario : " + obj.getIdUsuario());
                    map.put(DEFAULT_LIST_KEY, list);
                    map.put(DEFAULT_MESSAGE_KEY, MSG_REGISTRO_OK);
                }
            } else {
                obj.setIdUsuario(cod);
                obj.getRegistros().setActivo(AppSettings.ACTIVO);
                obj.getRegistros().setModification_date(new Date());
                Usuario objSalida = usuarioService.actualizar(obj);
                if (objSalida == null) {
                    map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
                } else {
                    List<Usuario> list = new ArrayList<>();
                    list.add(usuarioService.buscarPorId(objSalida.getIdUsuario()).get());
                    System.out.print("ID Usuario ACTUALIZADO: " + obj.getIdUsuario());
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
*/
    @PostMapping("/cambiarEstadoClienteCrud")
    @ResponseBody
    public Map<?, ?> changeEstadoClienteCrud(Long idCliente) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        //Buscar Sala Por ID
        Cliente objCliente = clienteService.buscarPorId(idCliente).get(); //Update new data
        objCliente.getRegistros().setModification_date(new Date());
        objCliente.getRegistros().setActivo(objCliente.getRegistros().getActivo() == AppSettings.ACTIVO ? AppSettings.INACTIVO : AppSettings.ACTIVO);
        Cliente objSalida = clienteService.actualizarCliente(objCliente);
        if (objSalida == null) {
            map.put(DEFAULT_MESSAGE_ERROR_KEY, MSG_ERROR_REGISTRO);
        } else {
            List<Cliente> clienteList = new ArrayList<>();
            clienteList.add(clienteService.buscarPorId(objSalida.getIdCliente()).get());
            map.put(DEFAULT_LIST_KEY, clienteList);
        }
        return map;
    }


}