package com.proyecto.service;

import com.proyecto.entity.Catalogo;

import java.util.List;

public interface CatalogoService {

	List<Catalogo> listarRegistrosActivoTrue();

	List<Catalogo> findAll();

}

