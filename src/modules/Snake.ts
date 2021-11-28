import Area from "./Area";

class Snake extends Area {
    constructor(x: number, y: number, type: string) {
        super(x, y, type)
    }

    snakeIntervalChange = () => {
        this.body.style.left = `${this.x}px`
        this.body.style.top = `${this.y}px`
    }

    snakeMove = (way: string, px: number): void => {
        if (way === 'x') {
            this.x = this.x + px
            this.body.style.left = `${this.x}px`
        } else {
            this.y = this.y + px
            this.body.style.top = `${this.y}px`
        }
    }

    rotateHead = (way: string): void => {
        if (way === 'top') this.body.style.transform = 'rotate(180deg)';
        else if (way === 'bottom') this.body.style.transform = 'rotate(0deg)';
        else if (way === 'left') this.body.style.transform = 'rotate(90deg)';
        else if (way === 'right') this.body.style.transform = 'rotate(-90deg)';
    }

    matchBodyImage = () => {

    }
}

export default Snake