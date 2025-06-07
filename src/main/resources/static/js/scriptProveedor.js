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

    listarProductos();
    buscarPorFiltrosGestionProductos();

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
    $.getJSON("listaTipoContacto", {}, function (data) {
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
    });

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

});

$("#btnConsultaSunat").click(function () {
    $('#id_msg_error_api_dni').css('display', 'none');
    $('#id_msg_success_api_dni').css('display', 'none');
    var numeroDocumento = $("#id_buscar_api_numero_documento").val();

    $.ajax({
        type: "POST",
        url: "/consultaRucSunat",
        data: {
            numero_documento: numeroDocumento,
        },
        success: function (response) {
            console.log(response);
            var jsonData = JSON.parse(response);
            $("#id_buscar_api_numero_documento").val(jsonData.numeroDocumento);
            $('#id_reg_direccion_fiscal').val(jsonData.direccion);
            $("#id_reg_razon_social").val(jsonData.razonSocial);
           /* $("#id_reg_condicion_ruc").val(jsonData.condicion).prop('readonly', true);
            $("#id_reg_estado_ruc").val(jsonData.estado).prop('readonly', true);*/


            // Create an option element with the selected value
            const condicion = new Option(
                jsonData.condicion, jsonData.condicion,
                true, true);
            // Append the option to the select element
            $("#id_reg_condicion_ruc").append(condicion);

            // Create an option element with the selected value
            const estado = new Option(
                jsonData.estado, jsonData.estado,
                true, true);
            // Append the option to the select element
            $("#id_reg_estado_ruc").append(estado);


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
                title: "Se encontraron coincidencias"
            });
        },
        error: function (xhr, status, error) {
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
                icon: "error",
                title: "Verifica los datos del Documento"
            });
        }
    })
})

function limpiarFormularioRegistro() {
    //resetear formulario
    $("#id_form_proveedor").trigger("reset");
    //asignar el valor de "0" a la caja con ID "idCodigo"
    $("#id_proveedor_ID").val(0);
    //resetear validación
    $("#id_form_proveedor").data("bootstrapValidator").resetForm(true);

    $("#id_buscar_api_numero_documento").val("")
    $("#id_reg_razon_social").val("")
    $("#id_reg_direccion_fiscal").val("")
    $("#id_reg_condicion_ruc").val("")
    $("#id_reg_estado_ruc").val("")
    $("#id_reg_tipo_contacto").val("")
    $("#id_reg_nombre_contacto").val("")
    $("#id_reg_telefono_prov").val("")
    $('#id_reg_email_prov').val("")
}

$("#id_btn_reg_prov").click(function () {

   $('#id_form_proveedor').bootstrapValidator('validate');
    var validator = $('#id_form_proveedor').data('bootstrapValidator');
    validator.validate();
    if (validator.isValid()) {
    $.ajax({
        type: "POST",
        url: "insertProveedor",
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
                validator.resetForm();
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
   }
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

function listarProductos() {
    $.getJSON("listarProveedorActivoTrue", {
            "filtro": ''
        },
        function (data) {
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
                    icon: "info",
                    title: data.MSG_EMPTY
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
                    icon: "success",
                    title: "Se encontraron coincidencias"
                });
            }
        });
}

function buscarPorFiltrosGestionProductos() {
    var ruc = $("#id_txt_ruc").val();
    var razon_social = $("#id_txt_raz_soc").val();
    $.getJSON("buscarPorGestionProveedor", {
        "ruc": ruc,
        "razon_social": razon_social
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
                icon: "info",
                title: data.MSG_EMPTY
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
                icon: "success",
                title: "Se encontraron coincidencias"
            });
        }
    });
}

function agregarGrilla(lista) {

    $('#id_table').DataTable().clear();
    $('#id_table').DataTable().destroy();
    $('#id_table')
        .DataTable(
            {
                data: lista,
                searching: false,
                ordering: true,
                processing: true,
                pageLength: 10,
                lengthChange: false,
                columns: [
                    {
                        data: "id_prov"
                    },
                    {
                        data: "ruc"
                    },
                    {
                        data: "razon_social"
                    },
                    {
                        data: "direccion_fiscal"
                    },
                    {
                        data: "condicion_ruc"
                    },
                    {
                        data: "estado_ruc"
                    },
                    {
                        data: "tipo_contacto"
                    },
                    {
                        data: "nombre_contacto"
                    },
                    {
                        data: "telefono_contacto"
                    },
                    {
                        data: "email_contacto"
                    },
                    {
                        data: function (row, type, val,
                                        meta) {
                            var salida = '<button type="button" style="width: 90px" class="btn btn-info btn-sm" onclick="editar(\''
                                + row.id_prov
                                + '\',\''
                                + row.ruc
                                + '\',\''
                                + row.razon_social
                                + '\',\''
                                + row.direccion_fiscal
                                + '\',\''
                                + row.condicion_ruc
                                + '\',\''
                                + row.estado_ruc
                                + '\',\''
                                + row.tipo_contacto
                                + '\',\''
                                + row.nombre_contacto
                                + '\',\''
                                + row.telefono_contacto
                                + '\',\''
                                + row.email_contacto
                                + '\')">Editar</button>';
                            return salida;
                        },
                        className: 'text-center'
                    },
                    {
                        data: function (row, type, val,
                                        meta) {
                            var salida = '<button type="button" style="width: 90px" class="btn btn-warning btn-sm" onclick="accionEliminar(\''
                                + row.id_prov
                                + '\')">'
                                + (row.registros.activo == 1 ? 'Activo'
                                    : 'Inactivo')
                                + '</button>';
                            return salida;
                        },
                        className: 'text-center'
                    },]
            });

}

