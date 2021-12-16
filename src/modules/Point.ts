import Area from "./Area";

class Point extends Area {

    constructor(x: number, y: number, type: string) {
        super(x, y, type)
        this.body.setAttribute('src' , `../../assets/textures/${type}.png`)
        this.body.classList.add(type)
    }
}


export default Point