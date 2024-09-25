import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "thumbCharacter"]

  submit(event) {
    event.preventDefault()

    const seasonEpisodeInput =
      this.formTarget.querySelector("#season-episode").value

    const thumbCharacter = this.thumbCharacterTarget
    thumbCharacter.innerHTML = ""

    const url = `https://rickandmortyapi.com/api/episode/?episode=${seasonEpisodeInput}`

    fetch(url)
      .then((response) => response.json())
      .then((apiEpisodeData) => {
        console.log("fetch log", apiEpisodeData)
        let characters = apiEpisodeData.results[0].characters
        characters.forEach((characterUrl) =>
          this.renderCharacters(characterUrl)
        )
      })
      .catch((error) => alert("Error getting episode data:", error.message))
  }

  renderCharacters(characterUrl) {
    fetch(characterUrl)
      .then((response) => response.json())
      .then((character) => {
        const img = document.createElement("img")
        img.src = `${character.image}`
        img.alt = `${character.name}`
        img.classList.add("thumb-img")

        this.thumbCharacterTarget.appendChild(img)

        img.addEventListener("mouseover", () => {
          this.showCharacter(character)
        })
      })
      .catch((error) => alert("Error showing characters:", error.message))
  }

  showCharacter(character) {
    console.log("Show character details:", character)
  }
}
