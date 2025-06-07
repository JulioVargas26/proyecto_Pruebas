package com.proyecto.service;

import com.proyecto.entity.Proveedor;

import java.util.*;

public interface ProveedorService {

    Proveedor insertar(Proveedor obj);
    Proveedor actualizar(Proveedor obj);

    Optional<Proveedor> buscarPorId(Long id);

    List<Proveedor> listarRegistrosActivoTrue();
    List<Proveedor> buscarPorFiltrosGestionProveedor(String ruc, String razon_social);

}
