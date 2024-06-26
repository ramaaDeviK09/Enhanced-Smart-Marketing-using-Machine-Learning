import React, { useRef, useState } from 'react'
import './recommendation.css'
import {Button} from 'react-bootstrap'
export default function Fertilizers() {
    const formRef = useRef()
    const [fertilizer,setFertilizer] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const p =[]
        for(let i=0;i<8;i++){
            p.push(+ formRef.current[i].value)
        }
        const res = await fetch("http://localhost:4000/recommendation/fertilizer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ",
            },
            body: JSON.stringify({ p }),
        })
        const data = await res.json()
        setFertilizer(data);
    }
  return (
    <>
    <div className='fertilizer'>
        <form action="" onSubmit={handleSubmit} ref={formRef}>
            <input type="text" placeholder='N' />
            <input type="text" placeholder='P' />
            <input type="text" placeholder='K' />
            <input type="text" placeholder='Temperature' />
            <input type="text" placeholder='Ph' />
            <input type="text" placeholder='Rainfall' />
            <input type="text" placeholder='Crops' />
            <Button type='submit'>Check</Button>
        </form>
        <table>
        <tr>
            <th>Crops</th>
            <th>Number</th>
        </tr>
        <tr>
            <td>rice,wheat,barley</td>
            <td>20</td>
        </tr>
        <tr>
        <td>maize,sorghum</td>
        <td>11</td>
        </tr>
            <tr>
            <td>chickpea,kidney beans,lima beans</td>
            <td>3</td>
            </tr>
            <tr>
            <td>kidneybeans</td>
            <td>9</td>
            </tr>
            <tr>
            <td>pigeonpeas</td>
            <td>18</td>
            </tr>
            <tr>
            <td>mothbeans</td>
            <td>13</td>
            </tr>
            <tr>
             <td>mungbean</td>
             <td>14</td>
            </tr>
            <tr>
            <td>blackgram</td>
            <td>2</td>
            </tr>
            <tr>
            <td>lentil,acacia</td>
            <td>10</td>
            </tr>
            <tr>
            <td>pomegranate</td>
            <td>19</td>
            </tr>
            <tr>
            <td>banana,ginger,cardamom</td>
            <td>1</td>
            </tr>
            <tr>
            <td>mango,papaya,peach</td>
            <td>12</td>
            </tr>
            <tr>
            <td>grapes</td>
            <td>7</td>
            </tr>
            <tr>
            <td>watermelon</td>
            <td>21</td>
            </tr>
            <tr>
            <td>muskmelon,cucumbers</td>
            <td>15</td>
            </tr>
            <tr>
            <td>apple,pears,nashi</td>
            <td>0</td>
            </tr>
            <tr>
            <td>orange</td>
            <td>16</td>
            </tr>
            <tr>
            <td>papaya</td>
            <td>7</td>
            </tr>
            <tr>
            <td>coconut,nutmeg</td>
            <td>4</td>
            </tr>
            <tr>
            <td>cotton,Soybeans,Peanuts</td>
            <td>6</td>
            </tr>
            <tr>
            <td>jute</td>
            <td>8</td>
            </tr>
            <tr>
            <td>coffee,chicory</td>
            <td>5</td>
            </tr>
        </table>
    </div>
        <div className="recommended">
            {fertilizer.length!=0 && <h3>The recommended fertilizers for you</h3>}
            <ul>
                {fertilizer.length !=0 && fertilizer.map(f => {
                    return (
                        <li>{f}</li>
                    )
                })}
        </ul>
        </div>
        </>
  )
}
