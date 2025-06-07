let idDataCatalogo = -1;

<!-- Agregar aqu� -->
(() => {
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

            form.classList.add('was-validated')
        }, false);

        // Find the button with the ID "id_btn_registra"
        const btn = form.querySelector('#id_btn_registra');
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
            });
        }

    });
})();

$(document).ready(function () {

    listarProductos();
    buscarPorFiltrosGestionProductos();

    //registrar lista tipo documento
    $.getJSON("listaTipoDocumento", {}, function (data) {
        $.each(data, function (index, item) {
            $("#id_reg_tipo_documento").append(
                $('<option>', {
                    value: index,
                    text: item
                }));
        });
    });

    $.getJSON("listarPorCatalogo", {}, function (data) {
        $.each(data, function (index, item) {
            $("#id_reg_catalogo").append(
                $('<option>', {
                    value: item.id_catalogo,
                    text: item.descripcion
                }));
        });
    });

    $("#id_btn_filtrar").click(function () {
        buscarPorFiltrosGestionProductos();
    });

});

//asignar evento change al select con ID "id_reg_catalogo"
$(document).on("change","#id_reg_catalogo",function(){
    //variable
    let cod;
    cod=$(this).val();
    //limpiar combo de tipo
    $("#id_reg_data_catalogo").empty().append("<option>[Seleccione Tipo de Producto]</option>")
    $.get("/listarPorDataCatalogo/"+cod,function(response){
        //bucle
        $.each(response,function(index,item){
            $("#id_reg_data_catalogo").append("<option value='"+item.id_data_catalogo+"'>"+item.descripcion+"</option>");
        })
        $("#id_reg_data_catalogo").val(idDataCatalogo);
    })
})


function limpiarFormularioRegistro() {


    //resetear formulario
    $("#id_form_producto").trigger("reset");
    //asignar el valor de "0" a la caja con ID "idCodigo"
    $("#id_producto_ID").val(0);
    //resetear validación
   // $("#id_producto_ID").data("bootstrapValidator").resetForm(true);

}

