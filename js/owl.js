import {setCustomProperty, incrementCustomProperty, getCustomProperty} from "./updateCustomProperty.js"

const SPEED = 0.05
const OWL_INTERVAL_MIN   = 500
const OWL_INTERVAL_MAX  = 2000
const worldElem = document.querySelector("[data-world]")

let nextOwlTime 
export function setupOwl() {
  nextOwlTime  = OWL_INTERVAL_MIN  
  document.querySelectorAll("[data-owl]").forEach(owl => {
    owl.remove()
  })
}

export function updateOwl(delta, speedScale) {
  document.querySelectorAll("[data-owl]").forEach(owl => {
    incrementCustomProperty(owl, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(owl, "--left") <= -100) {
      owl.remove()
    }
  })

  if (nextOwlTime  <= 0) {
    createOwl()
    nextOwlTime  =
      randomNumberBetween(OWL_INTERVAL_MIN  , OWL_INTERVAL_MAX ) / speedScale
  }
  nextOwlTime  -= delta
}

export function getOwlRects() {
  return [...document.querySelectorAll("[data-owl]")].map(owl => {
    return owl.getBoundingClientRect()
  })
}

function createOwl() {
  const owl = document.createElement("img")
  owl.dataset.owl = true
  owl.src = "imgs/owl-stationary.png "
  owl.classList.add("owl")
  setCustomProperty(owl, "--left", 100)
  worldElem.append(owl)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
