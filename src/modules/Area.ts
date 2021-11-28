class Area {
    public x: number
    public y: number
    public type: string
    public body = document.createElement("div")

    constructor (x: number, y: number, type: string) {
        this.x = x
        this.y = y
        this.type = type
        this.setBodyDefaultVariables()
    }

    setBodyDefaultVariables = (): void => {
        this.body.classList.add('area')
        this.body.style.left = `${this.x}px`
        this.body.style.top = `${this.y}px`

        const img = document.createElement('img')

        if (this.type === 'wall') img.setAttribute('src','../../assets/textures/wall.png')
        else if (this.type === 'head') img.setAttribute('src','../../assets/textures/head.png')
        else if (this.type === 'body') img.setAttribute('src','../../assets/textures/body.png')
        else if (this.type === 'ass') img.setAttribute('src','../../assets/textures/ass.png')

        this.body.appendChild(img)
        img.classList.add('element')
    }
}

export default Area