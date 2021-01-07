Simple using example

//CREATION BEGIN
var qtdCamadasEscondidas = 2; //Hidden layers
var qtdNeuroniosCamadaEscondida = 5; //Number of neurons in each hidden layer
var qtdNeuroniosEntrada = 2; //Number of inputs(neurons of input layer)
var qtdNeuroniosSaida = 2; Number of outputs(neurons of output layer)

var rn = new RedeNeural();

rn.criarRede(qtdCamadasEscondidas,qtdNeuroniosCamadaEscondida,qtdNeuroniosEntrada,qtdNeuroniosSaida);
//CREATION END

//SIMPLE USE BEGIN
var bufferInputs = [2,5];

//Cleaning the output data from input layer
for(var i = 0 ; i < rn.camadaEntrada.qtdNeuronios ; i++){
	rn.camadaEntrada.neuronios[i].saida = 0.0;
}

//put new data into the input layer
rn.inserirInputs(bufferInputs);

//Neural network does the calculate
rn.calcularInputs();

//Get result of neuron one
var outputNeuronOne = rn.camadaSaida.neuronios[0].saida;

//Get result of neuron two
var outputNeuronTwo = rn.camadaSaida.neuronios[1].saida;
//SIMPLE USE END
