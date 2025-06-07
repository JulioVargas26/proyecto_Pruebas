$(function() {

	/*	$("#id_buscar_api_numero_documento").on("input", function() {
		var maxLength = 11;
		var textarea = $("#id_buscar_api_numero_documento");

		var text = textarea.val();

		var alphanumericText = text.replace(/[^0-9]/g, "");

		if (alphanumericText.length >= maxLength) {
			textarea.val(alphanumericText.slice(0, maxLength));
		}

		// Validación de vacío y SweetAlert
		if (text.trim() === "") {
			Swal.fire({
				icon: 'warning',
				title: 'Campo vacío',
				text: 'Por favor, ingresa un valor en este campo.'
			});
		}

		var remainingChars = maxLength - alphanumericText.length;

		// Show a sweetalert message if the maximum length is reached
		if (remainingChars === 0) {
			Swal.fire({
				icon: 'warning',
				title: '¡Atención!',
				text: 'Has alcanzado el límite máximo de caracteres permitidos.',
				showConfirmButton: true,
				confirmButtonText: 'Aceptar'
			});
			$("#txaCount").hide();
		}else {
			$("#txaCount").text(remainingChars + " caracteres restantes");
		}

	});*/
	$("#id_buscar_api_numero_documento").on("input", function() {
		const maxLength = 11; // Configurable
		const textarea = $(this);
		const text = textarea.val().replace(/[^0-9]/g, "");

		textarea.val(text.slice(0, maxLength));

		const remainingChars = maxLength - text.length;

		if (text.trim() === "") {
			Swal.fire({
				icon: 'warning',
				title: 'RUC vacío',
				text: 'Por favor, ingresa un valor en este campo.',
				showConfirmButton: false,
				timer: 1500
			});

		}
		if (remainingChars === 0) {
			Swal.fire({
				icon: 'warning',
				title: '¡Atención!',
				text: `Has alcanzado el límite máximo de ${maxLength} caracteres para este documento.`,
				showConfirmButton: false,
				timer: 1500
			});
		}
	});

/*	$("#id_reg_razon_social").on("input", function() {
    var maxLength = 100;
    var textarea = $("#id_reg_razon_social");

    var text = textarea.val();

    var alphanumericText = text.replace(/[^a-zA-Z0-9\s]/g, "");

    if (alphanumericText.length >= maxLength) {
        textarea.val(alphanumericText.slice(0, maxLength));
    }

    // Validación de vacío y SweetAlert
    if (text.trim() === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Razon Social vacío',
            text: 'Por favor, ingresa un valor en este campo.'
        });
    }

    var remainingChars = maxLength - text.length;

    // Show a sweetalert message if the maximum length is reached
    if (remainingChars === 0) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Has alcanzado el límite máximo de caracteres permitidos.',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
        });
        $("#txaCount2").hide();
    }else {
        $("#txaCount2").text(remainingChars + " caracteres restantes");
    }

});*/
	$("#id_reg_razon_social").on("input", function() {
		const maxLength = 100; // Adjust this value as needed
		const textarea = $(this);
		const text = textarea.val().trim(); // Trim leading/trailing whitespace

		// Alphanumeric validation and character count
		const alphanumericText = text.replace(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\-\s]+$/g, "");
		const remainingChars = Math.max(0, maxLength - alphanumericText.length);

		// Update textarea value and character count display
		textarea.val(alphanumericText.slice(0, maxLength));

		// Enhanced validation and user feedback with SweetAlert 2
		if (remainingChars === 0) {
			Swal.fire({
				icon: 'warning',
				title: '¡Atención!',
				text: 'Has alcanzado el límite máximo de caracteres permitidos.',
				showConfirmButton: false,
				timer: 1500
			});
		}
		if (text.trim() === "") {
			Swal.fire({
				icon: 'warning',
				title: 'Razón Social vacío',
				text: 'Por favor, ingresa un valor en este campo.',
				showConfirmButton: false,
				timer: 1500
			});
		}
	});

	/*$("#id_reg_direccion_fiscal").on("input", function() {
		var maxLength = 100;
		var textarea = $(this);

		var text = textarea.val();

		var alphanumericText = text.replace(/[^a-zA-Z0-9\s]/g, "");

		if (alphanumericText.length >= maxLength) {
			textarea.val(alphanumericText.slice(0, maxLength));
		}

		// Validación de vacío y SweetAlert
		if (text.trim() === "") {
			Swal.fire({
				icon: 'warning',
				title: 'Campo vacío',
				text: 'Por favor, ingresa un valor en este campo.'
			});
		}

		var remainingChars = maxLength - text.length;

		// Show a sweetalert message if the maximum length is reached
		if (remainingChars === 0) {
			Swal.fire({
				icon: 'warning',
				title: '¡Atención!',
				text: 'Has alcanzado el límite máximo de caracteres permitidos.',
				showConfirmButton: true,
				confirmButtonText: 'Aceptar'
			});
			$("#txaCount2").hide();
		}else {
			$("#txaCount2").text(remainingChars + " caracteres restantes");
		}


	});
*/
	$("#id_reg_direccion_fiscal").on("input", function() {
		const maxLength = 100;
		const $textarea = $(this);

		let text = $textarea.val().trim(); // Ensure trimmed value for validation

		// Improved alphanumeric text extraction (handles punctuation and special characters)
		const alphanumericText = text.replace(/[^a-zA-Z0-9 \-\.]/g, "");

		if (alphanumericText.length > maxLength) {
			$textarea.val(alphanumericText.slice(0, maxLength));
		}

		const remainingChars = maxLength - text.length;

		// Enhanced validation feedback and error handling
		if (text.length === 0) {
			Swal.fire({
				icon: 'warning',
				title: 'Campo vacío',
				text: 'Por favor, ingresa una dirección válida en este campo.',
				showConfirmButton: false,
				timer: 1500
			});
		}
		if (!/^[a-zA-Z0-9\s,.-]+$/.test(text)) { // Check for allowed characters
			Swal.fire({
				icon: 'error',
				title: 'Error de formato',
				text: 'La dirección solo puede contener letras, números, guiones, espacios y puntos.',
				showConfirmButton: false,
				timer: 1500
			});
		}
	});

	/*$("#id_reg_condicion_ruc").on("change", function() {
		var selectedValue = $(this).val();
		if (!['habido', 'no habido'].includes(selectedValue)) {
			Swal.fire({
				icon: 'warning',
				title: 'Condición inválida',
				text: 'Por favor, seleccione una condición válida.'
			});
		}
	});
	$("#id_reg_estado_ruc").on("change", function() {
		var selectedValue = $(this).val();
		if (!['activo', 'suspendido', 'cancelado', 'baja', 'otro'].includes(selectedValue)) {
			Swal.fire({
				icon: 'warning',
				title: 'Condición inválida',
				text: 'Por favor, seleccione un estado válido.'
			});
		}

/!*
		activo, suspensión temporal, baja provisional, baja definitiva, baja provisional de oficio y baja definitiva de oficio*!/

	});
*/

	$("#id_reg_nombre_contacto").on("input", function() {
		const maxLength = 50;
		const textarea = $(this);
		const text = textarea.val().replace(/[^a-zA-Z\s]/g, "");

		// Truncar el texto al límite máximo
		textarea.val(text.slice(0, maxLength));

		const remainingChars = maxLength - text.length;

		if (text.trim() === "") {
			Swal.fire({
				icon: 'warning',
				title: 'Campo vacío',
				text: 'Por favor, ingresa un nombre de contacto.',
				showConfirmButton: false,
				timer: 1500
			});

		}
		if (remainingChars === 0) {
			Swal.fire({
				icon: 'warning',
				title: '¡Atención!',
				text: `Has alcanzado el límite máximo de ${maxLength} caracteres para este documento.`,
				showConfirmButton: false,
				timer: 1500
			});
		}



	});

	$("#id_reg_telefono_prov").on("input", function() {
		const maxLength = 9; // Maximum allowed characters
		const textarea = $("#id_reg_telefono_prov");
		const text = textarea.val().replace(/[^0-9]/g, "");

		// Truncar el texto al límite máximo
		textarea.val(text.slice(0, maxLength));

		const remainingChars = maxLength - text.length;

		if (text.trim() === "") {
			Swal.fire({
				icon: 'warning',
				title: 'Campo vacío',
				text: 'Por favor, ingrese un número de teléfono válido de 9 dígitos.',
				showConfirmButton: true,
				timer: 1500
			});

		}
		if (remainingChars === 0) {
			Swal.fire({
				icon: 'warning',
				title: '¡Atención!',
				text: `Has alcanzado el límite máximo de ${maxLength} caracteres para este documento.`,
				showConfirmButton: false,
				confirmButtonText: 'Aceptar',
				timer: 1500
			});
		}

	});

	$("#id_reg_email_prov").on("input", function() {
		// Cambiamos el id para que coincida con el campo de correo electrónico
		const emailInput = $("#id_reg_email_prov");
		const email = emailInput.val();

		// Expresión regular para validar correos electrónicos
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (email.trim() === "") {
			Swal.fire({
				icon: 'warning',
				title: 'Campo vacío',
				text: 'Por favor, ingrese un correo electrónico válido.',
				showConfirmButton: true,
				timer: 1500
			});
		} /*else if (!emailRegex.test(email)) {
			Swal.fire({
				icon: 'error',
				title: 'Correo electrónico inválido',
				text: 'Por favor, ingrese un correo electrónico con el formato correcto (ejemplo@ejemplo.com).',
				showConfirmButton: true,
				timer: 1500
			});
		}*/ else {
			// Si el correo es válido, puedes realizar otras acciones aquí
			console.log("Correo electrónico válido:", email);
		}
	});

	/*$("#id_reg_telefono_provp").on("input", function() {
		var maxLength = 45; // Cambia esto al número máximo de caracteres permitidos
		var textarea = $("#id_reg_telefono_provp");

		var text = textarea.val();
		var alphanumericText = text.replace(/[^a-zA-Z\s]/g, "");

		textarea.val(alphanumericText);
		if (alphanumericText.length >= maxLength ) {

			textarea.val(alphanumericText.slice(0, maxLength));
		}
		var remainingChars = maxLength - text.length;
		$("#txaCoun").text(remainingChars + " caracteres restantes"); // Actualizar el contador
	});
*/

});