import { Header } from './header/header.js';
import { Display } from './display/display.js';
import { Footer } from './footer/footer.js';

export class UI {
    constructor() {
        const header = new Header();
        const display = new Display();
        const footer = new Footer();
    }
}