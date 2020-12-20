var game = {
	userSymbol: '',
	computerSymbol: '',
	setSymbol(select){
		this.userSymbol = select;
		if(this.userSymbol == 'x'){
			this.computerSymbol = 'o';
		}else{
			this.computerSymbol = 'x';
		}	
	},	
	step: '',
	moveStep(){
		if(this.step == 'user'){
			this.step = 'computer';
		}else if(this.step == 'computer'){
			this.step = 'user';
		}
	},
	win: 'none',
	winComputer: 0,
	winUser: 0,
}

var computer= {
	firstStep(){
		if(field.table[1][1] == 10){
			field.fillCell(1, 1);
		}else{
			let i = random(0 , 1);
			if(i == 1){
				i = 2;
			}
			let j = random(0, 1);
			if(j == 1){
				j = 2;
			}
			field.fillCell(i, j);
		}
		this.moveNumber += 1;
	},
	nextStep(){
		// победа пк
		//строки
		let move = false;
		for(let i=0; i<3 && move == false; i++){
			let res = 0;
			let cres = 0;
			for(let j=0; j<3; j++){
				res+=field.table[i][j];
				cres+=field.table[j][i];
			}
			if((res-10) == 0){
				for(let j=0; j<3; j++){
					if(field.table[i][j] == 10){
						field.fillCell(i, j);
						move = true;
					}
				}
			}
			if((cres-10) == 0){
				for(let j=0; j<3; j++){
					if(field.table[j][i] == 10){
						field.fillCell(j, i);
						move = true;
					}
				}
			}
		}
		//диагонали
		resGeneralDiagonal = 0;
		resSideDiagonal = 0;
		for(let i=0; i<3 && move == false; i++){
			resGeneralDiagonal += field.table[i][i];
			resSideDiagonal += field.table[i][2-i];
		}
		if((resGeneralDiagonal-10) == 0){
			for(let j=0; j<3; j++){
				if(field.table[j][j] == 10){
					field.fillCell(j, j);
					move = true;
				}
			}
		}
		if((resSideDiagonal-10) == 0){
			for(let j=0; j<3; j++){
				if(field.table[j][2-j] == 10){
					field.fillCell(j, 2-j);
					move = true;
				}
			}
		}
		//защита 
		for(let i=0; i<3 && move == false; i++){
			let res = 0;
			let cres = 0;
			for(let j=0; j<3; j++){
				res+=field.table[i][j];
				cres+=field.table[j][i];
			}
			if((res-10) == 2){
				for(let j=0; j<3; j++){
					if(field.table[i][j] == 10){
						field.fillCell(i, j);
						move = true;
					}
				}
			}
			if((cres-10) == 2){
				for(let j=0; j<3; j++){
					if(field.table[j][i] == 10){
						field.fillCell(j, i);
						move = true;
					}
				}
			}
		}
		//диагонали защита
		resGeneralDiagonal = 0;
		resSideDiagonal = 0;
		for(let i=0; i<3 && move == false; i++){
			resGeneralDiagonal += field.table[i][i];
			resSideDiagonal += field.table[i][2-i];
		}
		if((resGeneralDiagonal-10) == 2){
			for(let j=0; j<3; j++){
				if(field.table[j][j] == 10){
					field.fillCell(j, j);
					move = true;
				}
			}
		}
		if((resSideDiagonal-10) == 2){
			for(let j=0; j<3; j++){
				if(field.table[j][2-j] == 10){
					field.fillCell(j, 2-j);
					move = true;
				}
			}
		}

		//атака
		while(game.step == 'computer'){
			let i = random(0, 2);
			let j = random(0, 2);
			if(field.table[i][j] == 10){
				field.fillCell(i, j);
			}
		}

	},
	moveNumber: 0,
	computerMove(){
		if(game.win == 'none'){
			if(computer.moveNumber == 0){
				computer.firstStep();
			}else{
				computer.nextStep();
			}
		}
	}
}

