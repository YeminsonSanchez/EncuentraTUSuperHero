$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    let valueInput = $("#hero").val();
    caracter = /[a-zA-Z]/gim;
    if (valueInput.match(caracter) || valueInput > 731) {
      alert("Debes Ingresar un Número Entero Menor o igual a 731");
    } else {
      $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://superheroapi.com/api/375658621165413/" + valueInput,
        success: function (response) {
          let name = response.name;
          let connections = response.connections["group-affiliation"];
          let publisher = response.biography.publisher;
          let occupation = response.work.occupation;
          let firstAppearance = response.biography["first-appearance"];
          let height = response.appearance.height;
          let weight = response.appearance.weight;
          let aliases = response.biography.aliases;
          let img = response.image.url;
          $("#resultado").html(`
          <h3 class="text-center my-3">SuperHero Encontrado</h3>
          <hr>
          <div class="card">
              <div class="row g-0">
                  <div class="col-md-4">
                      <img src="${img}" class="imagenHeroe">
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                          <h5 class="card-title"><i>Nombre: <i>${name}</h5>
                          <p class="card-text"><i>Conexiones: <i>${connections}</p>
                          <div class="mx-3">
                              <p class="card-text"><i>Publicado: <i>${publisher}</p>
                              <hr>
                              <p class="card-text"><i>Ocupación: <i>${occupation}</p>
                              <hr>
                              <p class="card-text"><i>Primera aparición: <i>${firstAppearance}</p>
                              <hr>
                              <p class="card-text"><i>Altura: <i>${height}</p>
                              <hr>
                              <p class="card-text"><i>Peso: <i>${weight}</p>
                              <hr>
                              <p class="card-text"><i>Alianzas: <i>${aliases}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          `);
          graphic(response);
        },
        error: function (response, jxhr) {
          // esta funcion se activa si ocurre algun errordurante el proceso
          if (jxhr != "success") {
            alert("ha ocurrido un error");
          }
        },
      });
      function graphic(response) {
        var options = {
          title: {
            text: `Estadisticas del super heroe ${response.name}`,
          },
          data: [
            {
              type: "pie",
              startAngle: 10,
              toolTipContent: "<b>{label}</b>: {y}%",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel: "{label} {y}",
              dataPoints: [
                { y: response.powerstats.power, label: "poder" },
                { y: response.powerstats.durability, label: "durabilidad" },
                { y: response.powerstats.speed, label: "velocidad" },
                { y: response.powerstats.strength, label: "fuerza" },
                {
                  y: response.powerstats.intelligence,
                  label: "inteligencia",
                },
                { y: response.powerstats.combat, label: "combate" },
              ],
            },
          ],
        };
        let chart = new CanvasJS.Chart("chartContainer", options);
        chart.render();
      }
    }
  });
});
