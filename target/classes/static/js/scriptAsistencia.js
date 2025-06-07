// Script para listar asistencia
$(document).ready(function () {
    listarAsistencia();

    $("#id_btn_filtrar_asis").click(function () {
        buscarPorFiltrosGestionAsistencia();
    });

    $("#id_txt_nom_asis").on('keypress', function (e) {
        if (e.which == 13) {
            var nom_asis = $("#id_txt_nom_asis").val();
            $.getJSON("buscarAsistenciaPorNomApes", {
                "nom_asis": nom_asis
            }, function (lista) {
                agregarGrilla(lista);
            });
        }
    });

});

function listarAsistencia() {
    $.getJSON("listarAsistencias", {
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
            }
            else {
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
                        data: "id_asistencia"
                    },
                    {
                        data: function (row) {
                            return sub = row.usuario.codigo;
                        }
                    },
                    {
                        data: function (row) {
                            return sub = row.usuario.nombres + " " + row.usuario.apellidos;
                        }
                    },
                    {
                        data: "fecha"
                    },
                    {
                        data: "hora_entrada"
                    },
                    {
                        data: "hora_salida"
                    },
                    ]
            });

}

function buscarPorFiltrosGestionAsistencia() {
    var cod_asis = $("#id_txt_cod_asis").val();
    var nom_asis = $("#id_txt_nom_asis").val();
    $.getJSON("buscarPorGestionAsistencia", {
        "cod_asis": cod_asis,
        "nom_asis": nom_asis
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
        }
        else {
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
