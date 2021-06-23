export class Display {
    constructor() {
        this.display = document.createElement('main');
        this.display.id = 'main-content';
        document.body.appendChild(this.display);
        
        // Adds instructions on the left
        {
            const instructions_container = document.createElement('section');
            instructions_container.classList.add('instructions');
    
            const h2 = document.createElement('h2');
            h2.innerText = 'Enjoy!';
            instructions_container.appendChild(h2);

            const p = document.createElement('p');
            p.innerText = 'Built with HTML, CSS and JS using the observer pattern!';
            instructions_container.appendChild(p);

            this.display.appendChild(instructions_container);
        }

        // Adds game content in the middle
        const container = document.createElement('section');
        container.id = 'container';
        this.display.appendChild(container);
        
        this.screen = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.screen.id = 'screen';
        this.screen.setAttribute('viewBox', '0 0 100 100');
        container.appendChild(this.screen);
        
        // Adds instructions on the right
        {
            const instructions_container = document.createElement('section');
            instructions_container.classList.add('instructions');
    
            const h2 = document.createElement('h2');
            h2.innerText = 'Controls:';
            instructions_container.appendChild(h2);

            const p1 = document.createElement('p');
            p1.innerHTML = 'Use the arrow keys to move the snake.';
            instructions_container.appendChild(p1);

            const p2 = document.createElement('p');
            p2.innerHTML = 'Press [Space] to pause and resume.';
            instructions_container.appendChild(p2);

            this.display.appendChild(instructions_container);
        }

        // Subscribe to all events
        window.events.subscribe('game_updated', this);
        window.events.subscribe('game_paused', this);
        window.events.subscribe('game_over', this);
        window.events.subscribe('game_won', this);

        this.draw_welcome_screen();
    }

    draw_welcome_screen() {
        const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        overlay.classList.add('overlay');
        this.screen.appendChild(overlay);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '50%');
        text.setAttribute('y', '50%');
        text.textContent = 'Welcome!';
        this.screen.appendChild(text);

        const subtext = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        subtext.setAttribute('x', '50%');
        subtext.setAttribute('dy', '10px');
        subtext.textContent = 'Press [Enter] to start!';
        text.appendChild(subtext);
    }

    update(event, data) {
        if(event === 'game_updated') {
            const scale = data.scale;
            const snake = data.snake;
            const fruit = data.fruit;
            const padding = 0.1;
            const radius = 0.2;

            this.screen.textContent = '';

            for(const [x, y] of snake) {
                const snake_part = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                snake_part.setAttribute('width' , 100 / scale * (1 - 2 * padding));
                snake_part.setAttribute('height', 100 / scale * (1 - 2 * padding));
                snake_part.setAttribute('x', x * 100 / scale + 100 / scale * padding);
                snake_part.setAttribute('y', y * 100 / scale + 100 / scale * padding);
                snake_part.setAttribute('rx', 100 / scale * radius);
                snake_part.classList.add('snake-part');
                this.screen.appendChild(snake_part);
            }

            {
                const [ x, y ] = fruit;

                const fruit_part = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                fruit_part.setAttribute('width' , 100 / scale * (1 - 2 * padding));
                fruit_part.setAttribute('height', 100 / scale * (1 - 2 * padding));
                fruit_part.setAttribute('x', x * 100 / scale + 100 / scale * padding);
                fruit_part.setAttribute('y', y * 100 / scale + 100 / scale * padding);
                fruit_part.setAttribute('rx', 100 / scale * radius);
                fruit_part.classList.add('fruit');
                this.screen.appendChild(fruit_part);
            }
        }

        if(event === 'game_paused') {
            const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            overlay.classList.add('overlay');
            this.screen.appendChild(overlay);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '50%');
            text.setAttribute('y', '50%');
            text.textContent = 'Paused!';
            this.screen.appendChild(text);

            const subtext = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            subtext.setAttribute('x', '50%');
            subtext.setAttribute('dy', '10px');
            subtext.textContent = 'Press [Space] to resume playing!';
            text.appendChild(subtext);
        }

        if(event === 'game_over') {
            const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            overlay.classList.add('overlay');
            this.screen.appendChild(overlay);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '50%');
            text.setAttribute('y', '50%');
            text.textContent = 'You lose!';
            this.screen.appendChild(text);

            const subtext = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            subtext.setAttribute('x', '50%');
            subtext.setAttribute('dy', '10px');
            subtext.textContent = 'Press [Enter] to play again!';
            text.appendChild(subtext);
        }

        if(event === 'game_won') {
            const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            overlay.classList.add('overlay');
            this.screen.appendChild(overlay);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', '50%');
            text.setAttribute('y', '50%');
            text.textContent = 'You win!';
            this.screen.appendChild(text);

            const subtext = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            subtext.setAttribute('x', '50%');
            subtext.setAttribute('dy', '10px');
            subtext.textContent = 'Press [Enter] to play again!';
            text.appendChild(subtext);
        }
    }
}