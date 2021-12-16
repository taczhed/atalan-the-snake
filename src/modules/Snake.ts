import Area from "./Area";

const areaSize = 20

class Snake extends Area {
    public direction: string

    constructor(x: number, y: number, type: string, direction: string) {
        super(x, y, type)
        this.direction = direction
    }

    snakeIntervalChange = () => {
        this.body.style.left = `${this.x}px`
        this.body.style.top = `${this.y}px`
    }

    snakeSetPosition = (way: string, value: number) => {
        if (way === 'x') {
            this.x = value
            this.body.style.left = `${this.x}px`
        } else if (way === 'y') {
            this.y = value
            this.body.style.top = `${this.y}px`
        }
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

    changeBodyType = (oldType: string, newType: string, rotation: string) => {
        this.body.style.transform = rotation
        if (newType !== oldType) {
            if (newType === 'body') this.body.setAttribute('src','../../assets/textures/body.png'), this.type = 'body'
            else if (newType === 'circle') this.body.setAttribute('src','../../assets/textures/circle.png'), this.type = 'circle'
        }
    }

    rotateHead = (direction: string): void => {
        if (direction === 'top') this.body.style.transform = 'rotate(180deg)'
        else if (direction === 'bottom') this.body.style.transform = 'rotate(0deg)'
        else if (direction === 'left') this.body.style.transform = 'rotate(90deg)'
        else if (direction === 'right') this.body.style.transform = 'rotate(-90deg)'
        this.direction = direction
    }

    matchBodyImage = (prevSibling: Snake, bodyElement: Snake, nextSibling: Snake): void => {
        //spaghetti alert
        switch (true) {
            //end of snake
            case (!nextSibling && bodyElement.x - prevSibling.x === -areaSize): this.body.style.transform = 'rotate(270deg)'
                break
            case (!nextSibling && bodyElement.x - prevSibling.x === areaSize): this.body.style.transform = 'rotate(90deg)'
                break
            case (!nextSibling && bodyElement.y - prevSibling.y === -areaSize): this.body.style.transform = 'rotate(0deg)'
                break
            case (!nextSibling && bodyElement.y - prevSibling.y === areaSize): this.body.style.transform = 'rotate(180deg)'
                break
            //regular body
            case (bodyElement?.x - prevSibling?.x === -areaSize && bodyElement?.x - nextSibling?.x === areaSize): {
                this.changeBodyType(bodyElement.type, 'body', 'rotate(90deg)')
                break
            }
            case (bodyElement?.x - prevSibling?.x === areaSize && bodyElement?.x - nextSibling?.x === -areaSize): {
                this.changeBodyType(bodyElement.type, 'body', 'rotate(270deg)')
                break
            }
            case (bodyElement?.y - prevSibling?.y === -areaSize && bodyElement?.y - nextSibling?.y === areaSize): {
                this.changeBodyType(bodyElement.type, 'body', 'rotate(0deg)')
                break
            }
            case (bodyElement?.y - prevSibling?.y === areaSize && bodyElement?.y - nextSibling?.y === -areaSize): {
                this.changeBodyType(bodyElement.type, 'body', 'rotate(180deg)')
                break
            }
            //circles
            case (bodyElement?.x - prevSibling?.x === -areaSize && bodyElement?.y - nextSibling?.y === -areaSize || bodyElement?.x - nextSibling?.x === -areaSize && bodyElement?.y - prevSibling?.y === -areaSize ): {
                this.changeBodyType(bodyElement.type, 'circle', 'rotate(180deg)')
                break
            }
            case (bodyElement?.y - prevSibling?.y === areaSize && bodyElement?.x - nextSibling?.x === areaSize || bodyElement?.y - nextSibling?.y === areaSize && bodyElement?.x - prevSibling?.x === areaSize): {
                this.changeBodyType(bodyElement.type, 'circle', 'rotate(0deg)')
                break
            }
            case (bodyElement?.x - prevSibling?.x === areaSize && bodyElement?.y - nextSibling?.y === -areaSize || bodyElement?.x - nextSibling?.x === areaSize && bodyElement?.y - prevSibling?.y === -areaSize): {
                this.changeBodyType(bodyElement.type, 'circle', 'rotate(270deg)')
                break
            }
            case (bodyElement?.y - prevSibling?.y === areaSize && bodyElement?.x - nextSibling?.x === -areaSize || bodyElement?.y - nextSibling?.y === areaSize && bodyElement?.x - prevSibling?.x === -areaSize): {
                this.changeBodyType(bodyElement.type, 'circle', 'rotate(90deg)')
                break
            }
        }
    }
}


export default Snake