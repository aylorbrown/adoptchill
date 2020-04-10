let number = 0; 
const stamps = [
    "assets/stamp-squiggle.png",
    "assets/stamp-smile-face.png",
    "assets/stamp-weed.png",
    "assets/stamp-stick.png",
    "assets/stamp-bong.png",
    "assets/stamp-bone.png"
]

const stampsTag = document.querySelector("div.stamps")

const addStamp = function (x, y) {
    const img = document.createElement("img")
    img.setAttribute("src", stamps[number])

    img.style.left = (x - window.innerWidth / 2)  + "px"
    img.style.top = y + "px"

    stampsTag.appendChild(img)

    number += 1
    if (number > stamps.length - 1) {
        number = 0
    }
}

document.addEventListener("click", (event) => {
    addStamp(event.pageX, event.pageY)
})