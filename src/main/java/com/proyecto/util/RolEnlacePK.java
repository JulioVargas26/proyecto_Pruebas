package com.proyecto.util;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
public class RolEnlacePK implements Serializable {
    private Long id_rol;
    private Long id_enlace;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RolEnlacePK)) return false;

        RolEnlacePK that = (RolEnlacePK) o;

        if (!id_rol.equals(that.id_rol)) return false;
        return id_enlace.equals(that.id_enlace);
    }

    @Override
    public int hashCode() {
        int result = id_rol.hashCode();
        result = 31 * result + id_enlace.hashCode();
        return result;
    }
}