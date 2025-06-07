$(function() {

	$("#id_reg_cod_prod").on("input", function() {
		const maxLength = 11; // Configurable
		const textarea = $(this);
		const text = textarea.val().replace(/[^0-9]/g, "");

		textarea.val(text.slice(0, maxLength));

		const remainingChars = maxLength - text.length;

		if (text.trim() === "") {
			Swal.fire({
				icon: 'warning',
				title: 'CODIGO vacío',
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

	$("#id_reg_pre_prod").on("input", function() {
		const maxLength = 100; // Adjust this value as needed
		const textarea = $(this);
		const text = textarea.val().replace(/[^0-9]/g, "");

		const remainingChars = maxLength - text.length;

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
				title: 'PRECIO vacío',
				text: 'Por favor, ingresa un valor en este campo.',
				showConfirmButton: false,
				timer: 1500
			});
		}
	});

	$("#id_reg_nro_doc_prod").on("input", function() {
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

	$("#id_reg_des_prod").on("input", function() {
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

});