const getRecipes = async (ingredients) => {
  const apiKey = "b697b927a7c2fb336e07de4544f48265"
  const appId = "37803adb"
  const url = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${apiKey}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
    return null
  }
}

export default getRecipes
