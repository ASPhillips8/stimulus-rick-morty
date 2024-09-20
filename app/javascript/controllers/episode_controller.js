import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form"]

  submit(event) {
    event.preventDefault()

    const seasonEpisodeInput =
      this.formTarget.querySelector("#season-episode").value
    const url = `https://rickandmortyapi.com/api/episode/?episode=${seasonEpisodeInput}`

    fetch(url)
      .then((response) => response.json())
      .then((apiEpisodeData) => {
        console.log("API Data", apiEpisodeData)
        alert(`Fetched Episode: ${apiEpisodeData.results[0].name}`)
      })
      .catch((error) => alert("Error getting episode data:", error.message))
  }
}
