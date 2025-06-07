// Cargar el script una vez que el documento esté completamente cargado
<!-- Agregar aqu� -->
/*(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.stopPropagation()
            }
            // Prevenir la recarga de la página
            event.preventDefault()

            form.classList.add('was-validated');

        // Find the button with the ID "id_btn_registra"
        const btn = form.querySelector('#id_btn_reg_prov');

        // Add a click event listener to the button
        if (btn) {
            btn.addEventListener('click', event => {
                // Prevent the default behavior of the button (submitting the form)
                event.preventDefault();

                // Trigger the form's submit event manually
                form.dispatchEvent(new Event('submit'));
            });
        }
        // Find the button with the data-bs-dismiss="modal" attribute
        const dismissBtn = form.querySelector('[data-bs-dismiss="modal"]');

        // Add a click event listener to the button
        if (dismissBtn) {
            dismissBtn.addEventListener('click', event => {
                // Clear the form fields
                form.reset();

                // Clear validation styles
                form.classList.remove('was-validated');
            });
        }
    }, false);
});
})();*/

(() => {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);

        // Find the button with the ID "id_btn_registra"
        const btn = form.querySelector('#id_btn_reg_user');

        // Add a click event listener to the button
        if (btn) {
            btn.addEventListener('click', event => {
                // Prevent the default behavior of the button (submitting the form)
                event.preventDefault();

                // Trigger the form's submit event manually
                form.dispatchEvent(new Event('submit'));
            });
        }

        // Find the button with the data-bs-dismiss="modal" attribute
        const closeButton = form.querySelector('[data-bs-dismiss="modal"]');

        // Add a click event listener to the close button
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                // Reset the form to its initial state
                form.reset();
                form.classList.remove('was-validated');
            });
        }
    });
})();

$(document).ready(function () {

    listarUsuarios();
    /* buscarPorFiltrosGestionProductos();*/

    // Realiza la solicitud para obtener la lista de monedas
    /* $.getJSON("listaTipoContacto", {})
         .done(function (data) {
             // Limpiar el select antes de agregar las nuevas opciones
             $("#id_act_tipo_contacto").empty();

             // Iterar sobre los datos obtenidos
             $.each(data, function (index, item) {
                 // Crear una nueva opción
                 var option = $('<option>', {
                     value: index,
                     text: item
                 });

                 // Agregar la opción al select
                 $("#id_act_tipo_contacto").append(option);
             });
         })
         .fail(function (jqxhr, textStatus, error) {
             // Manejar errores de la solicitud
             var err = textStatus + ", " + error;
             console.log("Fallo en la solicitud: " + err);
             // Puedes agregar aquí tu propia lógica para mostrar un mensaje de error al usuario
         });
 */
    //registrar lista tipo moneda
    /* $.getJSON("listaTipoContacto", {}, function (data) {
         $.each(data, function (index, item) {
             $("#id_reg_tipo_contacto").append(
                 $('<option>', {
                     value: index,
                     text: item
                 }));
         });
     });

     $("#id_btn_filtrar_prov").click(function () {
         buscarPorFiltrosGestionProductos();
     });*/

    /*$("#id_txt_filtro").on('keypress', function (e) {
        if (e.which == 13) {
            var fil = $("#id_txt_filtro").val();
            $.getJSON("buscarProductoPorNombre", {
                "filtro": fil
            }, function (lista) {
                agregarGrilla(lista);
            });
        }
    });*/

    // Manejador de clic para mostrar/ocultar contraseña
    $(document).on('click', '.toggle-password', function () {
        var targetId = $(this).data('target');
        var passwordSpan = $('#' + targetId);
        if (passwordSpan.is(':visible')) {
            passwordSpan.hide();
            $(this).removeClass('bi bi-eye-slash-fill').addClass('bi bi-eye-fill');
        } else {
            passwordSpan.show();
            $(this).removeClass('bi bi-eye-fill').addClass('bi bi-eye-slash-fill');
        }
    });

    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('togglePassword');

    togglePasswordIcon.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordIcon.classList.remove('bi-eye');
            togglePasswordIcon.classList.add('bi-eye-slash');
        } else {
            passwordInput.type = 'password';
            togglePasswordIcon.classList.remove('bi-eye-slash');
            togglePasswordIcon.classList.add('bi-eye');
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const passwordInput = document.getElementById('id_reg_user_password');
        const togglePasswordIcon = document.getElementById('togglePassword');
        const eyeIcon = document.querySelector('.bi-eye');

        togglePasswordIcon.addEventListener('click', () => {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.remove('bi-eye');
                eyeIcon.classList.add('bi-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('bi-eye-slash');
                eyeIcon.classList.add('bi-eye');
            }
        });
    });


    $("#id_reg_fec_nac").flatpickr({
        // Opciones de configuraci�n de Flatpickr
        dateFormat: 'Y-m-d', // Formato de fecha
        locale: 'es'
        // Otras opciones que desees configurar
    });


});


