const idEvaluacion = localStorage.getItem("idEvaluacion");

console.log("ID DE EVALUACIÓN:", idEvaluacion);

async function cargarResultado() {

    if (!idEvaluacion) {
        document.getElementById("resultado").textContent =
            "No se encontró la evaluación.";
        return;
    }

    const { data, error } = await supabaseClient
        .from("evaluaciones")
        .select(`
            programa,
            evento,
            instructor,
            supervisor,
            fecha,
            bloque1,
            bloque2,
            bloque3,
            bloque4,
            puntaje,
            resultado,
            observaciones
        `)
        .eq("id", idEvaluacion)
        .single();

    console.log("DATOS DEL RESULTADO:", data);
    console.log("ERROR DEL RESULTADO:", error);

    if (error) {
        console.error("Error al cargar resultado:", error);

        document.getElementById("resultado").textContent =
            "No se pudo cargar el resultado.";

        return;
    }

    document.getElementById("mostrarPrograma").textContent =
        data.programa ?? "";

    document.getElementById("mostrarEvento").textContent =
        data.evento ?? "";

    document.getElementById("mostrarInstructor").textContent =
        data.instructor ?? "";

    document.getElementById("mostrarSupervisor").textContent =
        data.supervisor ?? "";

    document.getElementById("mostrarFecha").textContent =
        data.fecha ?? "";

    document.getElementById("bloque1").textContent =
        data.bloque1 ?? 0;

    document.getElementById("bloque2").textContent =
        data.bloque2 ?? 0;

    document.getElementById("bloque3").textContent =
        data.bloque3 ?? 0;

    document.getElementById("bloque4").textContent =
        data.bloque4 ?? 0;

    document.getElementById("puntaje").textContent =
        data.puntaje ?? 0;

    document.getElementById("resultado").textContent =
        data.resultado ?? "";

    const observaciones =
        document.getElementById("observaciones");

    if (observaciones) {
        observaciones.textContent =
            data.observaciones || "Sin observaciones.";
    }
}

cargarResultado();
