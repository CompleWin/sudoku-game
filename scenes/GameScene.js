class GameScene extends Phaser.Scene {
    
    constructor() {
        super('GameScene');
        this.difficulty = 'easy'; // easy, medium, hard
    }
    
    init(data) {
        this.difficulty = data.difficulty || 'easy';
    }
    
    create() {
        const { width, height } = this.scale;
        
        // Фон
        this.bg = this.add.rectangle(0, 0, width, height, 0x2c3e50)
            .setOrigin(0);
        
        // Создаем судоку
        this.createSudoku();
        
        // UI элементы
        this.createUI();
        
        // Обработка ресайза
        this.scale.on('resize', this.updateLayout, this);
        this.updateLayout();
    }
    
    createSudoku() {
        // Генерируем решенное судоку
        this.solution = this.generateSudoku();
        
        // Создаем игровое поле с пустыми клетками
        this.board = JSON.parse(JSON.stringify(this.solution));
        this.removeNumbers();
        
        // Запоминаем начальные клетки
        this.initialCells = this.board.map(row => row.map(cell => cell !== 0));
        
        // Выбранная клетка
        this.selectedCell = { row: -1, col: -1 };
        
        // Создаем визуальную сетку
        this.createGrid();
    }
    
    generateSudoku() {
        // Простой алгоритм генерации судоку
        const board = Array(9).fill(0).map(() => Array(9).fill(0));
        
        // Заполняем диагональные блоки 3x3
        for (let block = 0; block < 3; block++) {
            const nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    board[block * 3 + i][block * 3 + j] = nums[i * 3 + j];
                }
            }
        }
        
        // Заполняем остальные клетки
        this.solveSudoku(board);
        return board;
    }
    
    solveSudoku(board) {
        const empty = this.findEmpty(board);
        if (!empty) return true;
        
        const [row, col] = empty;
        const nums = this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        
        for (let num of nums) {
            if (this.isValid(board, row, col, num)) {
                board[row][col] = num;
                if (this.solveSudoku(board)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }
    
    findEmpty(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) return [i, j];
            }
        }
        return null;
    }
    
    isValid(board, row, col, num) {
        // Проверка строки
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) return false;
        }
        
        // Проверка столбца
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }
        
        // Проверка блока 3x3
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        
        return true;
    }
    
    removeNumbers() {
        const cellsToRemove = {
            easy: 30,
            medium: 45,
            hard: 55
        };
        
        const count = cellsToRemove[this.difficulty];
        let removed = 0;
        
        while (removed < count) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            
            if (this.board[row][col] !== 0) {
                this.board[row][col] = 0;
                removed++;
            }
        }
    }
    
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    
    createGrid() {
        this.gridContainer = this.add.container(0, 0);
        this.cellSize = 50;
        this.cells = [];
        this.texts = [];
        
        for (let row = 0; row < 9; row++) {
            this.cells[row] = [];
            this.texts[row] = [];
            
            for (let col = 0; col < 9; col++) {
                const x = col * this.cellSize;
                const y = row * this.cellSize;
                
                // Клетка
                const cell = this.add.rectangle(x, y, this.cellSize, this.cellSize, 0xffffff)
                    .setOrigin(0)
                    .setStrokeStyle(1, 0x34495e);
                
                // Жирные линии для блоков 3x3
                if (col % 3 === 0) cell.setStrokeStyle(3, 0x2c3e50, 1);
                if (row % 3 === 0) {
                    const thickness = cell.strokeColor === 0x2c3e50 ? 3 : 1;
                    cell.setStrokeStyle(thickness, 0x2c3e50, 1);
                }
                
                cell.setInteractive({ useHandCursor: true });
                cell.on('pointerup', () => this.selectCell(row, col));
                
                this.cells[row][col] = cell;
                this.gridContainer.add(cell);
                
                // Текст числа
                if (this.board[row][col] !== 0) {
                    const num = this.board[row][col];
                    const isInitial = this.initialCells[row][col];
                    
                    const text = this.add.text(
                        x + this.cellSize / 2,
                        y + this.cellSize / 2,
                        num.toString(),
                        {
                            fontSize: '24px',
                            color: isInitial ? '#2c3e50' : '#3498db',
                            fontFamily: 'Arial',
                            fontStyle: isInitial ? 'bold' : 'normal'
                        }
                    ).setOrigin(0.5);
                    
                    this.texts[row][col] = text;
                    this.gridContainer.add(text);
                }
            }
        }
    }
    
    selectCell(row, col) {
        // Снимаем выделение с предыдущей клетки
        if (this.selectedCell.row !== -1) {
            const prevRow = this.selectedCell.row;
            const prevCol = this.selectedCell.col;
            this.cells[prevRow][prevCol].setFillStyle(0xffffff);
        }
        
        // Выделяем новую клетку
        this.selectedCell = { row, col };
        this.cells[row][col].setFillStyle(0xe8f4f8);
    }
    
    placeNumber(num) {
        const { row, col } = this.selectedCell;
        
        if (row === -1 || this.initialCells[row][col]) return;
        
        // Удаляем старый текст
        if (this.texts[row][col]) {
            this.texts[row][col].destroy();
            this.texts[row][col] = null;
        }
        
        // Обновляем доску
        this.board[row][col] = num;
        
        // Создаем новый текст
        if (num !== 0) {
            const x = col * this.cellSize + this.cellSize / 2;
            const y = row * this.cellSize + this.cellSize / 2;
            
            const isCorrect = num === this.solution[row][col];
            
            const text = this.add.text(x, y, num.toString(), {
                fontSize: '24px',
                color: isCorrect ? '#3498db' : '#e74c3c',
                fontFamily: 'Arial'
            }).setOrigin(0.5);
            
            this.texts[row][col] = text;
            this.gridContainer.add(text);
        }
        
        // Проверяем победу
        this.checkWin();
    }
    
    checkWin() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.board[i][j] !== this.solution[i][j]) return;
            }
        }
        
        // Победа!
        this.showWinMessage();
    }
    
    showWinMessage() {
        const { width, height } = this.scale;
        
        const bg = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);
        
        const text = this.add.text(width / 2, height / 2, 'Победа!', {
            fontSize: this.getResponsiveFontSize(48) + 'px',
            color: '#2ecc71',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        this.time.delayedCall(2000, () => {
            this.scene.start('MenuScene');
        });
    }
    
    createUI() {
        const { width, height } = this.scale;
        
        // Заголовок
        const difficultyText = {
            easy: 'Легкий',
            medium: 'Средний',
            hard: 'Сложный'
        };
        
        this.titleText = this.add.text(width / 2, 20, `Судоку - ${difficultyText[this.difficulty]}`, {
            fontSize: this.getResponsiveFontSize(32) + 'px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5, 0);
        
        // Кнопка назад
        this.backButton = this.add.text(20, 20, '← Назад', {
            fontSize: this.getResponsiveFontSize(20) + 'px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0)
            .setInteractive({ useHandCursor: true });
        
        this.backButton.on('pointerover', () => this.backButton.setColor('#3498db'));
        this.backButton.on('pointerout', () => this.backButton.setColor('#ffffff'));
        this.backButton.on('pointerup', () => this.scene.start('MenuScene'));
        
        // Кнопки с цифрами
        this.createNumberButtons();
        
        // Кнопка очистки
        this.createClearButton();
    }
    
    createNumberButtons() {
        this.numberButtons = [];
        
        for (let i = 1; i <= 9; i++) {
            const btn = this.add.text(0, 0, i.toString(), {
                fontSize: '24px',
                color: '#ffffff',
                fontFamily: 'Arial',
                backgroundColor: '#3498db',
                padding: { x: 12, y: 8 }
            }).setOrigin(0.5)
                .setInteractive({ useHandCursor: true });
            
            btn.on('pointerover', () => btn.setBackgroundColor('#2980b9'));
            btn.on('pointerout', () => btn.setBackgroundColor('#3498db'));
            btn.on('pointerup', () => this.placeNumber(i));
            
            this.numberButtons.push(btn);
        }
    }
    
    createClearButton() {
        this.clearButton = this.add.text(0, 0, 'Очистить', {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'Arial',
            backgroundColor: '#e74c3c',
            padding: { x: 12, y: 8 }
        }).setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        
        this.clearButton.on('pointerover', () => this.clearButton.setBackgroundColor('#c0392b'));
        this.clearButton.on('pointerout', () => this.clearButton.setBackgroundColor('#e74c3c'));
        this.clearButton.on('pointerup', () => this.placeNumber(0));
    }
    
    getResponsiveFontSize(baseSize) {
        const scale = Math.min(
            this.scale.width / 1280,
            this.scale.height / 720
        );
        return Math.floor(baseSize * scale);
    }
    
    getResponsiveScale(baseScale) {
        const scale = Math.min(
            this.scale.width / 1280,
            this.scale.height / 720
        );
        return baseScale * scale;
    }
    
    updateLayout = () => {
        const { width, height } = this.scale;
        
        // Обновляем фон
        if (this.bg) {
            this.bg.setDisplaySize(width, height);
        }
        
        // Обновляем сетку
        if (this.gridContainer) {
            const scale = this.getResponsiveScale(1);
            this.cellSize = 50 * scale;
            
            const gridWidth = this.cellSize * 9;
            const gridHeight = this.cellSize * 9;
            
            this.gridContainer.setScale(scale);
            this.gridContainer.setPosition(
                width / 2 - gridWidth / 2,
                height / 2 - gridHeight / 2 + 30
            );
        }
        
        // Обновляем заголовок
        if (this.titleText) {
            const fontSize = this.getResponsiveFontSize(32);
            this.titleText.setFontSize(fontSize);
            this.titleText.setPosition(width / 2, 20);
        }
        
        // Обновляем кнопку назад
        if (this.backButton) {
            const fontSize = this.getResponsiveFontSize(20);
            this.backButton.setFontSize(fontSize);
        }
        
        // Обновляем кнопки с цифрами
        if (this.numberButtons) {
            const buttonSpacing = 60 * this.getResponsiveScale(1);
            const startX = width / 2 - (buttonSpacing * 4);
            const y = height - 80;
            
            this.numberButtons.forEach((btn, i) => {
                btn.setPosition(startX + i * buttonSpacing, y);
            });
        }
        
        // Обновляем кнопку очистки
        if (this.clearButton) {
            this.clearButton.setPosition(width / 2, height - 30);
        }
    }
}