// ===============================
// MOSTRAR DATOS DE LA SUPERVISIÓN
// ===============================

document.getElementById("mostrarPrograma").textContent =
    localStorage.getItem("programa");

document.getElementById("mostrarEvento").textContent =
    localStorage.getItem("evento");

document.getElementById("mostrarInstructor").textContent =
    localStorage.getItem("instructor");

document.getElementById("mostrarSupervisor").textContent =
    localStorage.getItem("supervisor");

document.getElementById("mostrarFecha").textContent =
    localStorage.getItem("fecha");


// ===============================
// OBTENER CALIFICACIÓN
// ===============================

function obtenerValor(id) {

    const valor = document.getElementById(id).value;

    if (valor === "") {
        return 0;
    }

    return Number(valor);
}


// ===============================
// ACTUALIZAR TOTALES
// ===============================

function actualizarTotales() {

    // BLOQUE 1: 45 puntos

    const bloque1 =
        obtenerValor("criterio1") +
        obtenerValor("criterio2") +
        obtenerValor("criterio3") +
        obtenerValor("criterio4") +
        obtenerValor("criterio5") +
        obtenerValor("criterio6");


    // BLOQUE 2: 15 puntos

    const bloque2 =
        obtenerValor("criterio7") +
        obtenerValor("criterio8") +
        obtenerValor("criterio9");


    // BLOQUE 3: 10 puntos

    const bloque3 =
        obtenerValor("criterio10");


    // BLOQUE 4: 30 puntos

    const bloque4 =
        obtenerValor("criterio11") +
        obtenerValor("criterio12") +
        obtenerValor("criterio13") +
        obtenerValor("criterio14") +
        obtenerValor("criterio15") +
        obtenerValor("criterio16");


    // TOTAL GENERAL

    const total =
        bloque1 +
        bloque2 +
        bloque3 +
        bloque4;


    // MOSTRAR TOTALES

    document.getElementById("totalBloque1").textContent =
        bloque1;

    document.getElementById("totalBloque2").textContent =
        bloque2;

    document.getElementById("totalBloque3").textContent =
        bloque3;

    document.getElementById("totalBloque4").textContent =
        bloque4;

    document.getElementById("totalGeneral").textContent =
        total;
}


// ===============================
// ACTUALIZAR AL CAMBIAR CUALQUIER CRITERIO
// ===============================

for (let i = 1; i <= 16; i++) {

    document.getElementById("criterio" + i)
        .addEventListener("change", actualizarTotales);

}


// ===============================
// CALCULAR RESULTADO
// ===============================

async function calcularResultado() {

    // Comprobar que los 16 criterios estén llenos

    for (let i = 1; i <= 16; i++) {

        const valor =
            document.getElementById("criterio" + i).value;

        if (valor === "") {

            alert(
                "Debe calificar todos los criterios antes de continuar."
            );

            return;
        }
    }


    // ===============================
    // CALCULAR BLOQUES
    // ===============================

    const bloque1 =
        obtenerValor("criterio1") +
        obtenerValor("criterio2") +
        obtenerValor("criterio3") +
        obtenerValor("criterio4") +
        obtenerValor("criterio5") +
        obtenerValor("criterio6");


    const bloque2 =
        obtenerValor("criterio7") +
        obtenerValor("criterio8") +
        obtenerValor("criterio9");


    const bloque3 =
        obtenerValor("criterio10");


    const bloque4 =
        obtenerValor("criterio11") +
        obtenerValor("criterio12") +
        obtenerValor("criterio13") +
        obtenerValor("criterio14") +
        obtenerValor("criterio15") +
        obtenerValor("criterio16");


    // ===============================
    // TOTAL
    // ===============================

    const puntaje =
        bloque1 +
        bloque2 +
        bloque3 +
        bloque4;


    // ===============================
    // RESULTADO
    // ===============================

    let resultado;

    if (puntaje >= 95) {

        resultado = "CONFORME";

    } else {

        resultado = "NO CONFORME";

    }


    // ===============================
    // CREAR REGISTRO DE EVALUACIÓN
    // ===============================

    const evaluacion = {

        programa: localStorage.getItem("programa"),

        evento: localStorage.getItem("evento"),

        instructor: localStorage.getItem("instructor"),

        supervisor: localStorage.getItem("supervisor"),

        fecha: localStorage.getItem("fecha"),

        criterio1: obtenerValor("criterio1"),
        criterio2: obtenerValor("criterio2"),
        criterio3: obtenerValor("criterio3"),
        criterio4: obtenerValor("criterio4"),
        criterio5: obtenerValor("criterio5"),
        criterio6: obtenerValor("criterio6"),

        criterio7: obtenerValor("criterio7"),
        criterio8: obtenerValor("criterio8"),
        criterio9: obtenerValor("criterio9"),

        criterio10: obtenerValor("criterio10"),

        criterio11: obtenerValor("criterio11"),
        criterio12: obtenerValor("criterio12"),
        criterio13: obtenerValor("criterio13"),
        criterio14: obtenerValor("criterio14"),
        criterio15: obtenerValor("criterio15"),
        criterio16: obtenerValor("criterio16"),

        bloque1: bloque1,
        bloque2: bloque2,
        bloque3: bloque3,
        bloque4: bloque4,

        puntaje: puntaje,

        resultado: resultado

    };



    // ===============================
    // GUARDAR EN SUPABASE
    // ===============================

    const { data, error } = await supabaseClient
    .from("evaluaciones")
    .insert([evaluacion])
    .select()
    .single();

        console.log("RESPUESTA DEL INSERT:", data);
        console.log("ERROR DEL INSERT:", error);

        if (error) {
            console.error("Error al guardar evaluación:", error);
            alert("No se pudo guardar la evaluación: " + error.message);
            return;
        }

        console.log("EVALUACIÓN GUARDADA CORRECTAMENTE:", data);


    // ===============================
    // COMPROBAR ERROR
    // ===============================

    if (error) {

        console.error("Error al guardar:", error);

        alert(
            "No se pudo guardar la evaluación online: " +
            error.message
        );

        return;
    }


    // ===============================
    // GUARDAR ID DE LA EVALUACIÓN
    // ===============================

    localStorage.setItem(
        "idEvaluacion",
        data.id
    );


    console.log(
        "Evaluación guardada correctamente:",
        data
    );

    // ===============================
    // IR A OBSERVACIONES
    // ===============================

    window.location.href = "observaciones.html";

}