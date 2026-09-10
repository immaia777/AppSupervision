// =====================================================
// CARGAR PROGRAMAS DESDE SUPABASE
// =====================================================

async function cargarProgramas() {

    const programaSelect =
        document.getElementById("programa");

    if (!programaSelect) return;

    const { data, error } = await supabaseClient
    .from("programas")
    .select(
        "numero_programa, nombre_evento, instructor_tutor"
    )
    .order("numero_programa");

        console.log("DATOS DE PROGRAMAS:", data);
        console.log("ERROR:", error);

    if (error) {

        console.error(
            "Error al cargar programas:",
            error
        );

        alert(
            "No se pudieron cargar los programas."
        );

        return;
    }

    // Limpiar el SELECT
    programaSelect.innerHTML =
        '<option value="">Seleccione un programa</option>';

    // Agregar programas reales
    data.forEach(programa => {

        const opcion =
            document.createElement("option");

        opcion.value =
            programa.numero_programa;

        opcion.textContent =
            programa.numero_programa;

        programaSelect.appendChild(opcion);

    });

    console.log(
        "Programas cargados desde Supabase:",
        data.length
    );
}


// =====================================================
// OBTENER EVENTO E INSTRUCTOR
// =====================================================

async function cargarDatosPrograma() {

    const programa =
        document.getElementById("programa");

    const evento =
        document.getElementById("evento");

    const instructor =
        document.getElementById("instructor");

    const numero =
        programa.value;


    if (!numero) {

        evento.value = "";
        instructor.value = "";

        return;
    }


    const { data, error } =
        await supabaseClient
            .from("programas")
            .select(
                "nombre_evento, instructor_tutor"
            )
            .eq(
                "numero_programa",
                numero
            )
            .limit(1)
            .single();


    if (error) {

        console.error(
            "Error al obtener programa:",
            error
        );

        evento.value = "";
        instructor.value = "";

        return;
    }


    evento.value =
        data.nombre_evento || "";

    instructor.value =
        data.instructor_tutor || "";
}


// =====================================================
// INICIAR
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarProgramas();

        const programa =
            document.getElementById("programa");

        if (programa) {

            programa.addEventListener(
                "change",
                cargarDatosPrograma
            );

        }

    }
);


// =====================================================
// CONTINUAR A EVALUACIÓN
// =====================================================

function irAEvaluacion() {

    const programa =
        document.getElementById("programa").value;

    const evento =
        document.getElementById("evento").value;

    const instructor =
        document.getElementById("instructor").value;

    const supervisor =
        document.getElementById("supervisor").value.trim();

    const fecha =
        document.getElementById("fecha").value;


    if (
        programa === "" ||
        supervisor === "" ||
        fecha === ""
    ) {

        alert(
            "Complete todos los campos."
        );

        return;
    }


    localStorage.setItem(
        "programa",
        programa
    );

    localStorage.setItem(
        "evento",
        evento
    );

    localStorage.setItem(
        "instructor",
        instructor
    );

    localStorage.setItem(
        "supervisor",
        supervisor
    );

    localStorage.setItem(
        "fecha",
        fecha
    );


    window.location.href =
        "evaluacion.html";
}


// =====================================================
// MOSTRAR FORMULARIO
// =====================================================

function mostrarFormulario() {

    document.getElementById(
        "formularioSupervision"
    ).style.display = "block";

}


// =====================================================
// HISTORIAL
// =====================================================

function verHistorial() {

    window.location.href =
        "historial.html";

}


// =====================================================
// CONTAR SUPERVISIONES
// =====================================================

async function contarSupervisiones() {

    const { count, error } =
        await supabaseClient
            .from("evaluaciones")
            .select("*", {
                count: "exact",
                head: true
            });


    if (error) {

        console.error(
            "Error al contar:",
            error
        );

        return;
    }


    const elemento =
        document.getElementById(
            "cantidadSupervisiones"
        );


    if (elemento) {

        elemento.textContent =
            count ?? 0;

    }

}