import Area from './modules/Area'
import Snake from './modules/Snake'
import map1 from "../assets/maps/map1.json"
import map2 from "../assets/maps/map2.json"
import map3 from "../assets/maps/map3.json"
import map4 from "../assets/maps/map4.json"
import Point from "./modules/Point";

// const global variables
const snakeSize = 8
const areaSize = 20
const mapWidth = 36
const mapHeight = 22
const lengthOfSnakeInterval = 250
const gameMaps = [map1.gameMap, map2.gameMap, map3.gameMap, map4.gameMap]

// let global variables
let points = 0
let snakeCords = [8, 10] //y, xc
let currentDestiantion = 'bottom'
let gameMapScheme = gameMaps[0]
let arrayOfMapAreas: Array<Array< Area | Point | number >> = gameMapScheme
let snakeBody: Array<Snake> = []

// nodes
const gameMap = document.getElementById('app')
const informationParagraph = document.querySelector('.information-text')

// counters
let selectedGameMapNumber = 0
let colorSchemeCounter = 0
let decisionsStep = 1

// access
let canSpawnExtraPoint = true
let pressAccess = true

// sound variables
let backgroundMusic: HTMLAudioElement
let pointCollectingSound: HTMLAudioElement
let endSound: HTMLAudioElement
let backgroundMusicPermission = false
let isSoundEnabled = false

// timers, intervals
let snakeInterval: NodeJS.Timer
let snakeTimeOut: NodeJS.Timeout
let extraPointInterval: NodeJS.Timer
let informationIntreval: NodeJS.Timer

