//REDE NEURAL///
function Camada(){
	
	this.qtdNeuronios = 0;
	
	this.neuronios = [];
	
}

function Neuronio(){
	
	this.qtdLigacoes = 0;
	
	this.pesos = [];
	
	this.saida = 0.0;
	
	this.erro = 0.0;
	
}

function RedeNeural(){
	
	this.debuging = false;
	
	this.PESO_MINIMO = -1000;
	this.PESO_MAXIMO = 1000;
	this.BIAS = 1;
	
	this.pesoMinimo = -1000;
	this.pesoMaximo = 1000;
	this.bias = 1;
	
	this.camadaEntrada = null;
	this.camadaSaida = null;
	this.camadasEscondidas = [];
	this.qtdCamadasEscondidas = 0;
	
	this.mutacaoSuave = false;
	
	this.ativacaoOculta = function(valor){
		if(valor < 0.0){
			return 0.0;
		}
		return valor;
	};
	
	this.ativacaoSaida = function(valor){
		if(valor < 0.0){
			return 0.0;
		}
		return valor;
	};
	
	this.getJSON = function(){
		return JSON.stringify(this);
	};
	
	this.setJSON = function(stringJson){
		try{
			
			var rn = JSON.parse(stringJson);
			this.setRede(rn);
			
		}
		catch(err){
			
			console.log(err);
			
		}
	};
	
	this.setRede = function(rede){
		
		this.debuging = rede.debuging;
		this.pesoMinimo = rede.pesoMinimo;
		this.pesoMaximo = rede.debuging;
		this.bias = rede.debuging;
		this.mutacaoSuave = rede.mutacaoSuave;
		
		this.camadaEntrada = new Camada();
		this.camadaSaida = new Camada();
		this.camadasEscondidas = [];
		this.qtdCamadasEscondidas = rede.qtdCamadasEscondidas;
		
		//CAMADA ENTRADA
		this.camadaEntrada.qtdNeuronios = rede.camadaEntrada.qtdNeuronios;
		this.camadaEntrada.neuronios = [];
		for(var i = 0 ; i < rede.camadaEntrada.qtdNeuronios ; i++){
			
			var nRede = rede.camadaEntrada.neuronios[i];
			
			var n = new Neuronio();
			
			n.qtdLigacoes = nRede.qtdLigacoes;
	
			n.pesos = [];
			
			n.saida = nRede.saida;
			
			n.erro = nRede.erro;
			
			for(var iN = 0 ; iN < nRede.qtdLigacoes ; iN++){
				n.pesos.push(nRede.pesos[iN]);
			}
			
			this.camadaEntrada.neuronios.push(n);
			
		}
		//CAMADA ENTRADA FIM
		
		//CAMADAS ESCONDIDAS
		for(var ic = 0 ; ic < rede.qtdCamadasEscondidas ; ic++){
			
			var camadaRede = rede.camadasEscondidas[ic];
			var camada = new Camada();
			
			camada.qtdNeuronios = camadaRede.qtdNeuronios;
			camada.neuronios = [];
			for(var i = 0 ; i < camadaRede.qtdNeuronios ; i++){
				
				var nRede = camadaRede.neuronios[i];
				
				var n = new Neuronio();
				
				n.qtdLigacoes = nRede.qtdLigacoes;
		
				n.pesos = [];
				
				n.saida = nRede.saida;
				
				n.erro = nRede.erro;
				
				for(var iN = 0 ; iN < nRede.qtdLigacoes ; iN++){
					n.pesos.push(nRede.pesos[iN]);
				}
				
				camada.neuronios.push(n);
				
			}
			
			this.camadasEscondidas.push(camada);
			
		}
		//CAMADAS ESCONDIDAS FIM
		
		//CAMADA SAÍDA
		this.camadaSaida.qtdNeuronios = rede.camadaSaida.qtdNeuronios;
		this.camadaSaida.neuronios = [];
		for(var i = 0 ; i < rede.camadaSaida.qtdNeuronios ; i++){
			
			var nRede = rede.camadaSaida.neuronios[i];
			
			var n = new Neuronio();
			
			n.qtdLigacoes = nRede.qtdLigacoes;
	
			n.pesos = [];
			
			n.saida = nRede.saida;
			
			n.erro = nRede.erro;
			
			for(var iN = 0 ; iN < nRede.qtdLigacoes ; iN++){
				n.pesos.push(nRede.pesos[iN]);
			}
			
			this.camadaSaida.neuronios.push(n);
			
		}
		//CAMADA SAÍDA FIM
		
	};
	
	this.criaNeuronio = function(ligacoes,pesoMinimo,pesoMaximo){
		
		if(ligacoes == null || ligacoes == undefined){
			ligacoes = 0;
		}
		
		if(pesoMinimo == null || pesoMinimo == undefined){
			pesoMinimo = this.PESO_MINIMO;
		}	
		if(pesoMaximo == null || pesoMaximo == undefined){
			pesoMaximo = this.PESO_MAXIMO;
		}
			
		
		var n = new Neuronio();
		
		n.qtdLigacoes = ligacoes;
		n.pesos = [];
		for(var i = 0 ; i < ligacoes ; i++){
			var rand = Math.random() * (pesoMaximo - pesoMinimo) + pesoMinimo;
			n.pesos.push(rand);
		}
		
		n.erro = 0.0;
	    n.saida = 1.0;
		
		return n;
	};
	
	this.checkPeso = function(peso){
		
		
		if(peso == null || peso == undefined){
			return (Math.random() * (this.PESO_MAXIMO - this.PESO_MINIMO) + this.PESO_MINIMO);
		}
		
		if(peso < this.PESO_MINIMO){
			return this.PESO_MINIMO;
		}else if(peso > this.PESO_MAXIMO){
			return this.PESO_MAXIMO;
		}else{
			return peso;
		}
	};
	
	this.fazerAutoMutacao = function(rangeMutacao,rangedinamica){
		
		if(this.debuging){
			console.log("fazerAutoMutacao",JSON.stringify(this));
			console.log(rangeMutacao,rangedinamica);
		}
		
		var rn = this.criarMutacao(rangeMutacao,rangedinamica);
		this.setRede(rn);
		
	};
	
	this.criarClone = function(){
		
		if(this.debuging){
			console.log("criarClone",JSON.stringify(this));
			console.log(rangeMutacao,rangedinamica);
		}
		
		var rangeMutacao = 100.0;
		var rangedinamica = true;
		
		var rnOriginal = this;
		
		if(rnOriginal == null || rnOriginal == undefined){
			return null;
		}
		
		if(rangeMutacao == null || rangeMutacao == undefined){
			rangeMutacao = Math.random() * 100.0;
		}
		if(rangedinamica == null || rangedinamica == undefined){
			rangedinamica = true;
		}
		
		var rn = new RedeNeural();
		
		rn.camadaEntrada = new Camada();
		rn.camadaSaida = new Camada();
		rn.camadasEscondidas = [];
		rn.qtdCamadasEscondidas = rnOriginal.qtdCamadasEscondidas;
		rn.mutacaoSuave = rnOriginal.mutacaoSuave;
		
		rn.camadaEntrada.qtdNeuronios = rnOriginal.camadaEntrada.qtdNeuronios;
		for(var i = 0 ;  i < rn.camadaEntrada.qtdNeuronios ; i++){
			var n = new Neuronio();
			n.saida = 1.0;
			rn.camadaEntrada.neuronios.push(n);
		}
		
		rn.camadaSaida.qtdNeuronios = rnOriginal.camadaSaida.qtdNeuronios;
		for(var i = 0 ;  i < rn.camadaSaida.qtdNeuronios ; i++){
			var n = new Neuronio();
			
			var nOriginal = rnOriginal.camadaSaida.neuronios[i];
			
			n.qtdLigacoes = nOriginal.qtdLigacoes;
			
			for(var il = 0 ;  il < n.qtdLigacoes ; il++){
				var pesoOriginal = nOriginal.pesos[il];
				n.pesos.push(this.checkPeso(pesoOriginal));
			}
			
			rn.camadaSaida.neuronios.push(n);
		}
		
		for(var i = 0 ; i < rn.qtdCamadasEscondidas ; i++){
			
			var camadaOriginal = rnOriginal.camadasEscondidas[i];
			
			var camada = new Camada();
			
			camada.qtdNeuronios = camadaOriginal.qtdNeuronios;
			
			for(var ni = 0 ; ni < camada.qtdNeuronios ; ni++){
				
				var n = new Neuronio();
			
				var nOriginal = camadaOriginal.neuronios[ni];
				
				n.qtdLigacoes = nOriginal.qtdLigacoes;
				
				for(var il = 0 ;  il < n.qtdLigacoes ; il++){
					var pesoOriginal = nOriginal.pesos[il];
					n.pesos.push(this.checkPeso(pesoOriginal));
				}
				
				camada.neuronios.push(n);
				
			}
			
			
			rn.camadasEscondidas.push(camada);
		}
		
		
		return rn;
	};
	
	this.mutacaoPeso = function(pesoOriginal,rangeMutacao,rangedinamica){
		
		var ret = pesoOriginal;
		
		if(rangeMutacao == null || rangeMutacao == undefined){
			rangeMutacao = Math.random() * 100.0;
		}
		if(rangedinamica == null || rangedinamica == undefined){
			rangedinamica = true;
		}
		
		
		var tipoMutacao = Math.round(Math.random() * (8 * 3));
		if(this.mutacaoSuave){
			tipoMutacao = 6;
		}
		
		var sinal = 1;
		var escolhaSinal = Math.random();
		if(escolhaSinal > 0.5){
			sinal = 1;
		}else{
			sinal = -1;
		}
		
		if(tipoMutacao == 1){
			var rand = Math.random() * (this.pesoMaximo - this.pesoMinimo) + this.pesoMinimo;
			ret = this.checkPeso(rand);
		}
		
		else if(tipoMutacao == 2){
			
			var vlPeso = pesoOriginal / 2.0;
			vlPeso = vlPeso * sinal;
			vlPeso = pesoOriginal + vlPeso;
			ret = this.checkPeso(vlPeso);
			
		}
		
		else if(tipoMutacao == 3){
			
			var vlPeso = pesoOriginal * 2.0;
			vlPeso = vlPeso * sinal;
			vlPeso = pesoOriginal + vlPeso;
			ret = this.checkPeso(vlPeso);
			
		}
		
		else if(tipoMutacao == 4){
			
			var vlPeso = pesoOriginal / 3.0;
			vlPeso = vlPeso * sinal;
			vlPeso = pesoOriginal + vlPeso;
			ret = this.checkPeso(vlPeso);
			
		}
		
		else if(tipoMutacao == 5){
			
			var vlPeso = pesoOriginal * 3.0;
			vlPeso = vlPeso * sinal;
			vlPeso = pesoOriginal + vlPeso;
			ret = this.checkPeso(vlPeso);
			
		}
		
		else if(tipoMutacao == 6){
			
			if(!this.mutacaoSuave){
				
				var escolha = Math.random();
				if(escolha > 0.5){
					ret = this.checkPeso((pesoOriginal) + (rangedinamica ? (Math.random() * rangeMutacao) : rangeMutacao));
				}else{
					ret = this.checkPeso((pesoOriginal) - (rangedinamica ? (Math.random() * rangeMutacao) : rangeMutacao));
				}
				
			}else{
				
				var fazMutacao = Math.random();
				if(fazMutacao > 0.5){
					
					var escolha = Math.random();
					if(escolha > 0.5){
						ret = this.checkPeso((pesoOriginal) + (rangedinamica ? (Math.random() * rangeMutacao) : rangeMutacao));
					}else{
						ret = this.checkPeso((pesoOriginal) - (rangedinamica ? (Math.random() * rangeMutacao) : rangeMutacao));
					}
					
				}
				
			}
			
		}
		
		else if(tipoMutacao == 7){
			
			var pMax = this.pesoMaximo / 2;
			var pMin = this.pesoMinimo / 2;
			var rand = Math.random() * (pMax - pMin) + pMin;
			ret = this.checkPeso(rand);
			
		}
		
		else if(tipoMutacao == 8){
			
			var pMax = this.pesoMaximo / 3;
			var pMin = this.pesoMinimo / 3;
			var rand = Math.random() * (pMax - pMin) + pMin;
			ret = this.checkPeso(rand);
			
		}
		
		return ret;
	};
	
	this.fazerMutacao = function(rangeMutacao,rangedinamica){
		try{
			
			if(rangeMutacao == null || rangeMutacao == undefined){
				rangeMutacao = Math.random() * 100.0;
			}
			if(rangedinamica == null || rangedinamica == undefined){
				rangedinamica = true;
			}
			
			//CAMADA ENTRADA
			for(var i = 0 ; i < this.camadaEntrada.qtdNeuronios ; i++){
				
				
				var n = this.camadaEntrada.neuronios[i];
				
				for(var iN = 0 ; iN < n.qtdLigacoes ; iN++){
					
					
					n.pesos[iN] = this.mutacaoPeso(n.pesos[iN],rangeMutacao,rangedinamica);
					
					
				}
				
			}
			//CAMADA ENTRADA FIM
			
			//CAMADAS ESCONDIDAS
			for(var ic = 0 ; ic < this.qtdCamadasEscondidas ; ic++){
				
				var camada = this.camadasEscondidas[ic];
				
				for(var i = 0 ; i < camada.qtdNeuronios ; i++){
					
					var n = camada.neuronios[i];
					
					for(var iN = 0 ; iN < n.qtdLigacoes ; iN++){
						
						
						n.pesos[iN] = this.mutacaoPeso(n.pesos[iN],rangeMutacao,rangedinamica);
						
						
					}
					
					
				}
				
			}
			//CAMADAS ESCONDIDAS FIM
			
			//CAMADA SAÍDA
			for(var i = 0 ; i < this.camadaSaida.qtdNeuronios ; i++){
				
				
				var n = this.camadaSaida.neuronios[i];
				
				
				for(var iN = 0 ; iN < n.qtdLigacoes ; iN++){
					
					
					n.pesos[iN] = this.mutacaoPeso(n.pesos[iN],rangeMutacao,rangedinamica);
					
					
				}
				
				
			}
			//CAMADA SAÍDA FIM
		
		}
		catch(err){
			console.log(err);
		}
	
	};
	
	this.crossDNA = function(rede,tipoCruzamento){
		
		var DNA1 = this.getDNA();
		
		var DNA2 = rede.getDNA();
		
		var lenDNA1 = DNA1.length;
		
		var lenDNA2 = DNA2.length;
		
		var tempDNA = 0.0;
		if(lenDNA1 == lenDNA2){
			for(var i = 0 ; i < lenDNA1 ; i++){
				tempDNA = DNA2[i];
				DNA2[i] = DNA1[i];
				DNA1[i] = tempDNA;
			}
		}
		
		if(tipoCruzamento === undefined){
			tipoCruzamento = "BOTH";
		}
		
		if(tipoCruzamento == "BOTH"){
			this.setDNA(DNA1);
			rede.setDNA(DNA2);
		}else if(tipoCruzamento == "SRC"){
			this.setDNA(DNA1);
		}else if(tipoCruzamento == "DST"){
			rede.setDNA(DNA2);
		}
		
		
	};
	
	this.mutarDNA = function(rangeMutacao,rangedinamica){
		var DNA = this.getDNA();
		var lenDNA = DNA.length;
		for(var i = 0 ; i < lenDNA ; i++){
			DNA[i] = this.mutacaoPeso(DNA[i],rangeMutacao,rangedinamica);
		}
		this.setDNA(DNA);
	};
	
	this.getDNA = function(){
		
		var DNA = [];
		
		try{
			
			//CAMADAS ESCONDIDAS
			for(var ic = 0 ; ic < this.qtdCamadasEscondidas ; ic++){
				
				var camada = this.camadasEscondidas[ic];
				
				for(var i = 0 ; i < camada.qtdNeuronios ; i++){
					
					var n = camada.neuronios[i];
					
					for(var iN = 0 ; iN < n.qtdLigacoes ; iN++){
						
						
						DNA.push(n.pesos[iN]);
						
						
					}
					
					
				}
				
			}
			//CAMADAS ESCONDIDAS FIM
			
			//CAMADA SAÍDA
			for(var i = 0 ; i < this.camadaSaida.qtdNeuronios ; i++){
				
				
				var n = this.camadaSaida.neuronios[i];
				
				
				for(var iN = 0 ; iN < n.qtdLigacoes ; iN++){
					
					
					DNA.push(n.pesos[iN]);
					
					
				}
				
				
			}
			//CAMADA SAÍDA FIM
		
		}
		catch(err){
			console.log(err);
			return null;
		}
		
		return DNA;
	};
	
	this.setDNA = function(DNA){
		
		
		
		try{
			
			var invertido = false;
			
			if(invertido){//SETA O DNA SÓ QUE INVERTIDO, FAZENDO QUE PROVAVELMENTE A REDE SE COMPORTE DIFERENTE
				
				
				var iDNA = 0;
			
				//CAMADAS ESCONDIDAS
				for(var ic = 0 ; ic < this.qtdCamadasEscondidas ; ic++){
					
					var camada = this.camadasEscondidas[ic];
					
					for(var i = 0 ; i < camada.qtdNeuronios ; i++){
						
						var n = camada.neuronios[i];
						
						for(var iN = 0 ; iN < n.qtdLigacoes ; iN++){
							
							
							n.pesos[iN] = DNA[iDNA];
							iDNA++;
							
						}
						
						
					}
					
				}
				//CAMADAS ESCONDIDAS FIM
				
				//CAMADA SAÍDA
				for(var i = 0 ; i < this.camadaSaida.qtdNeuronios ; i++){
					
					
					var n = this.camadaSaida.neuronios[i];
					
					
					for(var iN = 0 ; iN < n.qtdLigacoes ; iN++){
						
						
						n.pesos[iN] = DNA[iDNA];
						iDNA++;
						
					}
					
					
				}
				//CAMADA SAÍDA FIM
				
		
			}else{
				
				
				var iDNA = DNA.length - 1;
			
			
				//CAMADA SAÍDA
				for(var i = this.camadaSaida.qtdNeuronios - 1 ; i >= 0  ; i--){
					
					
					var n = this.camadaSaida.neuronios[i];
					
					
					for(var iN = n.qtdLigacoes - 1 ; iN >= 0  ; iN--){
						
						
						n.pesos[iN] = DNA[iDNA];
						iDNA--;
						
					}
					
					
				}
				//CAMADA SAÍDA FIM
				
				//CAMADAS ESCONDIDAS
				for(var ic = this.qtdCamadasEscondidas - 1 ; ic >= 0  ; ic--){
					
					var camada = this.camadasEscondidas[ic];
					
					for(var i = camada.qtdNeuronios - 1 ; i >= 0  ; i--){
						
						var n = camada.neuronios[i];
						
						for(var iN = n.qtdLigacoes - 1 ; iN >= 0  ; iN--){
							
							
							n.pesos[iN] = DNA[iDNA];
							iDNA--;
							
						}
						
						
					}
					
				}
				//CAMADAS ESCONDIDAS FIM
				
			}
			
			
			
			
			
			
		
		}
		catch(err){
			console.log(err);
		}
		
	};
	
	
	this.criarRede = function(qtdCamadasEscondidas,qtdNeuroniosCamadaEscondida,qtdNeuroniosEntrada,qtdNeuroniosSaida){
		
		qtdNeuroniosCamadaEscondida = qtdNeuroniosCamadaEscondida + this.BIAS;
		qtdNeuroniosEntrada = qtdNeuroniosEntrada + this.BIAS;
		
		this.qtdCamadasEscondidas = qtdCamadasEscondidas;
		
		this.camadasEscondidas = [];
		
		this.camadaEntrada = new Camada();
		
		this.camadaSaida = new Camada();
		
		this.camadaEntrada.qtdNeuronios = qtdNeuroniosEntrada;
		
		this.camadaEntrada.neuronios = [];
		
		this.camadaSaida.neuronios = [];
		
		//Camada entrada
		for(var i = 0 ; i < qtdNeuroniosEntrada ; i++){
			var n = new Neuronio();
			n.saida = 1.0;
			this.camadaEntrada.neuronios.push(n);
		}
		
		//Camadas escondidas
		for(var i = 0 ; i < qtdCamadasEscondidas ; i++){
			var camada = new Camada();
			
			camada.qtdNeuronios = qtdNeuroniosCamadaEscondida;
			camada.neuronios = [];
			
			for(var ni = 0 ; ni < qtdNeuroniosCamadaEscondida ; ni++){
					
				if(i == 0){
					var n = this.criaNeuronio(qtdNeuroniosEntrada);
					camada.neuronios.push(n);
				}
				else{
					var n = this.criaNeuronio(qtdNeuroniosCamadaEscondida);
					camada.neuronios.push(n);
				}	
				
			}
			
			this.camadasEscondidas.push(camada);
		}
		
		//Camada saída
		this.camadaSaida.qtdNeuronios = qtdNeuroniosSaida;
		for(var i = 0 ; i < qtdNeuroniosSaida ; i++){
			var n = this.criaNeuronio(qtdNeuroniosCamadaEscondida);
			this.camadaSaida.neuronios.push(n);
		}
		
		
		if(this.debuging){
			console.log("criarRede",JSON.stringify(this));
			console.log(qtdCamadasEscondidas,qtdNeuroniosCamadaEscondida,qtdNeuroniosEntrada,qtdNeuroniosSaida);
		}
		
	};
	
	this.inserirInputs = function(inputs){
		
		if(this.debuging){
			console.log("inserirInputs",JSON.stringify(this));
			console.log("inputs",inputs);
		}
		
		if(inputs == null || inputs == undefined){
			return;
		}
		
		for(var i = 0 ; i < this.camadaEntrada.qtdNeuronios ; i++){
			if(!isNaN(inputs[i])){
				this.camadaEntrada.neuronios[i].saida = inputs[i];
			}
		}
		
	};
	
	this.calcularInputs = function(){
		
		if(this.debuging){
			console.log("calcularInputs",JSON.stringify(this));
		}
		
		try{
			
			var i = 0;
			var j = 0;
			var k = 0;
			var somatorio = 0.0;
			
			for(i = 0 ; i < this.camadasEscondidas[0].qtdNeuronios - this.BIAS; i++){
				
				somatorio = 0.0;
				for(j = 0 ; j < this.camadaEntrada.qtdNeuronios ; j++){
					somatorio += (this.camadaEntrada.neuronios[j].saida * this.camadasEscondidas[0].neuronios[i].pesos[j]);
				}
				this.camadasEscondidas[0].neuronios[i].saida = this.ativacaoOculta(somatorio);
				
			}
			
			for(k = 1 ; i < this.qtdCamadasEscondidas ; k++){
				
				for(i = 0; i < this.camadasEscondidas[k].qtdNeuronios - this.BIAS; i++)
				{
					somatorio = 0.0;
					for(j = 0 ; j < this.camadasEscondidas[k-1].qtdNeuronios; j++)
					{
						somatorio += (this.camadasEscondidas[k-1].neuronios[j].saida * this.camadasEscondidas[k].neuronios[i].pesos[j]);
					}
					this.camadasEscondidas[k].neuronios[i].saida = this.ativacaoOculta(somatorio);
				}
				
			}
			
			for(i = 0 ; i < this.camadaSaida.qtdNeuronios ; i++)
			{
				somatorio = 0.0;
				for(j = 0 ; j < this.camadasEscondidas[k-1].qtdNeuronios ; j++)
				{
					somatorio += (this.camadasEscondidas[k-1].neuronios[j].saida * this.camadaSaida.neuronios[i].pesos[j]);
				}
				this.camadaSaida.neuronios[i].saida = this.ativacaoSaida(somatorio);
			}
			
		}
		catch(erro){
			console.log(erro);
		}
		
	};
	
	this.copiarDaSaida = function(output){
		
		if(this.debuging){
			console.log("copiarDaSaida",JSON.stringify(this));
			console.log("output",output);
		}
		
		if(output == null || output == undefined){
			return;
		}
		
		var i;

	    for( i = 0; i < this.camadaSaida.qtdNeuronios ; i++)
	    {
	        output[i] = this.camadaSaida.neuronios[i].saida;
	    }
		
	};
	
}
//REDE NEURAL FIM///
