package com.proyecto.service;


import com.proyecto.entity.*;

import java.util.*;

public interface RolService {
	

	 Rol login(Rol bean);

	 List<Rol> listaRol();

	 List<Opcion> traerOpcionDeRol(Long idRol);

	 Optional<RolHasOpcion> buscaOpcion(RolHasOpcionPK ojb);

	 RolHasOpcion insertaOpcion(RolHasOpcion ojb);

	 void eliminaOpcion(RolHasOpcion obj);

	//	 List<String> getRol(int idRol);
	 List<Object> getObjRol(Long idRol);


}
