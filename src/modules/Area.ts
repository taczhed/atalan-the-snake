class Area {
    public x: number
    public y: number
    public type: string
    public body = document.createElement('img')

    constructor (x: number, y: number, type: string) {
        this.x = x
        this.y = y
        this.type = type
        this.setBodyDefaultVariables()
    }

    setBodyDefaultVariables = (): void => {
        this.body.style.position = 'absolute'
        this.body.style.display = 'block'
        this.body.style.left = `${this.x}px`
        this.body.style.top = `${this.y}px`

        if (this.type === 'wall') this.body.setAttribute('src','../../assets/textures/wall.png')
        else if (this.type === 'head') this.body.setAttribute('src','../../assets/textures/head.png')
        else if (this.type === 'body') this.body.setAttribute('src','../../assets/textures/body.png')
        else if (this.type === 'circle') this.body.setAttribute('src','../../assets/textures/circle.png')
        else if (this.type === 'ass') this.body.setAttribute('src','../../assets/textures/ass.png')

        this.body.classList.add('area')
    }
}

export default Area