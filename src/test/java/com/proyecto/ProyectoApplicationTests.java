package com.proyecto;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest
class ProyectoApplicationTests {

     @Autowired
    private BCryptPasswordEncoder encoder;
    @Test
    void contextLoads() {
        String password = encoder.encode("123456");
        System.out.println("Clave es : " + password);
    }


}
