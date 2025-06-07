package com.proyecto.repository;

import com.proyecto.entity.Catalogo;
import org.springframework.data.jpa.repository.*;

import java.util.List;


public interface CatalogoRepository extends JpaRepository<Catalogo, Long>{

    @Query("select c from Catalogo c where c.registros.activo = true")
    List<Catalogo> listarRegistrosActivoTrue();

}
