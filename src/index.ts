// 36x22 map size
import Area from './modules/Area'
import Snake from './modules/Snake'
import defaultMap from "../assets/maps/default.json"
import Point from "./modules/Point";

//variables
const snakeSize = 8
const areaSize = 20
const mapWidth = 36
const mapHeight = 22
let points = 0
let snakeCords = [8, 10] //y, x
let currentDestiantion = 'bottom'
let gameMapScheme = defaultMap.gameMap
let arrayOfMapAreas: Array<Array< Area | Point | number >> = gameMapScheme
let snakeInterval: NodeJS.Timer
let snakeTimeOut: NodeJS.Timeout
let snakeBody: Array<Snake> = []
let pressAccess = true
const gameMap = document.getElementById('app')
let music: HTMLAudioElement

const app = {
    audio: async () => {
        music = new Audio('../assets/sounds/background_song.mp4')
        music.loop = true
    },
    startTheGame: () => {
        gameMap.innerHTML = ''
        music.src = '../assets/sounds/background.mp4'
        app.renderMapOfTheGame()
        app.renderSnake()
        app.renderPoint()
    },
    renderMapOfTheGame: () => {
        let y = 0
        gameMapScheme.forEach((gameRow, yIndex) => {
            let x = 0
            gameRow.forEach((gameAreaType, xIndex) => {
                if (gameAreaType === 1) {
                    const area = new Area(x, y, 'wall')
                    gameMap.appendChild(area.body)
                    arrayOfMapAreas[yIndex][xIndex] = area
                }
                x += areaSize
            })
            y += areaSize
        })
    },

    setSnakeInterval: (): void => {
        snakeTimeOut = setTimeout(() => (
            snakeInterval = setInterval(() => {
                    if (currentDestiantion === 'top' && typeof gameMapScheme[snakeCords[0] - 1][snakeCords[1]] === 'number') {
                        snakeBody[0].rotateHead('top')
                        if (app.isBodyHittedByHead('top')) app.endGame()
                        else {
                            if (arrayOfMapAreas[snakeCords[0] - 1][snakeCords[1]] === 1) app.collectPoint(snakeCords[0] - 1, snakeCords[1], 'top')
                            app.moveAllSnakeBody()
                            snakeBody[0].snakeMove('y', -areaSize)
                            app.MatchTextures()
                            snakeCords[0] -= 1
                        }
                    } else if (currentDestiantion === 'bottom' && typeof gameMapScheme[snakeCords[0] + 1][snakeCords[1]] === 'number') {
                        snakeBody[0].rotateHead('bottom')
                        if (app.isBodyHittedByHead('bottom')) app.endGame()
                        else {
                            if (arrayOfMapAreas[snakeCords[0] + 1][snakeCords[1]]) app.collectPoint(snakeCords[0] + 1, snakeCords[1], 'bottom')
                            app.moveAllSnakeBody()
                            snakeBody[0].snakeMove('y', areaSize)
                            app.MatchTextures()
                            snakeCords[0] += 1
                        }
                    } else if (currentDestiantion === 'left' && typeof gameMapScheme[snakeCords[0]][snakeCords[1] - 1] === 'number') {
                        snakeBody[0].rotateHead('left')
                        if (app.isBodyHittedByHead('left')) app.endGame()
                        else {
                            if (arrayOfMapAreas[snakeCords[0]][snakeCords[1] - 1]) app.collectPoint(snakeCords[0], snakeCords[1] - 1, 'left')
                            app.moveAllSnakeBody()
                            snakeBody[0].snakeMove('x', -areaSize)
                            app.MatchTextures()
                            snakeCords[1] -= 1
                        }
                    } else if (currentDestiantion === 'right' && typeof gameMapScheme[snakeCords[0]][snakeCords[1] + 1] === 'number') {
                        snakeBody[0].rotateHead('right')
                        if (app.isBodyHittedByHead('right')) app.endGame()
                        else {
                            if (arrayOfMapAreas[snakeCords[0]][snakeCords[1] + 1]) app.collectPoint(snakeCords[0], snakeCords[1] + 1, 'right')
                            app.moveAllSnakeBody()
                            snakeBody[0].snakeMove('x', areaSize)
                            app.MatchTextures()
                            snakeCords[1] += 1
                        }
                    } else {
                        app.endGame()
                    }
                pressAccess = true
            }, 250)
        ), 250)
    },

    renderSnake: () => {
        const snake = new Snake(snakeCords[1] * areaSize, snakeCords[0] * areaSize, 'head', 'bottom')
        gameMap.appendChild(snake.body)
        app.setSnakeInterval()
        snakeBody.push(snake)
        // snakeBody

        for (let y = 1; y < snakeSize; y++) {
            const snakeBodyItem = new Snake(snakeCords[1] * areaSize, (snakeCords[0] - y) * areaSize, y === snakeSize - 1 ? 'ass' : 'body', 'bottom')
            snakeBody.push(snakeBodyItem)
            gameMap.appendChild(snakeBodyItem.body)
        }

        document.addEventListener('keydown', e => {
            if (pressAccess) {
                if (e.keyCode === 38 && currentDestiantion !== 'bottom') currentDestiantion = 'top'
                else if (e.keyCode === 40 && currentDestiantion !== 'top') currentDestiantion = 'bottom'
                else if (e.keyCode === 37 && currentDestiantion !== 'right') currentDestiantion = 'left'
                else if (e.keyCode === 39 && currentDestiantion !== 'left') currentDestiantion = 'right'
                pressAccess = false
            }
        })
        // document.addEventListener('keyup', e => pressAccess = true)
    },
    moveAllSnakeBody: () => {
        for (let itemIndex = 0; itemIndex < snakeBody.length - 1; itemIndex++) {
            snakeBody[snakeBody.length - 1 - itemIndex].x = snakeBody[snakeBody.length - 2 - itemIndex].x
            snakeBody[snakeBody.length - 1 - itemIndex].y = snakeBody[snakeBody.length - 2 - itemIndex].y
            snakeBody[snakeBody.length - 1 - itemIndex].direction = snakeBody[snakeBody.length - 2 - itemIndex].direction
            snakeBody[snakeBody.length - 1 - itemIndex].snakeIntervalChange()}
    },
    isBodyHittedByHead: (destination: string) => {
        let isHitted = false
        snakeBody.forEach((bodyElement, i) => {
            if (i !== 0) {
                if (destination === 'top' && bodyElement.y - snakeBody[0].y === -areaSize && bodyElement.x === snakeBody[0].x) isHitted = true, console.log("tutej!")
                else if (destination === 'bottom' && bodyElement.y - snakeBody[0].y === areaSize && bodyElement.x === snakeBody[0].x) isHitted = true, console.log("tutej!")
                else if (destination === 'left' && bodyElement.x - snakeBody[0].x === -areaSize && bodyElement.y === snakeBody[0].y) isHitted = true, console.log("tutej!")
                else if (destination === 'right' && bodyElement.x - snakeBody[0].x === areaSize && bodyElement.y === snakeBody[0].y) isHitted = true, console.log("tutej!")
            }
        })
        return isHitted
    },
    MatchTextures: () => {
        snakeBody.forEach((bodyElement, i) => {
            if (i !== 0) {
                bodyElement.matchBodyImage(snakeBody[i - 1], snakeBody[i],snakeBody[i + 1])
            }
        })
    },
    endGame: () => {
        clearTimeout(snakeTimeOut)
        clearInterval(snakeInterval)
        music.pause()
        alert('You lose!')
    },
    renderPoint: () => {
        let loop = true
        while (loop === true) {
            const x = Math.floor(Math.random() * (mapWidth - 1))
            const y = Math.floor(Math.random() * (mapHeight - 1))
            let areCoordsFreeForPoint = true
            snakeBody.forEach(bodyItem => {
                if (bodyItem.x === x * areaSize || bodyItem.y === y * areaSize) areCoordsFreeForPoint = false
            })
            if (!arrayOfMapAreas[y][x] && areCoordsFreeForPoint) {
                const point = new Point(x * areaSize, y * areaSize, 'point')
                arrayOfMapAreas[y][x] = 1
                gameMap.appendChild(point.body)
                loop = false
            }
        }
    },
    collectPoint: (y: number, x: number, direction: string) => {
        points += 1
        console.log(points)
        arrayOfMapAreas[y][x] = 0
        const pointsDOM = document.querySelector('.point')
        pointsDOM.remove()

        let snakeBodyItem: Snake

        if (direction === 'top') snakeBodyItem = new Snake(snakeBody[snakeBody.length - 1].x, snakeBody[snakeBody.length - 1].y + 20, 'ass', snakeBody[snakeBody.length - 1].direction)
        else if (direction === 'bottom') snakeBodyItem = new Snake(snakeBody[snakeBody.length - 1].x, snakeBody[snakeBody.length - 1].y - 20, 'ass', snakeBody[snakeBody.length - 1].direction)
        else if (direction === 'left') snakeBodyItem = new Snake(snakeBody[snakeBody.length - 1].x + 20, snakeBody[snakeBody.length - 1].y, 'ass', snakeBody[snakeBody.length - 1].direction)
        else if (direction === 'right') snakeBodyItem = new Snake(snakeBody[snakeBody.length - 1].x - 20, snakeBody[snakeBody.length - 1].y, 'ass', snakeBody[snakeBody.length - 1].direction)

        snakeBody[snakeBody.length - 1].changeBodyType('ass', 'body', snakeBody[snakeBody.length - 1].direction)
        snakeBody.push(snakeBodyItem)
        gameMap.appendChild(snakeBodyItem.body)

        app.renderPoint()
    }
}

app.audio()

//keys
document.addEventListener('keydown', e => {
    if (e.keyCode === 16) app.startTheGame()
    if (e.keyCode === 83) music.play()
})