$("#btnConsultaSunat").click(function () {
    $('#id_msg_error_api_dni').css('display', 'none');
    $('#id_msg_success_api_dni').css('display', 'none');

    var numeroDocumento = $("#id_buscar_api_numero_documento").val();

    $.ajax({
        type: "POST", url: "/consultaDniSunat", data: {
            numero_documento: numeroDocumento,
        }, success: function (response) {
            console.log(response);
            var jsonData = JSON.parse(response);
            $("#id_buscar_api_numero_documento").val(jsonData.numeroDocumento).prop('readonly', true);

            $("#id_reg_nom_usu").val(jsonData.nombres).prop('readonly', true);
            $("#id_reg_ape_usu").val(jsonData.apellidoPaterno + ' ' + jsonData.apellidoMaterno).prop('readonly', true);

            $("#id_reg_user_password").val(jsonData.numeroDocumento).prop('readonly', true);
            var textoGenerado = jsonData.nombres.substring(0, 3).toLowerCase() + '.' + jsonData.apellidoPaterno.substring(0, 3).toLowerCase() + jsonData.apellidoMaterno.charAt(0).toUpperCase() + jsonData.numeroDocumento.charAt(1) + "PTA"
            $("#id_reg_user_name").val(textoGenerado).prop('readonly', true);

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success", title: "Se encontraron coincidencias"
            });
        }, error: function (xhr, status, error) {
            console.error("Error al obtener datos de la api", error);
            $('#id_msg_error_api_dni').css('display', 'block');
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error", title: "Verifica los datos del Documento"
            });
        }
    })
})

function limpiarFormularioRegistro() {
    //resetear formulario
    $("#id_form_usuario").trigger("reset");
    //asignar el valor de "0" a la caja con ID "idCodigo"
    $("#id_usuario_ID").val(0);
   /* //resetear validación
    $("#id_form_proveedor").data("bootstrapValidator").resetForm(true);*/
/*
    $("#id_buscar_api_numero_documento").val("")
    $("#id_reg_razon_social").val("")
    $("#id_reg_direccion_fiscal").val("")
    $("#id_reg_condicion_ruc").val("")
    $("#id_reg_estado_ruc").val("")
    $("#id_reg_tipo_contacto").val("")
    $("#id_reg_nombre_contacto").val("")
    $("#id_reg_telefono_prov").val("")
    $('#id_reg_email_prov').val("")*/
}

$("#id_btn_reg_user").click(function () {

   /* $('#id_form_usuario').bootstrapValidator('validate');
    var validator = $('#id_form_usuario').data('bootstrapValidator');
    validator.validate();
    if (validator.isValid()) {*/
        $.ajax({
            type: "POST",
            url: "insertUsuario",
            data: $('#id_form_usuario').serialize(),
            success: function (data) {
                if (data.MSG_OK == null) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error", title: data.MSG_ERROR
                    });
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success", title: data.MSG_OK
                    });
                    $('#id_div_modal_usuario').modal("hide");
                    limpiarFormularioRegistro();
                    agregarGrilla(data.LIST);
                    window.location.reload();
                   /* validator.resetForm();*/
                }
            }, error: function () {
                Swal.fire({
                    title: "Oops...?", text: MSG_ERROR, icon: "error"
                });
            }
        });
   /* }*/
});

