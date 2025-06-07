package com.proyecto.controller;

import com.proyecto.entity.*;
import com.proyecto.security.*;
import com.proyecto.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.proyecto.util.MessagesUtil.*;


@Controller
@RequestMapping
@RequiredArgsConstructor
public class AsistenciaController {

    @Autowired
    AsistenciaService asistenciaService;

    @GetMapping("/buscarAsistenciaPorNomApes")
    @ResponseBody
    public Map<String, Object> listaNomApe(@RequestParam(name = "nom_asis", required = false, defaultValue = "") String nom_asis) {
        try {
            List<Asistencia> asistencias = asistenciaService.buscarAsistenciaPorNomApe(
                    "%" + nom_asis + "%");

            return asistencias.isEmpty() ? Collections.singletonMap(DEFAULT_MESSAGE_EMPTY_KEY, MESSAGE_LIST_EMPTY) :
                    Collections.singletonMap(DEFAULT_LIST_KEY, asistencias);
        } catch (Exception e) {
            // log.error("Error al procesar la solicitud: " + e.getMessage(), e);
            return Collections.singletonMap(DEFAULT_MESSAGE_KEY, MSG_ERROR_DEFAULT);
        }

    }

    @GetMapping("/buscarPorGestionAsistencia")
    @ResponseBody
    public Map<String, Object> listaComplejo(@RequestParam(name = "cod_asis", required = false, defaultValue = "") String cod_asis, @RequestParam(name = "nom_asis", required = false, defaultValue = "") String nom_asis) {
        try {
            List<Asistencia> asistencias = asistenciaService.buscarPorFiltrosGestionAsistencia("%" + cod_asis + "%",
                    "%" + nom_asis + "%");

            return asistencias.isEmpty() ? Collections.singletonMap(DEFAULT_MESSAGE_EMPTY_KEY, MESSAGE_LIST_EMPTY) :
                    Collections.singletonMap(DEFAULT_LIST_KEY, asistencias);
        } catch (Exception e) {
            // log.error("Error al procesar la solicitud: " + e.getMessage(), e);
            return Collections.singletonMap(DEFAULT_MESSAGE_KEY, MSG_ERROR_DEFAULT);
        }

    }

    /*@GetMapping("/registrarAsistencia")
    @ResponseBody
    public Map<?, ?> registrarAsistencia(@RequestParam("codigo") String codigo,
                                      @RequestParam("tipo") String tipo) {

        HashMap<String, Object> map = new HashMap<String, Object>();

         try {
            String mensaje = asistenciaService.registrarAsistencia(codigo, tipo);
            map.put("mensaje", mensaje);
        } catch (UsuarioNotFoundException e) {
            map.put("mensaje", "Error: " + e.getMessage());
        } catch (Exception e) {
            map.put("mensaje", "Error inesperado: " + e.getMessage());
        }
        return map;
    }*/

    @PostMapping("/registrarAsistencia")
    public String registrarAsistencia(@RequestParam("codigo") String codigo,
                                      @RequestParam("tipo") String tipo,
                                      Model model) {
        try {
            String mensaje = asistenciaService.registrarAsistencia(codigo, tipo);
            model.addAttribute("mensaje", mensaje);
        } catch (UsuarioNotFoundException e) {
            model.addAttribute("mensaje", "Error: " + e.getMessage());
        } catch (Exception e) {
            model.addAttribute("mensaje", "Error inesperado: " + e.getMessage());
        }
        return "assistance/listaAsistencia";
    }
    
}
