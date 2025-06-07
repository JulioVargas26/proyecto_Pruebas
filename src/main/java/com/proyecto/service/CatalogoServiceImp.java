package com.proyecto.service;

import com.proyecto.entity.Catalogo;
import com.proyecto.repository.CatalogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogoServiceImp implements CatalogoService {

	@Autowired
	private CatalogoRepository catalogoRepository;

	@Override
	public List<Catalogo> listarRegistrosActivoTrue() {
		return catalogoRepository.listarRegistrosActivoTrue();
	}

	@Override
	public List<Catalogo> findAll() {
		return catalogoRepository.findAll();
	}



}