/*
$("#id_btn_act_prov").click(function () {
    //	var validator = $('#id_form_actualiza').data('bootstrapValidator');
    //	validator.validate();
    //	if (validator.isValid()) {
    $.ajax({
        type: "PUT",
        url: "actualizarProveedor",
        data: $('#id_form_proveedor').serialize(),
        success: function (data) {
            if (data.MSG_OK == null) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: data.MSG_ERROR
                });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: data.MSG_OK
                });
                $('#id_div_modal_proveedor').modal("hide");
                limpiarFormularioRegistro();
                agregarGrilla(data.LIST);
                window.location.reload();
                //validator.resetForm();
            }
        },
        error: function () {
            Swal.fire({
                title: "Oops...?",
                text: MSG_ERROR,
                icon: "error"
            });
        }
    });
    //}
});
*/

function listarUsuarios() {
    $.getJSON("listarUsuariosActivoTrue", {
        "filtro": ''
    }, function (data) {
        console.log(data)
        if (data == null) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "info", title: data.MSG_EMPTY
            });
        } else {
            agregarGrilla(data);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success", title: "Se encontraron coincidencias"
            });
        }
    });
}

function buscarPorFiltrosGestionProductos() {
    var ruc = $("#id_txt_ruc").val();
    var razon_social = $("#id_txt_raz_soc").val();
    $.getJSON("buscarPorGestionProveedor", {
        "ruc": ruc, "razon_social": razon_social
    }, function (data) {
        if (data.LIST == null) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "info", title: data.MSG_EMPTY
            });
        } else {
            agregarGrilla(data.LIST);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success", title: "Se encontraron coincidencias"
            });
        }
    });
}

function agregarGrilla(lista) {

    $('#id_table').DataTable().clear();
    $('#id_table').DataTable().destroy();
    $('#id_table')
        .DataTable({
            data: lista,
            searching: false,
            ordering: true,
            processing: true,
            pageLength: 10,
            lengthChange: false,
            columns: [{
                data: "idUsuario"
            }, {
                data: function (row) {
                    return sub = row.nombres.concat(" ").concat(row.apellidos)
                }
            }, {
                data: "dni"
            }, {
                data: "correo"
            }, {
                data: "fechaNacimiento"
            }, {
                data: "direccion"
            }, {
                data: "telefono"
            }, {
                data: "login"
            }, {
                data: null, render: function (data, type, row) {
                    return `<div class="password-container">
                                            <span id="password-${row.nombres.split(' ')[0].toLowerCase()}-${row.apellidos.split(' ')[0].toLowerCase()}"  
                                                  style="display: none;">${row.password}</span>
                                            <i id="toggle-${row.nombres.split(' ')[0].toLowerCase()}-${row.apellidos.split(' ')[0].toLowerCase()}" class="bi bi-eye-fill toggle-password" data-target="password-${row.nombres.split(' ')[0].toLowerCase()}-${row.apellidos.split(' ')[0].toLowerCase()}"></i>
                                        </div>`;


                }
            }, {
                data: function (row) {
                    return sub = row.registros.creation_date
                }
            }, {
                data: function (row) {
                    return sub = row.registros.modification_date
                }
            }, {
                data: function (row, type, val, meta) {
                    var salida = '<button type="button" style="width: 90px" class="btn btn-info btn-sm" onclick="editar(' +
                        '\'' + row.idUsuario +
                        '\',\'' + row.dni +
                        '\',\'' + row.fechaNacimiento +
                        '\',\'' + row.nombres +
                        '\',\'' + row.apellidos +
                        '\',\'' + row.correo +
                        '\',\'' + row.telefono +
                        '\',\'' + row.direccion +
                        '\',\'' + row.login +
                        '\',\'' + row.password +
                        '\')">Editar</button>';

                    return salida;
                }, className: 'text-center'
            }, {
                data: function (row, type, val, meta) {
                    var salida = '<button type="button" style="width: 90px" class="btn btn-warning btn-sm" onclick="accionEliminar(\'' + row.idUsuario + '\')">' + (row.registros.activo == 1 ? 'Activo' : 'Inactivo') + '</button>';
                    return salida;
                }, className: 'text-center'
            },],

        });

}

