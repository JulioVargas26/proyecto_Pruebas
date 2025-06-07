// This is a self-invoking function to encapsulate the code and avoid polluting the global scope
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

// This code runs when the document is ready
$(document).ready(function () {

    listarClientes();

});

// Function to handle the click event for the "Consulta Sunat" button
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

// Function to list clients
function listarClientes() {
    $.getJSON("listarClienteActivoTrue", {
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

// Function to add data to the DataTable
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
                data: "idCliente"
            }, {
                data: function (row) {
                    return sub = row.nombres.concat(" ").concat(row.apellidos)
                }
            }, {
                data: "dni"
            }, {
                data: "correo"
            }, {
                data: "direccion"
            }, {
                data: "telefono"
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
                        '\',\'' + row.nombres +
                        '\',\'' + row.apellidos +
                        '\',\'' + row.dni +
                        '\',\'' + row.correo +
                        '\',\'' + row.direccion +
                        '\',\'' + row.telefono +
                        '\')">Editar</button>';

                    return salida;
                }, className: 'text-center'
            }, {
                data: function (row, type, val, meta) {
                    var salida = '<button type="button" style="width: 90px" class="btn btn-warning btn-sm" onclick="accionEliminar(\'' + row.idCliente + '\')">' + (row.registros.activo == 1 ? 'Activo' : 'Inactivo') + '</button>';
                    return salida;
                }, className: 'text-center'
            },],

        });

}

// Function to handle the edit action
function editar(idCliente, nombres, apellidos, dni, correo, direccion, telefono) {
    $('#id_cliente_ID').val(idCliente);
    $('#id_reg_nom_cli').val(nombres).prop('readonly', true);
    $('#id_reg_ape_cli').val(apellidos).prop('readonly', true);
    $('#id_buscar_api_numero_documento').val(dni).prop('readonly', 'darkgray', true);
    $('#id_reg_cor_cli').val(correo);
    $('#id_reg_dir_cli').val(direccion);
    $('#id_reg_tel_cli').val(telefono);

    $('#id_div_modal_cliente').modal("show");

}

// Function to handle the delete action
function accionEliminar(idCliente) {
    $.ajax({
        type: "POST", url: "cambiarEstadoClienteCrud", data: {
            "idCliente": idCliente
        }, success: function (data) {
            agregarGrilla(data.lista);
            window.location.reload();
        }, error: function () {
            mostrarMensaje(MSG_ERROR);
        }
    });
}

// Function to search for products by filters
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

// Function to clear the registration form
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

// Function to handle the registration of a new client
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