var field = { //если юзер, то ставит 1, если пк, то ставит 0
	table: [[10, 10, 10],
			[10, 10, 10],
			[10, 10, 10]
			],
	fillCell(i, j){
		if(this.table[i][j] == 10){
			let id = 'cell_'+i+j;
				if(game.step == 'user'){
					this.table[i][j] = 1;
					symbol = game.userSymbol;
				}else{
					this.table[i][j] = 0;
					symbol = game.computerSymbol;
				}
				if(symbol == 'x'){
					document.getElementById(id).classList.add('xStyle');
					document.getElementById(id).textContent = 'X';
				}else{
					document.getElementById(id).classList.add('oStyle');
					document.getElementById(id).textContent = 'O';
				}
			game.moveStep();
			this.checkWin();
		}
	},
	checkWin(){
		win = 'none';
		//проверка строк и столбцов на победу
		for(let i=0; i<3; i++){
			resString = 0;
			resColumn = 0;
			for(let j=0; j<3; j++){
				resString+=this.table[i][j];
				resColumn+=this.table[j][i];
			}
			if((resString == 0) || (resColumn == 0)){
				win = 'computer';
				game.winComputer++;
			}
			if((resString == 3) || (resColumn == 3)){
				win = 'user';
				game.winUser++;
			}
		}
		//проверка диагоналей на победу
		resGeneralDiagonal = 0;
		resSideDiagonal = 0;
		for(let i=0; i<3; i++){
			resGeneralDiagonal += this.table[i][i];
			resSideDiagonal += this.table[i][2-i];
		}
		if((resGeneralDiagonal == 0) || (resSideDiagonal == 0)){
				win = 'computer';
				game.winComputer++;
			}
			if((resGeneralDiagonal == 3) || (resSideDiagonal == 3)){
				win = 'user';
				game.winUser++;
		}
		let deadHeat = 0;
		if(win == 'none'){
			for(let i=0; i<3; i++){
				for(let j=0; j<3; j++){
					deadHeat += this.table[i][j];
				}
			}
			if(deadHeat <= 9){
				win = 'dead heat';
				game.winComputer += 0.5;
				game.winUser += 0.5;
			}
		}

		//результат
		if(win != 'none'){
			game.win = win;
			if(win != 'dead heat'){
				this.winStyle();
			}
			document.getElementById('result').textContent = game.win;
			document.getElementById('result').hidden = false;
			document.getElementById('nextGameButton').hidden = false;

			document.getElementById('resUser').textContent = game.winUser;
			document.getElementById('resComputer').textContent = game.winComputer;
		}
	},
	winStyle(){
		if(game.win == 'user'){
			winner = 1;
		}else{
			winner = 0;
		}
		winner = winner*3;
		//строки
		for(let i=0; i<3; i++){
			let res = 0;
			for(let j=0; j<3; j++){
				res+= this.table[i][j];
			}
			if(res == winner){
				for(let j=0; j<3; j++){
					let id = 'cell_'+i+j;
					document.getElementById(id).classList.remove('oStyle', 'xStyle');
					document.getElementById(id).classList.add('winStyle');
				}
			}
		}
		//столбцы
		for(let i=0; i<3; i++){
			let res = 0;
			for(let j=0; j<3; j++){
				res+= this.table[j][i];
			}
			if(res == winner){
				for(let j=0; j<3; j++){
					let id = 'cell_'+j+i;
					document.getElementById(id).classList.remove('oStyle', 'xStyle');
					document.getElementById(id).classList.add('winStyle');
				}
			}
		}
		//главная диагональ
		let res = 0;
		for(let i=0; i<3; i++){
			res += this.table[i][i];
		}
		if(res == winner){
			for(let i=0; i<3; i++){
				let id = 'cell_'+i+i;
				document.getElementById(id).classList.remove('oStyle', 'xStyle');
				document.getElementById(id).classList.add('winStyle');
			}
		}
		//побочная диагональ
		res = 0;
		for(let i=0; i<3; i++){
			res += this.table[i][2-i];
		}
		if(res == winner){
			for(let i=0; i<3; i++){
				let id = 'cell_'+i+(2-i);
				document.getElementById(id).classList.remove('oStyle', 'xStyle');
				document.getElementById(id).classList.add('winStyle');
			}
		}
	},
	clean(){
		for(let i=0; i<3; i++){
			for(let j=0; j<3; j++){
				let id = 'cell_'+i+j;
				document.getElementById(id).classList.remove('oStyle', 'xStyle', 'winStyle');
				document.getElementById(id).textContent = '';
				this.table[i][j] = 10;
			}
		}
	}
}

function start(select){ 
	game.setSymbol(select);
	document.getElementById('choice').hidden = true;
	document.getElementById('xo').hidden = false;
	firstStep = random(0, 1);
	if(firstStep == 0){
		game.step = 'user';
	}else{
		game.step = 'computer';
		computer.firstStep();
	}
}

function touch(i, j){
	if((game.step == 'user') && (game.win == 'none')){
		field.fillCell(i, j);
		if(game.win == 'none'){
			setTimeout(computer.computerMove, 300);
		}
	}
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function log(param){
	console.log(param);
}

function nextGame(){
	field.clean();
	computer.moveNumber = 0;
	document.getElementById('xo').hidden = true;
	document.getElementById('nextGameButton').hidden = true;
	document.getElementById('result').hidden = true;
	document.getElementById('choice').hidden = false;
	game.win = 'none';
}