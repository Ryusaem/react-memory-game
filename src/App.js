import './App.css'
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": process.env.PUBLIC_URL + "/img/helmet-1.png", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/potion-1.png", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/ring-1.png", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/scroll-1.png", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/shield-1.png", matched: false },
  { "src": process.env.PUBLIC_URL + "/img/sword-1.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle Cards
  const shuffleCards = () => {
    // duplicate cards
    const shuffledCards = [...cardImages, ...cardImages]
      // randomize cards
      .sort( () => Math.random() - 0.5 )
      // add  id to cards
      .map((card) => ({...card, id: Math.random() }) )

    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => { 
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {

      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        // console.log('match')
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        console.log('matched')
        resetTurn()
      } else {
        console.log('no match')
        setTimeout(()=>resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched
            }
            disabled={disabled}


          />
        ))}
      </div>

    </div>
  );
}

export default App