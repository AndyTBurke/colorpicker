import { useState, useEffect } from 'react'

function App() {
  const defaultState = {
    pickedColor: "#334433",
    mode: "monochrome",
    recColor1: "red",
    recColor2: "green",
    recColor3: "blue",
    recColor4: "purple",
    refreshCount: 0
  }

  const [state, setState] = useState(defaultState)

  const modes = ["monochrome", "monochrome-dark", 
                "monochrome-light", "analogic", "complement", 
                "analogic-compliment", "triad", "quad"]

  const modeChoices = modes.map(mode => <option key={mode} value={mode}>{mode}</option>)

  useEffect(() => {
    fetch(`https://www.thecolorapi.com/scheme?hex=${state.pickedColor.slice(1,7)}&mode=${state.mode}&count=4`)
      .then(res => res.json())
      .then(data => (
        setState(prevState => ({
          ...prevState,
          recColor1: data.colors[0].hex.value,
          recColor2: data.colors[1].hex.value,
          recColor3: data.colors[2].hex.value,
          recColor4: data.colors[3].hex.value
        }))))
    }, [state.refreshCount])

  function setPickedColor(color) {
    setState((prevState) => ({
      ...prevState,
      pickedColor: color
    }))
  }

  function setMode(newMode) {
    setState((prevState) => ({
      ...prevState,
      mode: newMode
    }
    ))
  }
  
  function newColorways() {
    setState(prevState => ({
      ...prevState,
      refreshCount: prevState.refreshCount + 1
    }))
  }

  return (
    <div className="App">
      <h1>COLORWAY GENERATOR</h1>
      <input className="color-picker" type="color" value={state.pickedColor} onChange={event => setPickedColor(event.target.value)}/>
      <select className="type-picker" onChange={(event) => setMode(event.target.value)} value={state.mode}>
        {modeChoices}
      </select>
      <button onClick={() => newColorways()}>GET COLORWAY</button>
      <div className="color-row color-selection" style={{backgroundColor: state.pickedColor}}><h3>{state.pickedColor}</h3></div>
      <div className="color-row color-pick-1" style={{backgroundColor: state.recColor1}}><h3>{state.recColor1}</h3></div>
      <div className="color-row color-pick-2" style={{backgroundColor: state.recColor2}}><h3>{state.recColor2}</h3></div>
      <div className="color-row color-pick-3" style={{backgroundColor: state.recColor3}}><h3>{state.recColor3}</h3></div>
      <div className="color-row color-pick-4" style={{backgroundColor: state.recColor4}}><h3>{state.recColor4}</h3></div>
    </div>
  )
}

export default App
