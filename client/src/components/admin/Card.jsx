import React from 'react'

const Card = () => {
  return (
    <div className="relative flex items-center justify-center text-sm text-white/80 rounded-lg shadow-sm max-w-80">
    <div className="absolute bottom-2 flex items-center justify-around backdrop-blur-sm w-full max-w-72 rounded bg-white/10 border border-white/20 py-2">
        <p className="text-center">Available soon.</p>
        <button type="button" className="bg-black/50 rounded-full px-6 py-1.5">Notify me</button>
    </div>
    <img className="rounded-md" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/girlWithHeadphone.png" alt="girlWithHeadphone"/>
</div>
  )
}

export default Card