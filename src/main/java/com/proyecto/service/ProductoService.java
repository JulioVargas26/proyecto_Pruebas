package com.proyecto.service;

import com.proyecto.entity.Producto;

import java.util.List;
import java.util.Optional;

public interface ProductoService {

    Producto insertar(Producto obj);
    Producto actualizar(Producto obj);

    Optional<Producto> buscarPorId(Long id);
    List<Producto> listarRegistrosAll();
    List<Producto> listarRegistrosActivoTrue();

    List<Producto> buscarPorFiltrosGestionProducto(String cod_prod, String des_prod);

}
