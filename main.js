'use strict';

$(() => {
    console.log('El DOM esta listo');
});

// Para que se muestre la imagen del logo
function mostrar() {
    var archivo = document.getElementById("logo").files[0];
    var reader = new FileReader();
    if (logo) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            document.getElementById("logo__img").src = reader.result;
        }
    }
}

// Haciendo lo mismo con Jquery - Profesional
$("#formProfesional").submit(function (e) {
    e.preventDefault();
    let hijos = $(e.target).children();
    nombreProfesionalObtenido.value = (hijos[1].value);
    profesionProfesionalObtenido.value = (hijos[3].value);
    emailProfesionalObtenido.value = (hijos[5].value);
    celularProfesionalObtenido.value = (hijos[7].value);
});

// Haciendo lo mismo con Jquery - Datos generales
$("#formDatos").submit(function (e) {
    e.preventDefault();
    let hijos = $(e.target).children();
    fechaObtenido.value = (hijos[1].value);
    validezObtenido.value = (hijos[3].value);
    contratoObtenido.value = (hijos[5].value);
    $("#btn-profesional").css({
        "background-color": "#60B34A",
        "border": "none"
    });
});

// Haciendo lo mismo con Jquery - Cliente
$("#formCliente").submit(function (e) {
    e.preventDefault();
    let hijos = $(e.target).children();
    nombreClienteObtenido.value = (hijos[1].value);
    cuilClienteObtenido.value = (hijos[3].value);
    emailClienteObtenido.value = (hijos[5].value);
    celularClienteObtenido.value = (hijos[7].value);
    $("#btn-cliente").css({
        "background-color": "#60B34A",
        "border": "none"
    });
});

// Datos etapas - Proyecto
$("#formTrabajo").submit(function (e) {
    e.preventDefault();
    let hijos = $(e.target).children();
    trabajoRealizar.value = (hijos[1].value);
});

// Datos etapas - Detalles (funcionando)
let formEtapa = document.getElementById("formEtapa");
formEtapa.addEventListener("submit", validarFormulario4);
const honorariosEtapas = [];
let totalHonorarios = 0;

function validarFormulario4(e) {
    e.preventDefault();
    let formEtapa = e.target;
    const etapas = [{
        nombre: formEtapa.children[1].value,
        descripcion: formEtapa.children[3].value,
        horas: formEtapa.children[5].value,
        precio: formEtapa.children[7].value
    }];
    let honorarios = ((formEtapa.children[5].value) * (formEtapa.children[7].value));
    for (const etapa of etapas) {
        let contenedor = document.createElement("div");
        contenedor.className = "etapaNueva";
        contenedor.innerHTML = `<div><h5>- ${etapa.nombre}</h5>
                                <p>${etapa.descripcion}</p>
                                <p>Horas: ${etapa.horas} hs.</p></div>
                                <h6>Honorarios: $${honorarios}</h6>`;
        etapas__presupuesto.appendChild(contenedor);

        $('.honorarios__presupuesto--list').append(`<h6>- ${etapa.nombre}</h6>`);

        honorariosEtapas.push(honorarios);
        honorariosEtapas.forEach(function (numero) {
            honorariosEtapas.shift(); 
            totalHonorarios += numero;
            });
            totalHonorariosEtapas.value = totalHonorarios;
    }  

    $("#btn-reset").show();
    $("#parrafo-reset").fadeIn("slow");
    $("#btn-etapas").css({
        "background-color": "#60B34A",
        "border": "none"
    });
    $(".etapaNueva").css({
        "display": "flex",
        "justify-content": "space-between",
        "align-items": "center",
        "padding": "0em 1em"
    })
    $(".etapaNueva div").css({        
        "width": "100%"
    })
    $(".etapaNueva h6").css({
        "width": "150px",
        "padding": "1em",
        "text-align": "center",
        "border-left": "1px solid black"
    })
}

// API dolar
const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
$(".sec__formularios").append('<button id="btn2"><i class="fas fa-search-dollar"></i>Precio del dolar</button>');
$("#btn2").on("click", function () {
    // Para que el boton solo se pueda usar una vez.
    $(this).attr('disabled', true);
    $.get(URLGET, function (respuesta, estado) {
        if (estado === "success") {
            let misDatos = respuesta;
            for (const dato of misDatos) {
                if (dato.casa.nombre == "Dolar Oficial") {
                    $(".sec__formularios").append(`<div class="cont__api">
                                <h3>${dato.casa.nombre}</h3>
                                <h4>- Compra: $${dato.casa.compra}</h4>
                                <h4>- Venta: $${dato.casa.venta}</h4>
                                </div>`);
                } else if (dato.casa.nombre == "Dolar Blue") {
                    $(".sec__formularios").append(`<div class="cont__api">
                                <h3>${dato.casa.nombre}</h3>
                                <h4>- Compra: $${dato.casa.compra}</h4>
                                <h4>- Venta: $${dato.casa.venta}</h4>
                                </div>`);
                    break;
                }
            }
        }
    });
});

// Convertir a pdf
// Queda en A3 porque en A4 tengo problemas con el font-size
document.addEventListener("DOMContentLoaded", () => {
    const Qboton = document.querySelector("#btn__pdf");
    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.getElementById("presupuesto__pdf");
        html2pdf()
            .set({
                margin: 0,
                filename: 'PresupuestoDigital-CoopeWeb_bjjs.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,                    
                },
                jsPDF: {
                    unit: "in",                    
                    format: "a3",
                    orientation: 'portrait'
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});
