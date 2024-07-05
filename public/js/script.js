// Wrap the code in an Immediately Invoked Function Expression (IIFE)
// This helps prevent polluting the global scope with variables
(() => {
	"use strict"; // Enforce strict mode for better coding practices

	// Select all forms with the class "needs-validation"
	const forms = document.querySelectorAll(".needs-validation");

	// Convert the NodeList to an array for easier iteration
	Array.from(forms).forEach((form) => {
		// Add an event listener for the "submit" event on each form
		form.addEventListener(
			"submit",
			(event) => {
				// Check if the form is valid using the built-in checkValidity() method
				if (!form.checkValidity()) {
					// Prevent the default form submission behavior
					event.preventDefault();
					// Stop event propagation to prevent further validation handling (optional)
					event.stopPropagation();
				}

				// Add the class "was-validated" to the form after submission (likely for styling purposes)
				form.classList.add("was-validated");
			},
			false // Capture the event in the bubbling phase (optional, defaults to true)
		);
	});
})();
