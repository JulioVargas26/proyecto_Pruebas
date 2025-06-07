package com.proyecto.service;

import com.proyecto.entity.*;
import com.proyecto.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataCatalogoServiceImp implements DataCatalogoService {

	@Autowired
	private DataCatalogoRepository dataCatalogoRepository;


	@Override
	public List<DataCatalogo> listarRegistrosActivoTrue() {
		return dataCatalogoRepository.listarRegistrosActivoTrue();
	}

	@Override
	public List<DataCatalogo> listarPorCatalogo(Long catalogoId){
		return dataCatalogoRepository.findAllByCatalogo(catalogoId);
	}


}
