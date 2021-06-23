import { EventHandler } from './events/event_handler.js';
import { UI } from './graphics/graphics.js';
import { Game } from './game/game.js';

window.events = new EventHandler();

const ui = new UI();
const game = new Game({scale: 32, frametime: 80});