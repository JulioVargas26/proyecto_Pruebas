package com.proyecto.repository;

import com.proyecto.entity.Producto;
import org.springframework.data.jpa.repository.*;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    @Query("select t from Producto t " +
            "where t.registros.activo = true")
    List<Producto> listarRegistrosActivoTrue();

    @Query("select s from Producto s where (s.cod_prod like ?1 ) and (s.des_prod like ?2 ) and s.registros.activo = true  ")
    List<Producto> buscarPorFiltrosGestionProducto(String cod_prod, String des_prod);



}