const app = {
    onLoad: () => {
        app.runInformationTextLoop()
        app.setGlobalHotKeys()
        app.fetchAudio()
    },
    fetchAudio: async () => {
        backgroundMusic = new Audio('../assets/sounds/background_song.mp4')
        pointCollectingSound = new Audio('../assets/sounds/point.mp4')
        endSound = new Audio('../assets/sounds/end.mp4')
        backgroundMusic.loop = true
    },
    runInformationTextLoop: () => {
        const information = [
            '~~~ PRESS [SHIFT] TO START ~~~',
            '~~~ PRESS [S] TO TURN ON/OFF THE MUSIC ~~~',
            '~~~ PRESS [C] TO CHANGE THE COLOR ~~~',
            '~~~ USE ARROWS FOR STEERING ~~~',
            '~~~ SNAKE GAME IMPLEMENTED IN *TYPESCRIPT* ~~~',
            '~~~ AUTHOR: JAKUB "JKR" KRZAK, PORTED BY TACZHED ~~~',
            '~~~ MUSIC BY: PIOTR "PAPTAK" NOWICKI ~~~',
            '~~~ GREETINGS FOR 8-BIT ATARI ENTHUSIASTS ~~~',
        ]
        let informationCounter = 1
        informationIntreval = setInterval(() => {
            informationParagraph.innerHTML = information[informationCounter]
            if (informationCounter === information.length - 1) informationCounter = 0
            else informationCounter++
        }, 5000)
    },
    startTheGame: () => {
        decisionsStep = 3
        gameMapScheme = gameMaps[selectedGameMapNumber]
        arrayOfMapAreas = gameMapScheme
        gameMap.innerHTML = ''
        backgroundMusic.src = '../assets/sounds/background.mp4'
        backgroundMusic.play()
        app.renderMapOfTheGame()
        app.renderSnake()
        app.renderPoint('point')
        app.extraPointsSpawning()
        app.setScoreOnBottomBar()
    },
    setScoreOnBottomBar: () => {
        clearInterval(informationIntreval)
        informationParagraph.innerHTML = 'SCORE: <span id="points-number">0</span>'
        informationParagraph.classList.remove('information-text')
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
    startMapsChoosingMenu: () => {
        decisionsStep = 2
        gameMap.innerHTML = '<video width="721" height="440" playsinline autoplay muted loop><source src="../assets/video/choose_menu.mp4" type="video/mp4">Your browser does not support the video tag.</video><div id="game-maps"></div>'
        const gameMapsContainer = document.getElementById('game-maps')
        for (let mapIndex = 1; mapIndex <= 4; mapIndex++) {
            const img = document.createElement('div')
            img.classList.add('game-maps-item')
            img.style.backgroundImage = 'url("'+`../assets/textures/map_${mapIndex}.png`+'")'
            gameMapsContainer.appendChild(img)
        }
        gameMap.appendChild(gameMapsContainer)
        const gameMapsPicker = document.createElement('div')
        const imgsDOM = document.querySelectorAll('.game-maps-item')
        gameMapsPicker.classList.add('game-maps-picker')
        imgsDOM[selectedGameMapNumber].appendChild(gameMapsPicker)

        document.addEventListener('keydown', e => {
            if (e.keyCode === 39) {
                if (selectedGameMapNumber < 3) selectedGameMapNumber += 1
            } else if (e.keyCode === 37) {
                if (selectedGameMapNumber > 0) selectedGameMapNumber -= 1
            }
            imgsDOM[selectedGameMapNumber].appendChild(gameMapsPicker)
        })
    },
    setSnakeInterval: (): void => {
        // main rules of the game
        snakeTimeOut = setTimeout(() => (
            snakeInterval = setInterval(() => {
                if (currentDestiantion === 'top') {
                    snakeBody[0].rotateHead('top')
                    if (app.isBodyHittedByHead('top')) app.endGame()
                    else if (!gameMapScheme[snakeCords[0] - 1]) {
                        //walking through the wall
                        app.moveAllSnakeBody()
                        snakeBody[0].snakeSetPosition('y', (mapHeight - 1) * areaSize)
                        app.MatchTextures()
                        snakeCords[0] = mapHeight - 1
                    }
                    else if (typeof gameMapScheme[snakeCords[0] - 1][snakeCords[1]] === 'number') {
                        //normal walking
                        if (arrayOfMapAreas[snakeCords[0] - 1][snakeCords[1]]) app.collectPoint(snakeCords[0] - 1, snakeCords[1], 'top')
                        app.moveAllSnakeBody()
                        snakeBody[0].snakeMove('y', -areaSize)
                        app.MatchTextures()
                        snakeCords[0] -= 1
                    } else {
                        app.endGame()
                    }
                } else if (currentDestiantion === 'bottom') {
                    snakeBody[0].rotateHead('bottom')
                    if (app.isBodyHittedByHead('bottom')) app.endGame()
                    else if (!gameMapScheme[snakeCords[0] + 1]) {
                        //walking through the wall
                        app.moveAllSnakeBody()
                        snakeBody[0].snakeSetPosition('y', 0)
                        app.MatchTextures()
                        snakeCords[0] = 0
                    }
                    else if (typeof gameMapScheme[snakeCords[0] + 1][snakeCords[1]] === 'number') {
                        //normal walking
                        if (arrayOfMapAreas[snakeCords[0] + 1][snakeCords[1]]) app.collectPoint(snakeCords[0] + 1, snakeCords[1], 'bottom')
                        app.moveAllSnakeBody()
                        snakeBody[0].snakeMove('y', areaSize)
                        app.MatchTextures()
                        snakeCords[0] += 1
                    } else {
                        app.endGame()
                    }
                } else if (currentDestiantion === 'left') {
                    snakeBody[0].rotateHead('left')
                    if (gameMapScheme[snakeCords[0]][snakeCords[1] - 1] === undefined) {
                        //walking through the wall
                        app.moveAllSnakeBody()
                        snakeBody[0].snakeSetPosition('x', (mapWidth - 1) * areaSize)
                        app.MatchTextures()
                        snakeCords[1] = mapWidth - 1
                    }
                    else if (app.isBodyHittedByHead('left')) app.endGame()
                    else if (typeof gameMapScheme[snakeCords[0]][snakeCords[1] - 1] === 'number') {
                        //normal walking
                        if (arrayOfMapAreas[snakeCords[0]][snakeCords[1] - 1]) app.collectPoint(snakeCords[0], snakeCords[1] - 1, 'left')
                        app.moveAllSnakeBody()
                        snakeBody[0].snakeMove('x', -areaSize)
                        app.MatchTextures()
                        snakeCords[1] -= 1
                    } else {
                        app.endGame()
                    }
                } else if (currentDestiantion === 'right') {
                    snakeBody[0].rotateHead('right')
                    if (gameMapScheme[snakeCords[0]][snakeCords[1] + 1] === undefined) {
                        //walking through the wall
                        app.moveAllSnakeBody()
                        snakeBody[0].snakeSetPosition('x', 0)
                        app.MatchTextures()
                        snakeCords[1] = 0
                    }
                    else if (app.isBodyHittedByHead('right')) app.endGame()
                    else if (typeof gameMapScheme[snakeCords[0]][snakeCords[1] + 1] === 'number') {
                        //normal walking
                        if (arrayOfMapAreas[snakeCords[0]][snakeCords[1] + 1]) app.collectPoint(snakeCords[0], snakeCords[1] + 1, 'right')
                        app.moveAllSnakeBody()
                        snakeBody[0].snakeMove('x', areaSize)
                        app.MatchTextures()
                        snakeCords[1] += 1
                    } else {
                        app.endGame()
                    }
                }
                pressAccess = true
            }, lengthOfSnakeInterval)
        ), lengthOfSnakeInterval)
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
                if (destination === 'top' && bodyElement.y - snakeBody[0].y === -areaSize && bodyElement.x === snakeBody[0].x) isHitted = true
                else if (destination === 'bottom' && bodyElement.y - snakeBody[0].y === areaSize && bodyElement.x === snakeBody[0].x) isHitted = true
                else if (destination === 'left' && bodyElement.x - snakeBody[0].x === -areaSize && bodyElement.y === snakeBody[0].y) isHitted = true
                else if (destination === 'right' && bodyElement.x - snakeBody[0].x === areaSize && bodyElement.y === snakeBody[0].y) isHitted = true
            }
        })
        return isHitted
    },
    MatchTextures: () => {
        snakeBody.forEach((bodyElement, i) => {
            if (i !== 0) bodyElement.matchBodyImage(snakeBody[i - 1], snakeBody[i],snakeBody[i + 1])
        })
    },
    renderPoint: (type: string) => {
        let loop = true
        while (loop === true) {
            const x = Math.floor(Math.random() * (mapWidth - 1))
            const y = Math.floor(Math.random() * (mapHeight - 1))
            let areCoordsFreeForPoint = true
            snakeBody.forEach(bodyItem => {
                if (bodyItem.x === x * areaSize || bodyItem.y === y * areaSize) areCoordsFreeForPoint = false
            })
            if (!arrayOfMapAreas[y][x] && areCoordsFreeForPoint) {
                const point = new Point(x * areaSize, y * areaSize, type)
                arrayOfMapAreas[y][x] = type === 'point' ? 1 : 2
                gameMap.appendChild(point.body)
                loop = false
            }
        }
    },
    collectPoint: (y: number, x: number, direction: string) => {
        let isExtra = arrayOfMapAreas[y][x] === 2
        let pointsDOM

        if (isExtra) {
            points += 60
            pointCollectingSound.play()
            pointsDOM = document.querySelector('.extra_point')
            canSpawnExtraPoint = true
        } else {
            points += 10
            pointCollectingSound.play()
            pointsDOM = document.querySelector('.point')

            let snakeBodyItem: Snake
            if (direction === 'top') snakeBodyItem = new Snake(snakeBody[snakeBody.length - 1].x, snakeBody[snakeBody.length - 1].y + 20, 'ass', snakeBody[snakeBody.length - 1].direction)
            else if (direction === 'bottom') snakeBodyItem = new Snake(snakeBody[snakeBody.length - 1].x, snakeBody[snakeBody.length - 1].y - 20, 'ass', snakeBody[snakeBody.length - 1].direction)
            else if (direction === 'left') snakeBodyItem = new Snake(snakeBody[snakeBody.length - 1].x + 20, snakeBody[snakeBody.length - 1].y, 'ass', snakeBody[snakeBody.length - 1].direction)
            else if (direction === 'right') snakeBodyItem = new Snake(snakeBody[snakeBody.length - 1].x - 20, snakeBody[snakeBody.length - 1].y, 'ass', snakeBody[snakeBody.length - 1].direction)

            snakeBody[snakeBody.length - 1].changeBodyType('ass', 'body', snakeBody[snakeBody.length - 1].direction)
            snakeBody.push(snakeBodyItem)
            gameMap.appendChild(snakeBodyItem.body)
        }

        arrayOfMapAreas[y][x] = 0
        pointsDOM.remove()

        if (!isExtra) app.renderPoint('point')
        document.querySelector('#points-number').innerHTML = points.toString()
    },
    extraPointsSpawning: () => {
        setTimeout(() => {
            extraPointInterval = setInterval(() => {
                if (canSpawnExtraPoint) app.renderPoint('extra_point'), canSpawnExtraPoint = false
            }, 1000 * 45)
        },  Math.floor(Math.random() * 11) * 1000)
    },
    endGame: () => {
        document.querySelector('#end-holder').innerHTML = '<video id="end-screen" playsinline autoplay muted loop><source src="../assets/video/end.mp4" type="video/mp4">Your browser does not support the video tag.</video>'
        informationParagraph.innerHTML = '~~~ GAME OVER ~~~'
        clearTimeout(snakeTimeOut)
        clearInterval(snakeInterval)
        clearInterval(extraPointInterval)
        backgroundMusic.pause()
        endSound.play()
    },
    setGlobalHotKeys: () => {
        //keys
        document.addEventListener('keydown', e => {
            if (e.keyCode === 16) {
                //shift
                if (decisionsStep === 1) app.startMapsChoosingMenu()
                else if (decisionsStep === 2) app.startTheGame()
            }
            if (e.keyCode === 83) {
                //s
                if (!backgroundMusicPermission) backgroundMusic.play(), backgroundMusicPermission = true
                else if (isSoundEnabled) {
                    isSoundEnabled = false
                    pointCollectingSound.muted = false
                    backgroundMusic.muted = false
                } else {
                    isSoundEnabled = true
                    pointCollectingSound.muted = true
                    backgroundMusic.muted = true
                }
            }
            if (e.keyCode === 67) {
                //c
                if (colorSchemeCounter === 0) gameMap.style.filter = 'hue-rotate(90deg) grayscale(0%)', colorSchemeCounter++
                else if (colorSchemeCounter === 1) gameMap.style.filter = 'hue-rotate(180deg) grayscale(0%)', colorSchemeCounter++
                else if (colorSchemeCounter === 2) gameMap.style.filter = 'hue-rotate(270deg) grayscale(0%)', colorSchemeCounter++
                else if (colorSchemeCounter === 3) gameMap.style.filter = 'hue-rotate(0deg) grayscale(0%)', colorSchemeCounter++
                else if (colorSchemeCounter === 4) gameMap.style.filter = 'hue-rotate(0deg) grayscale(100%)', colorSchemeCounter = 0
            }
        })
    },
}
app.onLoad()