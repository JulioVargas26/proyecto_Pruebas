package com.proyecto.util;

import java.util.Date;

public record DatosRegistros(
        Boolean activo,
        Date creation_date,
        Date modification_date) {

}
