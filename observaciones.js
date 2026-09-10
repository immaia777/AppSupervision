async function guardarObservaciones() {

    const observaciones = document
        .getElementById("observaciones")
        .value
        .trim();

    const mensaje = document.getElementById("mensaje");

    if (observaciones === "") {
        mensaje.textContent =
            "Escriba una observación antes de finalizar.";
        return;
    }

    try {

        const idEvaluacion =
            localStorage.getItem("idEvaluacion");

        if (!idEvaluacion) {
            mensaje.textContent =
                "No se encontró la evaluación.";
            return;
        }

        const { error } = await supabaseClient
            .from("evaluaciones")
            .update({
                observaciones: observaciones
            })
            .eq("id", idEvaluacion);

        if (error) {

            console.error(
                "Error al guardar observaciones:",
                error
            );

            mensaje.textContent =
                "No se pudieron guardar las observaciones: " +
                error.message;

            return;
        }

        mensaje.textContent =
            "Observaciones guardadas correctamente.";

        setTimeout(() => {
            window.location.href =
                "resultado.html";
        }, 1000);

    } catch (error) {

        console.error(error);

        mensaje.textContent =
            "Ocurrió un error al guardar las observaciones.";
    }
}


function regresar() {

    window.history.back();

}