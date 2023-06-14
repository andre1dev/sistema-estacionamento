document.getElementById('formulario').addEventListener('submit',cadastraVeiculo);

function cadastraVeiculo(e){
  var tipocarro = document.getElementById('tipocarro').value;
  var cor = document.getElementById('cor').value;
  var modeloCarro = document.getElementById('modeloCarro').value;
  var placaCarro = document.getElementById('placaCarro').value;
  var time = new Date();

  //Verificar se todos os campos estão preenchidos..
  if(!tipocarro && !cor && !modeloCarro && !placaCarro){

     alert("Please, enter yours dates...");
     return false;

  }

  carro= {
    cor : cor,
    tipo : tipocarro,
  	modelo : modeloCarro,
  	placa:placaCarro,
  	hora: time.getHours(),
  	minutos: time.getMinutes()
  }
  

  console.log(carro);
  //localStorage.setItem('teste', "my aplication");
  //console.log(localStorage.getItem('teste'));
  //localStorage.removeItem('teste');
  //console.log(localStorage.getItem('teste'));

  if(localStorage.getItem('patio2') === null){
    var carros= [];
    carros.push(carro);
    localStorage.setItem('patio2',JSON.stringify(carros));

  }else{
     var carros = JSON.parse(localStorage.getItem('patio2'));
     carros.push(carro);
     localStorage.setItem('patio2', JSON.stringify(carros));
  }
  
  //Para remover dados após cadastrar... 
  document.getElementById('formulario').reset(); 

  mostraPatio();

  e.preventDefault();
}

//Função deletar veículo
function deleteCar(placa){

  var carros = JSON.parse(localStorage.getItem('patio2'));

  for(var i =0; i < carros.length; i++){
    if(carros[i].placa == placa){
      carros.splice(i, 1);

    }

    localStorage.setItem('patio2', JSON.stringify(carros));

  }

  mostraPatio();

}




function mostraPatio(){
  var carros = JSON.parse(localStorage.getItem('patio2'));
  var carrosResultado = document.getElementById('resultados');

  carrosResultado.innerHTML = '';
   
  for(var i = 0; i < carros.length; i++){

    var tipo = carros[i].tipo;
    var cor = carros[i].cor;
    var modelo = carros[i].modelo;
    var placa = carros[i].placa;
    var hora = carros[i].hora;
    var minutos = carros[i].minutos;
    
     carrosResultado.innerHTML += '<tr><td>'+ tipo + '</td>' +
                      '<td>'+ cor + '</td>' +
                      '<td>'+ modelo + '</td>'+
                      '<td>'+ placa + '</td>' +
                      '<td>'+ hora + ':' + minutos  + '</td>' +
                      '<td><button class="btn btn-danger" onclick="deleteCar(\''+placa+'\')">Delete</button><td/>' +
                   '</tr>';                                               
  }  
}