function editar(id_prov, ruc, razon_social, direccion_fiscal, condicion_ruc,
                estado_ruc, tipo_contacto, nombre_contacto, telefono_contacto, email_contacto) {
    $('#id_proveedor_ID').val(id_prov);
    $('#id_buscar_api_numero_documento').val(ruc).prop('readonly', true);
    $('#id_reg_razon_social').val(razon_social).prop('readonly', true);
    $('#id_reg_direccion_fiscal').val(direccion_fiscal).prop('readonly', true);
    $('#id_reg_condicion_ruc').val(condicion_ruc).prop('readonly', true);
    $('#id_reg_estado_ruc').val(estado_ruc).prop('readonly', true);
    $('#id_reg_tipo_contacto').val(tipo_contacto);
    $('#id_reg_nombre_contacto').val(nombre_contacto);
    $('#id_reg_telefono_prov').val(telefono_contacto);
    $('#id_reg_email_prov').val(email_contacto);

    $('#id_div_modal_proveedor').modal("show");

}

function accionEliminar(id_proveedor) {
    $.ajax({
        type: "POST",
        url: "cambiarEstadoProveedorCrud",
        data: {
            "id_proveedor": id_proveedor
        },
        success: function (data) {
            agregarGrilla(data.lista);
            window.location.reload();
        },
        error: function () {
            mostrarMensaje(MSG_ERROR);
        }
    });
}

// Validación de formulario de registro de proveedor

/*
$('#id_form_proveedor').bootstrapValidator({
    message: 'El valor no es válido',
    /!*feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },*!/
    fields: {
        ruc: {
            selector: '#id_buscar_api_numero_documento',
            validators: {
                notEmpty: {
                    message: 'Campo Obligatorio'
                },
                regexp: {
                    regexp: /^\d{11}$/,
                    message: 'El RUC debe tener 11 dígitos'
                }
            }
        },
        razon_social: {
            selector: '#id_reg_razon_social',
            validators: {
                notEmpty: {
                    message: 'Campo obligatorio',
                },
                stringLength: {
                    min: 3,
                    message: 'La razón social debe tener entre 3 y 100 caracteres'
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\-\s]+$/,
                    message: 'Solo se permiten letras, números y espacios'
                }
            }
        },
        direccion_fiscal: {
            selector: '#id_reg_direccion_fiscal',
            validators: {
                notEmpty: {
                    message: 'Campo Obligatorio'
                },
                stringLength: {
                    min: 10,
                    message: 'La dirección debe tener entre 10 y 100 caracteres'
                }
            }
        },
        condicion_ruc: {
            selector: '#id_reg_condicion_ruc',
            validators: {
                notEmpty: {
                    message: 'Por favor, seleccione una condición para el RUC'
                },
                /!*in: {
                    param: ['activo', 'suspendido', 'cancelado', 'baja', 'otro'],
                    message: 'La condición seleccionada "{value}" no es válida. Por favor, seleccione una opción de la lista.'
                }*!/
            }
        },
        estado_ruc: {
            selector: '#id_reg_estado_ruc',
            validators: {
                notEmpty: {
                    message: 'Por favor, seleccione un estado para el RUC'
                },
                /!*in: {
                    param: ['activo', 'suspendido', 'cancelado', 'baja'],
                    message: 'El estado seleccionado "{value}" no es válido. Por favor, seleccione una opción de la lista.'
                }*!/
            }
        },
        tipo_contacto: {
            selector: '#id_reg_tipo_contacto',
            validators: {
                notEmpty: {
                    message: 'Campo Obligatorio'
                }/!*,
                in: {
                    param: ['activo', 'suspendido', 'cancelado', 'baja'],
                    message: 'El estado seleccionado "{value}" no es válido. Por favor, seleccione una opción de la lista.'
                }*!/
            }
        },
        nombre_contacto: {
            selector: '#id_reg_nombre_contacto',
            validators: {
                notEmpty: {
                    message: 'Campo Obligatorio'
                },
                minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres'
                },
                regexp: {
                    regexp: /^[a-zA-Z\s]+$/,
                    message: 'Solo se permiten letras y espacios'
                }
            }
        },
        telefono_contacto: {
            selector: '#id_reg_telefono_prov',
            validators: {
                notEmpty: {
                    message: 'Campo Obligatorio'
                },
                stringLength: {
                    min: 7,
                    message: 'El número de teléfono debe tener 9 dígitos'
                },
            }
        },
        email_contacto: {
            selector: '#id_reg_email_prov',
            validators: {
                notEmpty: {
                    message: 'Campo Obligatorio'
                },

                // Nueva regla para verificar si el dominio es válido
               /!* domain: {
                    message: 'El dominio del correo electrónico no es válido',
                    validator: function(value) {
                        // Lógica para verificar el dominio
                        return value.split('@')[1] === 'ejemplo.com';
                    }
                }*!/
            }
        }
    }
});

*/

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
