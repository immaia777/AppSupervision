// ===============================
// ELEMENTOS
// ===============================

const lista =
    document.getElementById("listaEvaluaciones");

const buscar =
    document.getElementById("buscar");

const filtroFecha =
    document.getElementById("filtroFecha");

const filtroResultado =
    document.getElementById("filtroResultado");

let evaluaciones = [];


// ===============================
// CARGAR HISTORIAL
// ===============================

async function cargarHistorial() {

    lista.innerHTML =
        "<p>Cargando evaluaciones...</p>";

    const { data, error } =
        await supabaseClient
            .from("evaluaciones")
            .select("*")
            .order("created_at", {
                ascending: false
            });

    if (error) {

        console.error(
            "Error al cargar historial:",
            error
        );

        lista.innerHTML =
            "<p>No se pudieron cargar las evaluaciones.</p>";

        return;
    }

    evaluaciones = data || [];

    mostrarEvaluaciones(evaluaciones);
}


// ===============================
// MOSTRAR EVALUACIONES
// ===============================

function mostrarEvaluaciones(listaEvaluaciones) {

    lista.innerHTML = "";

    if (listaEvaluaciones.length === 0) {

        lista.innerHTML =
            "<p>No se encontraron supervisiones.</p>";

        return;
    }


    listaEvaluaciones.forEach(function (evaluacion, indice) {

        const tarjeta =
            document.createElement("div");

        tarjeta.className =
            "tarjeta-evaluacion";

        tarjeta.innerHTML = `

            <h2>Supervisión ${indice + 1}</h2>

            <p>
                <strong>No. de Programa:</strong>
                ${evaluacion.programa}
            </p>

            <p>
                <strong>Evento:</strong>
                ${evaluacion.evento}
            </p>

            <p>
                <strong>Instructor:</strong>
                ${evaluacion.instructor}
            </p>

            <p>
                <strong>Supervisor:</strong>
                ${evaluacion.supervisor}
            </p>

            <p>
                <strong>Fecha:</strong>
                ${evaluacion.fecha}
            </p>

            <p>
                <strong>Puntaje:</strong>
                ${evaluacion.puntaje} / 100
            </p>

            <p>
                <strong>Resultado:</strong>
                ${evaluacion.resultado}
            </p>

            <div class="botones-historial">

             <button onclick="verDetalle(${evaluacion.id})">
                    Ver detalle
                </button>

                <button onclick="editarEvaluacion(${evaluacion.id})">
                    Editar
                </button>

                <button onclick="eliminarEvaluacion(${evaluacion.id})">
                    Eliminar
                </button>

            </div>
        `;

        lista.appendChild(tarjeta);

    });
}


// ===============================
// FILTRAR
// ===============================

function filtrarEvaluaciones() {

    const texto =
        buscar.value.toLowerCase().trim();

    const fecha =
        filtroFecha.value;

    const resultado =
        filtroResultado.value;


    const filtradas =
        evaluaciones.filter(function (evaluacion) {

            const coincideTexto =
                evaluacion.programa
                    .toLowerCase()
                    .includes(texto)
                ||
                evaluacion.supervisor
                    .toLowerCase()
                    .includes(texto);


            const coincideFecha =
                fecha === ""
                ||
                evaluacion.fecha === fecha;


            const coincideResultado =
                resultado === ""
                ||
                evaluacion.resultado === resultado;


            return (
                coincideTexto &&
                coincideFecha &&
                coincideResultado
            );

        });


    mostrarEvaluaciones(filtradas);
}


// ===============================
// EVENTOS DE FILTRO
// ===============================

buscar.addEventListener(
    "input",
    filtrarEvaluaciones
);

filtroFecha.addEventListener(
    "change",
    filtrarEvaluaciones
);

filtroResultado.addEventListener(
    "change",
    filtrarEvaluaciones
);


// ===============================
// VER DETALLE
// ===============================

function verDetalle(id) {

    window.location.href =
        "detalle.html?id=" + id;

}


// ===============================
// EDITAR EVALUACIÓN
// ===============================

function editarEvaluacion(id) {

    window.location.href =
        "editar.html?id=" + id;

}


// ===============================
// VOLVER AL INICIO
// ===============================

function volverInicio() {

    window.location.href =
        "index.html";

}


// ===============================
// INICIAR
// ===============================

cargarHistorial();
async function eliminarEvaluacion(id) {

    const confirmar =
        confirm(
            "¿Está seguro de que desea eliminar esta supervisión?"
        );

    if (!confirmar) {
        return;
    }


    const { error } =
        await supabaseClient
            .from("evaluaciones")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(
            "Error al eliminar:",
            error
        );

        alert(
            "No se pudo eliminar la supervisión: " +
            error.message
        );

        return;
    }


    alert(
        "Supervisión eliminada correctamente."
    );


    cargarHistorial();
}