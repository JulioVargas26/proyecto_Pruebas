package com.proyecto.service;

import com.proyecto.entity.*;
import com.proyecto.repository.*;
import com.proyecto.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClienteServiceImpl implements ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;


	@Override
	public List<Cliente> listarRegistrosActivoTrue() {
		return clienteRepository.listarRegistrosActivoTrue();
	}

	@Override
	public Optional<Cliente> buscarPorId(Long id) {
		return clienteRepository.findById(id);
	}

	@Override
	public Cliente registrarCliente(Cliente obj) {
		return null;
	}

	@Override
	public Cliente actualizarCliente(Cliente obj) {
		return clienteRepository.save(obj);
	}

	@Override
	public Cliente eliminarCliente(Cliente obj) {
		return null;
	}


}
