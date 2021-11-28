// 52x24 map size
import Area from './modules/Area'
import Snake from './modules/Snake'
import defaultMap from "../assets/maps/default.json"

//variables
const areaSize = 16
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
                    app.moveAllSnakeBody()
                    snakeBody[0].snakeMove('y', -16)
                    snakeCords[0] -= 1
                    snakeBody[0].rotateHead('top')
                } else if (currentDestiantion === 'bottom' && gameMapScheme[snakeCords[0] + 1][snakeCords[1]] === 0) {
                    app.moveAllSnakeBody()
                    snakeBody[0].snakeMove('y', 16)
                    snakeCords[0] += 1
                    snakeBody[0].rotateHead('bottom')
                } else if (currentDestiantion === 'left' && gameMapScheme[snakeCords[0]][snakeCords[1] - 1] === 0) {
                    app.moveAllSnakeBody()
                    snakeBody[0].snakeMove('x', -16)
                    snakeCords[1] -= 1
                    snakeBody[0].rotateHead('left')
                } else if (currentDestiantion === 'right' && gameMapScheme[snakeCords[0]][snakeCords[1] + 1] === 0) {
                    app.moveAllSnakeBody()
                    snakeBody[0].snakeMove('x', 16)
                    snakeCords[1] += 1
                    snakeBody[0].rotateHead('right')
                } else {
                    alert("end!")
                }
                pressAccess = true
            }, 300)
        ), 300)
    },

    renderSnake: () => {
        const snake = new Snake(snakeCords[1] * areaSize, snakeCords[0] * areaSize, 'head')
        gameMap.appendChild(snake.body)
        app.setSnakeInterval()
        snakeBody.push(snake)
        // snakeBody

        for (let y = 1; y < 8; y++) {
            const snakeBodyItem = new Snake(snakeCords[1] * areaSize, (snakeCords[0] - y) * areaSize, y === 7 ? 'ass' : 'body')
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
            snakeBody[snakeBody.length - 1 - itemIndex].snakeIntervalChange()
            snakeBody[snakeBody.length - 1 - itemIndex].matchBodyImage()
        }
    }
}

app.renderMapOfTheGame()
app.renderSnake()