import React, { memo } from 'react'
import Game from './components/Game'

export default memo(function App() {
  return (
    <div className="h-screen">
      <Game />
    </div>
  )
})
