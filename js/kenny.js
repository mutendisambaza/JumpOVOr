import {incrementCustomProperty, setCustomProperty, getCustomProperty} from "./updateCustomProperty.js"

const kennElem  = document.querySelector("[data-kenny]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0019    
const KENNY_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let kennyFrame
let currentFrameTime
let yVelocity

export function setupKenny() {
  isJumping = false
  kennyFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(kennElem
   , "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
} 

export function updateKenny(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getKennyRect() {
  return kennElem
 .getBoundingClientRect()
}

export function setKennyLose() {
  kennElem
 .src = "imgs/kenny-lose.png"
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    kennElem
   .src = `imgs/kenny-stationary.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    kennyFrame = (kennyFrame + 1) % KENNY_FRAME_COUNT
    kennElem
   .src = `imgs/kenny-run-${kennyFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(kennElem
   , "--bottom", yVelocity * delta)

  if (getCustomProperty(kennElem
   , "--bottom") <= 0) {
    setCustomProperty(kennElem
     , "--bottom", 0)
    isJumping = false
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
