package com.proyecto.repository;

import com.proyecto.entity.DataCatalogo;
import org.springframework.data.jpa.repository.*;

import java.util.List;

public interface DataCatalogoRepository extends JpaRepository<DataCatalogo, Long>{

	@Query("Select dc from DataCatalogo dc where dc.catalogo.id_catalogo=?1")
    List<DataCatalogo> findAllByCatalogo(Long catalogoId);
    @Query("select dc from DataCatalogo dc where dc.registros.activo = true")
    List<DataCatalogo> listarRegistrosActivoTrue();

}
