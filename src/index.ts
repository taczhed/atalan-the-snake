// 52x24 map size
import Area from './modules/Area'
import Snake from './modules/Snake'
import defaultMap from "../assets/maps/default.json"

//variables
const snakeSize = 8
const areaSize = 20
let snakeCords = [8, 10] //y, x
let currentDestiantion = 'bottom'
let gameMapScheme = defaultMap.gameMap
let arrayOfMapAreas: Array<Array< Area | number >> = gameMapScheme
let snakeInterval: NodeJS.Timer
let snakeTimeOut: NodeJS.Timeout
let snakeBody: Array<Snake> = []
let pressAccess = true
const gameMap = document.getElementById('app')

const app = {
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
                    if (currentDestiantion === 'top' && gameMapScheme[snakeCords[0] - 1][snakeCords[1]] === 0) {
                        snakeBody[0].rotateHead('top')
                        if (app.isBodyHittedByHead('top')) app.endGame()
                        else {
                            app.moveAllSnakeBody()
                            snakeBody[0].snakeMove('y', -areaSize)
                            app.MatchTextures()
                            snakeCords[0] -= 1
                        }
                    } else if (currentDestiantion === 'bottom' && gameMapScheme[snakeCords[0] + 1][snakeCords[1]] === 0) {
                        snakeBody[0].rotateHead('bottom')
                        if (app.isBodyHittedByHead('bottom')) app.endGame()
                        else {
                            app.moveAllSnakeBody()
                            snakeBody[0].snakeMove('y', areaSize)
                            app.MatchTextures()
                            snakeCords[0] += 1
                        }
                    } else if (currentDestiantion === 'left' && gameMapScheme[snakeCords[0]][snakeCords[1] - 1] === 0) {
                        snakeBody[0].rotateHead('left')
                        if (app.isBodyHittedByHead('left')) app.endGame()
                        else {
                            app.moveAllSnakeBody()
                            snakeBody[0].snakeMove('x', -areaSize)
                            app.MatchTextures()
                            snakeCords[1] -= 1
                        }
                    } else if (currentDestiantion === 'right' && gameMapScheme[snakeCords[0]][snakeCords[1] + 1] === 0) {
                        snakeBody[0].rotateHead('right')
                        if (app.isBodyHittedByHead('right')) app.endGame()
                        else {
                            app.moveAllSnakeBody()
                            snakeBody[0].snakeMove('x', areaSize)
                            app.MatchTextures()
                            snakeCords[1] += 1
                        }
                    } else {
                        app.endGame()
                    }
                pressAccess = true
            }, 300)
        ), 300)
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
        console.log("END!")
        clearTimeout(snakeTimeOut)
        clearInterval(snakeInterval)
    }
}

app.renderMapOfTheGame()
app.renderSnake()