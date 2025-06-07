package com.proyecto.util;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Embeddable
@Data
public class Registros {

    private Boolean activo = AppSettings.ACTIVO;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    private Date creation_date = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    private Date modification_date = new Date();

    public Registros(DatosRegistros datosRegistros) {
        this.modification_date = datosRegistros.modification_date();
        this.creation_date = datosRegistros.creation_date();
        this.activo = datosRegistros.activo();
    }

    public Registros() {

    }

    public Registros actualizarRegistros(DatosRegistros datosRegistros) {
        this.modification_date = datosRegistros.modification_date();
        return this;
    }

    public String getReporteEstado() {
        return activo ? "Activo": "Inactivo";
    }


}
