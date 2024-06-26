import React, { useState } from 'react'
import './Recommendation.css'
import Crops from '../components/Crops'
import Fertilizers from '../components/Fertilizers'

export default function Recommendation() {
    const [crop,setCrop] = useState(true)
    const [fertilizer,setFertilizer] = useState(false)
    const c = "crops"
    const f = "fertilizers"
    const displayCrop = () => {
        setCrop(true)
        setFertilizer(false)
    }
    const displayFetilizer = () => {
        setFertilizer(true)
        setCrop(false)
    }
  return (
    <div>
        <div className='btns'>
            <button onClick={displayCrop}>crops</button>
            <button onClick={displayFetilizer}>Fertilizers</button>
        </div>
        {crop && <Crops />}
        {fertilizer && <Fertilizers />}
    </div>
  )
}
