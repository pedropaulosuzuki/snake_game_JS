export class Header {
    constructor() {
        this.header = document.createElement('header');
        this.header.id = 'main-header';
        this.header.innerText = 'Snake'
        document.body.appendChild(this.header);
    }
}