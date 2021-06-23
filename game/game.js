export class Game {
    constructor({scale = 8, frametime = 200}) {
        this.is_game_over = true;
        this.paused = true;
        this.has_queued = true;
        this.state = {
            frame: 0n,
            frametime: frametime,
            scale: scale,
            snake: [[2, 3], [1, 3], [1, 2], [1, 1]],
            fruit: [5, 3],
            moves: ['ArrowRight']
        }

        document.body.addEventListener('keydown', event => {
            if(this.is_game_over) {
                if(event.key === 'Enter') {
                    this.start();
                }
            } else if(!this.paused) {
                if(event.key === ' ') {
                    this.paused = true;
                    return;
                }

                const horizontal = new Set(['ArrowLeft', 'ArrowRight']);
                const vertical = new Set(['ArrowUp', 'ArrowDown']);
                
                const previous = this.state.moves[this.state.moves.length - 1];
                if(
                    (horizontal.has(event.key) && !horizontal.has(previous)) ||
                    (vertical.has(event.key) && !vertical.has(previous))
                ) {
                    if(this.has_queued) {
                        this.state.moves.push(event.key);
                    } else {
                        this.state.moves[0] = event.key;
                    }
                    this.has_queued = true;
                }
            } else {
                if(event.key === ' ') {
                    this.paused = false;
                    this.loop();
                    return;
                }
            }
        })
    }

    spawn_fruit() {
        // All coordinates in the current board
        let buffer = Array(this.state.scale ** 2).fill(this.state.scale).map((size, index) => [index % size, (index - index % size) / size]);;
        
        // For all pieces of the snake
        for(const [x, y] of this.state.snake) {
            // Remove the snake piece from the buffer
            buffer[x + y * this.state.scale] = false;
        }

        // Filter out 'false' items
        buffer = buffer.filter(Boolean);

        // Get a random position from the buffer
        this.state.fruit = buffer[Math.floor(buffer.length * Math.random())];

        // Increases the snake size
        this.state.snake.push([-1200, -1200]);
    }

    start() {
        this.has_queued = true;
        this.state = {
            frame: 0n,
            frametime: this.state.frametime,
            scale: this.state.scale,
            snake: [[2, 3], [1, 3], [1, 2], [1, 1]],
            fruit: [5, 3],
            moves: ['ArrowRight']
        }
        
        this.is_game_over = false;
        this.paused = false;
        this.loop();
        // this.game_update();
    }

    check_win() {
        if(this.state.snake.length >= this.state.scale ** 2) {
            window.events.fire_event('game_won');
            this.is_game_over = true;
            this.state.fruit = [-1000, -1000];
        }
    }

    check_game_over() {
        const snake_head = this.state.snake[0];

        // Checks if you're out of bounds
        if(
            snake_head[0] < 0 || snake_head[0] >= this.state.scale ||
            snake_head[1] < 0 || snake_head[1] >= this.state.scale
        ) {
            this.is_game_over = true;
            window.events.fire_event('game_over');
        }

        // Checks if the snake collided with itself [slice(1) will count everything but the head]
        for(const [x, y] of this.state.snake.slice(1)) {
            if(x === snake_head[0] && y === snake_head[1]) {
                this.is_game_over = true; 
                window.events.fire_event('game_over');
            }
        }
    }

    async loop() {
        while(!(this.is_game_over || this.paused)) {
            await (new Promise(resolve => setTimeout(resolve, this.state.frametime))); // Equivalent of sleep(this.state.frametime);
            this.game_update();
        }
    }

    game_update() {
        if(this.paused) {
            window.events.fire_event('game_paused');
            return;
        }

        this.state.frame++;

        // Move body
        for(let i = this.state.snake.length - 1; i > 0; i--) {
            this.state.snake[i][0] = this.state.snake[i - 1][0];
            this.state.snake[i][1] = this.state.snake[i - 1][1];
        }

        const hashmap = new Map([
            ['ArrowLeft', [-1, 0]],
            ['ArrowUp', [0, -1]],
            ['ArrowRight', [1, 0]],
            ['ArrowDown', [0, 1]],
        ])

        // Move head
        this.state.snake[0][0] += hashmap.get(this.state.moves[0])[0];
        this.state.snake[0][1] += hashmap.get(this.state.moves[0])[1];

        if(this.state.moves.length > 1) {
            this.state.moves.shift();
        } else {
            this.has_queued = false;
        }

        if(
            this.state.snake[0][0] === this.state.fruit[0] &&
            this.state.snake[0][1] === this.state.fruit[1]
        ) {
            this.spawn_fruit();
        }

        window.events.fire_event('game_updated', this.state);

        this.check_game_over();
        this.check_win();
    }
}