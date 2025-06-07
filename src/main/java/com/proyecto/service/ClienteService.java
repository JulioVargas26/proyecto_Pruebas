package com.proyecto.service;


import com.proyecto.entity.*;

import java.util.*;

public interface ClienteService {

	List<Cliente> listarRegistrosActivoTrue();

	Optional<Cliente> buscarPorId(Long id);

	Cliente registrarCliente(Cliente obj);
	Cliente actualizarCliente(Cliente obj);
	Cliente eliminarCliente(Cliente obj);




}
