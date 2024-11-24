import React, { memo, useState, useEffect } from 'react'

const CHOICES = {
  SCISSORS: 'scissors',
  PAPER: 'paper',
  ROCK: 'rock',
  LIZARD: 'lizard',
  SPOCK: 'spock'
}

const RULES = {
  [CHOICES.SCISSORS]: [CHOICES.PAPER, CHOICES.LIZARD],
  [CHOICES.PAPER]: [CHOICES.ROCK, CHOICES.SPOCK],
  [CHOICES.ROCK]: [CHOICES.LIZARD, CHOICES.SCISSORS],
  [CHOICES.LIZARD]: [CHOICES.SPOCK, CHOICES.PAPER],
  [CHOICES.SPOCK]: [CHOICES.SCISSORS, CHOICES.ROCK]
}

export default memo(function Game() {
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem('game-score')) || 0
  })
  const [playerChoice, setPlayerChoice] = useState(null)
  const [houseChoice, setHouseChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [showRules, setShowRules] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    localStorage.setItem('game-score', score.toString())
  }, [score])

  const handleChoice = (choice) => {
    setPlayerChoice(choice)
    // 延迟生成电脑选择，增加游戏体验
    setTimeout(() => {
      const choices = Object.values(CHOICES)
      const randomChoice = choices[Math.floor(Math.random() * choices.length)]
      setHouseChoice(randomChoice)
      determineWinner(choice, randomChoice)
    }, 1000)
    setShowResult(true)
  }

  const determineWinner = (player, house) => {
    if (player === house) {
      setResult('DRAW')
    } else if (RULES[player].includes(house)) {
      setResult('YOU WIN')
      setScore(prev => prev + 1)
    } else {
      setResult('YOU LOSE')
      setScore(prev => Math.max(0, prev - 1))
    }
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setHouseChoice(null)
    setResult(null)
    setShowResult(false)
  }

  const GameButton = ({ type, position }) => (
    <button
      onClick={() => handleChoice(type)}
      className={`absolute ${position} w-24 h-24 rounded-full bg-white 
        transform hover:scale-110 transition-transform
        shadow-lg hover:shadow-xl`}
    >
      <div className={`w-full h-full rounded-full bg-${type}-gradient p-3`}>
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-inner">
          <img src={`/images/icon-${type}.svg`} alt={type} className="w-1/2 h-1/2" />
        </div>
      </div>
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-radial from-background-start to-background-end p-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl rounded-lg border-2 border-header-outline p-4 flex justify-between items-center">
        <img src="/images/logo-bonus.svg" alt="Logo" className="h-20" />
        <div className="bg-white rounded-lg p-4 text-center min-w-[100px]">
          <p className="text-score-text text-sm tracking-widest">SCORE</p>
          <p className="text-dark-text text-5xl font-bold">{score}</p>
        </div>
      </div>

      {!showResult ? (
        // Game choices pentagon
        <div className="relative mx-auto mt-16 max-w-[400px] aspect-square">
          <img src="/images/bg-pentagon.svg" alt="Pentagon" className="absolute w-full h-full" />
          <div className="absolute w-full h-full">
            <GameButton
              type={CHOICES.SCISSORS}
              position="top-[-5%] left-1/2 -translate-x-1/2"
            />

            <GameButton
              type={CHOICES.PAPER}
              position="top-[25%] right-[-5%]"
            />

            <GameButton
              type={CHOICES.ROCK}
              position="bottom-[-10%] right-[15%]"
            />

            <GameButton
              type={CHOICES.LIZARD}
              position="bottom-[-10%] left-[15%]"
            />

            <GameButton
              type={CHOICES.SPOCK}
              position="top-[25%] left-[-10%]"
            />
          </div>
        </div>
      ) : (
        // Result view
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div className="text-center">
              <p className="text-white mb-8 text-xl tracking-wider">YOU PICKED</p>
              <GameButton type={playerChoice} position="relative" />
            </div>
            <div className="text-center">
              <p className="text-white mb-8 text-xl tracking-wider">THE HOUSE PICKED</p>
              {houseChoice ? (
                <GameButton type={houseChoice} position="relative" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-black/10 mx-auto animate-pulse" />
              )}
            </div>
          </div>

          {result && (
            <div className="text-center mt-16">
              <h2 className="text-white text-5xl mb-6">{result}</h2>
              <button
                onClick={resetGame}
                className="px-12 py-3 bg-white rounded-lg text-dark-text hover:text-red-500 transition-colors"
              >
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      )}

      {/* Rules button and modal */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setShowRules(true)}
          className="px-8 py-2 border-2 border-white rounded-lg text-white 
            hover:bg-white hover:text-dark-text transition-colors"
        >
          RULES
        </button>
      </div>

      {showRules && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl text-dark-text font-bold">RULES</h2>
              <button
                onClick={() => setShowRules(false)}
                className="text-gray-400 hover:text-dark-text"
              >
                <img src="/images/icon-close.svg" alt="Close" />
              </button>
            </div>
            <img src="/images/image-rules-bonus.svg" alt="Game rules" className="w-full" />
          </div>
        </div>
      )}
      <div className="attribution fixed bottom-0 w-full text-center text-white">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="https://github.com/RugeeFan/">Rugee</a>.
      </div>
    </div>
  )
})