$("#id_btn_registra").click(function () {

    /*$('#id_form_producto').bootstrapValidator('validate');
    var validator = $('#id_form_producto').data('bootstrapValidator');
    validator.validate();
    if (validator.isValid()) {*/
    $.ajax({
        type: "POST",
        url: "insertProducto",
        data: $('#id_form_producto').serialize(),
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
                $('#id_div_modal_producto').modal("hide");
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
   /* }*/
});

$("#id_btn_actualiza").click(function () {
    //	var validator = $('#id_form_actualiza').data('bootstrapValidator');
    //	validator.validate();
    //	if (validator.isValid()) {
    $.ajax({
        type: "PUT",
        url: "actualizarProducto",
        data: $('#id_form_producto').serialize(),
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
                $('#id_div_modal_producto').modal("hide");
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

function listarProductos() {
    $.getJSON("listarProductoActivoTrue", {
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
    var cod_prod = $("#id_txt_codigo").val();
    //var nom_prod = $("#id_txt_nombre").val();
    var des_prod = $("#id_txt_descripcion").val();
    $.getJSON("buscarPorGestionProducto", {
        "cod_prod": cod_prod,
        //"nom_prod": nom_prod,
        "des_prod": des_prod
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
                ordering: false,
                processing: true,
                pageLength: 10,
                lengthChange: false,
                columns: [
                    {
                        data: "id_catalogo"
                    },
                    {
                        data: "descripcion"
                    },/*
                    {
                        data: function (row) {
                            if (row.data_catalogo.descripcion != "") {
                                sub = row.data_catalogo.catalogo.descripcion.toString() + " " + row.data_catalogo.descripcion;
                            }
                            return sub // Verificamos si hay un objeto "contacto" y accedemos al atributo  "Fijo"
                        }
                        //data: "dataCatalogo.descripcion"
                    },*/
                    {
                        data: function (row, type, val,
                                        meta) {
                            var salida = '<button type="button" style="width: 90px" class="btn btn-info btn-sm" onclick="editar(\''
                                + row.id_prod
                                + '\',\''
                                + row.cod_prod/*
                                + '\',\''
                                + row.data_catalogo.catalogo.id_catalogo
                                + '\',\''
                                + row.data_catalogo.id_data_catalogo*/
                                + '\')">Editar</button>';
                            return salida;
                        },
                        className: 'text-center'
                    },
                    {
                        data: function (row, type, val,
                                        meta) {
                            var salida = '<button type="button" style="width: 90px" class="btn btn-warning btn-sm" onclick="accionEliminar(\''
                                + row.id_prod
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

function editar(id_prod, cod_prod, sto_prod, tipo_moneda, pre_prod,
                tipo_documento, nro_doc_prod, des_prod, id_catalogo, data_catalogo) {
    $('#id_producto_ID').val(id_prod);
    $('#id_reg_cod_prod').val(cod_prod);
    $('#id_reg_sto_prod').val(sto_prod);
    $('#id_reg_tipo_moneda').val(tipo_moneda);
    $('#id_reg_pre_prod').val(pre_prod);
    $('#id_reg_tipo_documento').val(tipo_documento);
    $('#id_reg_nro_doc_prod').val(nro_doc_prod);
    $('#id_reg_des_prod').val(des_prod);

    $('#id_reg_catalogo').val(id_catalogo);

    idDataCatalogo = data_catalogo;
    $('#id_reg_catalogo').trigger("change");

    $('#id_div_modal_producto').modal("show");

/*
    //$("#idTipo").val(response.tipo.codigo);
    $("#idLaboratorio").val(response.tipo.laboratorio.codigo);

    codTipo=response.tipo.codigo;
    $("#idLaboratorio").trigger("change");*/

}

function accionEliminar(id_producto) {
    $.ajax({
        type: "POST",
        url: "cambiarEstadoProductoCrud",
        data: {
            "id_producto": id_producto
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


$('#id_form_producto').
    bootstrapValidator(
    {
        message: 'El valor no es valido',
       /* feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },*/
        fields: {
            cod_prod: {
                selector: '#id_reg_cod_prod',
                validators: {
                    notEmpty: {
                        message: 'Campo Obligatorio'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z]{1}[0-9]{8}$/,
                        message: 'Ingrese un código de producto válido (una letra seguida de tres números, por ejemplo: B393, a989)'
                    }
    }
            },
            sto_prod: {
                selector: '#id_reg_sto_prod',
                validators: {
                    notEmpty: {
                        message: 'Campo obligatorio'
                    },
                    integer: {
                        message: 'El valor debe ser un número entero'
                    },
                    greaterThanOrEqualTo: { // Asegurar que el stock sea mayor o igual a cero
                        message: 'El stock no puede ser negativo',
                        value: 0
                    }
    }
            },
            tipo_moneda: {
                selector: '#id_reg_tipo_moneda', // Ajusta el selector según tu HTML
                validators: {
                    notEmpty: {
                        message: 'Debe seleccionar un tipo de moneda'
                    }
                }
            },
            pre_prod: {
                selector: '#id_reg_pre_prod',
                validators: {
                    notEmpty: {
                        message: 'El precio es obligatorio'
                    },
                    numeric: {
                        message: 'El valor debe ser numérico'
                    },
                    decimal: {
                        message: 'El valor debe ser un número decimal',
                        decimalSeparator: ',', // Ajusta según tu configuración regional
                        thousandsSeparator: '.' // Ajusta según tu configuración regional
                    },
                    between: {
                        message: 'El precio debe estar entre $0.01 y $9999.99', // Ajusta el rango según tus necesidades
                        min: 0.01,
                        max: 9999.99
                    },
                    greaterThan: {
                        message: 'El precio debe ser mayor a 0',
                        inclusive: false,
                        value: 0
                    },
                }
            },
            tipo_documento: {
                selector: '#id_reg_tipo_documento', // Ajusta el selector según tu HTML
                validators: {
                    notEmpty: {
                        message: 'Debe seleccionar un tipo de documento'
                    }
                }
            },
            /*nro_doc_prod: {
                selector: '#id_reg_nro_doc_prod',
                validators: {
                    notEmpty: {
                        message: 'El número de {tipo_documento} es obligatorio'
                    },
                    stringLength: {
                        min: 5,
                        max: 20,
                        message: 'El número de documento debe tener entre 5 y 20 caracteres'
                    },
                    regexp: {
                        regexp: /^[A-Z0-9]{1}[0-9]{9}$/,
                        message: 'El número de documento solo puede contener letras mayúsculas y números'
                    }
                    regexp: {
                        regexp: /^[a-zA-Z]{1}[0-9]{3}$/,
                        message: 'Ingrese un código de producto válido (una letra seguida de tres números, por ejemplo: B393, a989)'
                    }
                }
            }*/
            id_reg_nro_doc_prod: {
                selector: '#id_reg_nro_doc_prod',
                validators: {
                    notEmpty: {
                        message: 'Campo obligatorio'
                    },
                    stringLength: {
                        min: 5,
                        max: 8,
                        message: 'El número de documento debe tener entre 5 y 8 caracteres'
                    },
                    regexp: {
                        regexp: /^[0-9]+(-[0-9]+)?$/, // Permite números, guiones y combinaciones
                        message: 'El formato del documento no es válido. Ejemplos: 123, 123-456'
                    }
                }
            },
            des_prod: {
                selector: '#id_act_des_prod', // Ajusta el selector al ID correcto
                validators: {
                    notEmpty: {
                        message: 'La descripción es obligatoria'
                    },
                    stringLength: {
                        min: 5, // Mínimo 10 caracteres
                        max: 255, // Máximo 255 caracteres
                        message: 'La descripción debe tener entre 5 y 255 caracteres'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚüÜ.,\s]+$/, // Permite letras, números, algunos signos de puntuación y espacios
                        message: 'Solo se permiten letras, números y algunos signos de puntuación'
                    }
                }
            }

        }
    });