function editar(idUsuario, dni, fechaNacimiento, nombres, apellidos, correo, telefono, direccion, login, password) {
    $('#id_usuario_ID').val(idUsuario);
    $('#id_buscar_api_numero_documento').val(dni).prop('readonly', 'darkgray', true);
    $('#id_reg_fec_nac').val(fechaNacimiento).prop('readonly', true);
    $('#id_reg_nom_usu').val(nombres).prop('readonly', true);
    $('#id_reg_ape_usu').val(apellidos).prop('readonly', true);
    $('#id_reg_cor_usu').val(correo);
    $('#id_reg_tel_usu').val(telefono);
    $('#id_reg_dir_usu').val(direccion);
    $('#id_reg_user_name').val(login).prop('readonly', true);
    $('#id_reg_user_password').val(password);

    $('#id_div_modal_usuario').modal("show");

}

function accionEliminar(idUsuario) {
    $.ajax({
        type: "POST", url: "cambiarEstadoUsuarioCrud", data: {
            "idUsuario": idUsuario
        }, success: function (data) {
            agregarGrilla(data.lista);
            window.location.reload();
        }, error: function () {
            mostrarMensaje(MSG_ERROR);
        }
    });
}

// Validación de formulario de registro de proveedor


/*

$('#id_form_actualiza')
    .
    bootstrapValidator(
    {
        message : 'El valor no es valido',
        feedbackIcons : {
        valid : 'glyphicon glyphicon-ok',
        invalid : 'glyphicon glyphicon-remove',
        validating : 'glyphicon glyphicon-refresh'
    },
        fields : {
        numeroSala : {
        selector : '#id_act_numeroSala',
        validators : {
        notEmpty : {
        message : 'Campo Obligatorio'
    },
        regexp : {
        regexp : '^[a-zA-Z]{1}[0-9]{3}$',
        message : 'Ejm: B393, a989, ... '
    }
    }
    },
        numAlumnos : {
        selector : '#id_act_nroAlumnos',
        validators : {
        notEmpty : {
        message : 'Campo obligatorio'
    },
        integer : {
        message : 'El valor no es v&aacute;lido'
    },
        between : {
        message : 'Cantidad de alumnos permitidos 1(min.) a 99(m&aacute;x.)',
        min : 1,
        max : 99
    }
    }
    },
        piso : {
        selector : '#id_act_piso',
        validators : {
        notEmpty : {
        message : 'Campo Obligatorio'
    },
        between : {
        message : 'Pisos permitidos 1(min.) a 99 (m&aacute;x.)',
        min : 1,
        max : 99
    },
        integer : {
        message : 'El valor no es v&aacute;lido'
    },
    }
    },
        recursos : {
        selector : '#id_act_recursos',
        validators : {
        notEmpty : {
        message : 'Campo Obligatorio'
    },
        stringLength : {
        max : 45,
        min : 2,
        message : 'Caracteres permitidos 2(min.) a 45 (max.)'
    }
    }
    },
        sede : {
        selector : '#id_act_sede',
        validators : {
        notEmpty : {
        message : 'Campo Obligatorio'
    }
    }
    },
        tipoSala : {
        selector : '#id_act_tipoSala',
        validators : {
        notEmpty : {
        message : 'Campo Obligatorio'
    }
    }
    }
    }
    })
;*/
