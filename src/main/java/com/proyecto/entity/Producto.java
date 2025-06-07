package com.proyecto.entity;

import com.fasterxml.jackson.annotation.*;
import com.proyecto.data.*;
import com.proyecto.util.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id_prod")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_prod;
    private String cod_prod;
    private String tip_mone;
    private double pre_prod;
    private double sto_prod;
    private String des_prod;
    private String tip_docu;
    private String doc_prod;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_data_catalogo")
    private DataCatalogo data_catalogo;

    @Embedded
    private Registros registros = new Registros();

    public Producto(DTOProductoSave dtoProductoSave, DataCatalogo dataCatalogo) {
        this.cod_prod = dtoProductoSave.cod_prod();
        this.des_prod = dtoProductoSave.des_prod();
        this.tip_mone = dtoProductoSave.tip_mone();
        this.pre_prod = dtoProductoSave.pre_prod();
        this.sto_prod = dtoProductoSave.sto_prod();
        this.tip_docu = dtoProductoSave.tip_docu();
        this.doc_prod = dtoProductoSave.doc_prod();
        this.data_catalogo = dataCatalogo;
    }

    public Producto updateData(DTOProductoUpdate dtoProductoUpdate) {
        if (dtoProductoUpdate.cod_prod() != null) {
            this.cod_prod = dtoProductoUpdate.cod_prod();
        }
        if (dtoProductoUpdate.tip_mone() != null) {
            this.tip_mone = dtoProductoUpdate.tip_mone();
        }
        if (dtoProductoUpdate.pre_prod() != 0.0) {
            this.pre_prod = dtoProductoUpdate.pre_prod();
        }
        if (dtoProductoUpdate.sto_prod() != 0.0) {
            this.sto_prod = dtoProductoUpdate.sto_prod();
        }
        if (dtoProductoUpdate.des_prod() != null) {
            this.des_prod = dtoProductoUpdate.des_prod();
        }
        if (dtoProductoUpdate.tip_docu() != null) {
            this.tip_docu = dtoProductoUpdate.tip_docu();
        }
        if (dtoProductoUpdate.doc_prod() != null) {
            this.doc_prod = dtoProductoUpdate.doc_prod();
        }
        if (dtoProductoUpdate.data_catalogo() != null) {
            this.data_catalogo = dtoProductoUpdate.data_catalogo();
        }
        return this;
    }

    public void desactivarProducto() {
        this.registros.setActivo(false);
    }

}
