package com.proyecto.service;

import com.proyecto.entity.*;

import java.util.List;

public interface DataCatalogoService {

    List<DataCatalogo> listarRegistrosActivoTrue();

    List<DataCatalogo> listarPorCatalogo(Long catalogoId);


}
