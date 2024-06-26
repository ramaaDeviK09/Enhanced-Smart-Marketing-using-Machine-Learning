import React, { useRef, useState } from 'react'
import './recommendation.css'
import {Button} from 'react-bootstrap'
export default function Crops() {
    const [crops,setCrops] = useState([])
    const formRef = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const p =[]
        for(let i=0;i<7;i++){
            p.push(+ formRef.current[i].value)
        }
        const res = await fetch("http://localhost:4000/recommendation/crop", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ",
            },
            body: JSON.stringify({ p }),
        })
        const data = await res.json()
        setCrops(data);
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit} ref={formRef}>
            <input type="text" placeholder='N' />
            <input type="text" placeholder='P' />
            <input type="text" placeholder='K' />
            <input type="text" placeholder='Temperature' />
            <input type="text" placeholder='Ph' />
            <input type="text" placeholder='Rainfall' />
            <Button type='submit'>Check</Button>
        </form>
        <div className="recommended">
            {crops.length!=0 && <h3>The recommended crops for you</h3>}
            <ul>
                {crops.length !=0 && crops.map(f => {
                    return (
                        <li>{f}</li>
                    )
                })}
        </ul>
        </div>
    </div>
  )
}
