export class Footer {
    constructor() {
        this.footer = document.createElement('footer');
        this.footer.id = 'main-footer';
        document.body.appendChild(this.footer);

        window.events.subscribe('game_updated', this);
    }

    update(event, data) {
        if(event === 'game_updated') {
            this.footer.textContent = '';

            const frame = document.createElement('span');
            frame.innerText = `Frame: ${data.frame}`;
            this.footer.appendChild(frame);
            
            const snake_size = document.createElement('span');
            snake_size.innerText = `Snake size: ${data.snake.length}`;
            this.footer.appendChild(snake_size);
            
            const frametime = document.createElement('span');
            frametime.innerText = `Interval: ${data.frametime}ms`;
            this.footer.appendChild(frametime);
            
            const score = document.createElement('span');
            score.innerText = `Score: ${(data.snake.length * 100 * (100 / data.frametime)).toFixed(0)}`;
            this.footer.appendChild(score);
        }
    }
}