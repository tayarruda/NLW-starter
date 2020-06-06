const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const cls = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

cls.addEventListener("click", ()=> {
    modal.classList.add("hide")
})