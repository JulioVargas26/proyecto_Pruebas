package com.proyecto.controller;

import com.proyecto.service.CatalogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class EnlaceController {

    @Autowired
    private CatalogoService catalogoService;

    @GetMapping("/")
    public String verInicio() {
        return "login";
    }

    @GetMapping("verProductos")
    public String verProducto(Model model) {
        //crear atributos
        model.addAttribute("catalogos", catalogoService.findAll());
        return "product/producto";
    }

    @GetMapping("verProveedores")
    public String verProveedor() {
        return "product/proveedor";
    }

    @GetMapping("verCatalogos")
    public String verCatalogo() {
        return "product/catalogo";
    }

    @GetMapping("verAsistencias")
    public String verAsistencias() {
        return "assistance/listaAsistencia";
    }

    @GetMapping("verMarcacion")
    public String verMarcacion() {
        return "assistance/asistencia";
    }

    @GetMapping("verUsuarios")
    public String verUsuarios() {
        return "user/usuario";
    }

    @GetMapping("verClientes")
    public String verClientes() {
        return "client/cliente";
    }

    @GetMapping("verRoles")
    public String verRoles() {
        return "roles/rols";
    }

    @GetMapping("verEnlaces")
    public String verEnlaces() {
        return "roles/enlaces";
    }

}
