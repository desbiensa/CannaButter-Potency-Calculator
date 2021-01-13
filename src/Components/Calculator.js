import React, { useState } from 'react';
import styled from 'styled-components';
import imageBG from '../img/bg.png';
import arrow from '../img/arrow.png';
import './Calculator.scss';

const Form = styled.div`
    background-image: URL(${imageBG});
    background-repeat: no-repeat;
    background-position: 50% 40%;
    background-size: 250px;
    
`;

const Calculator = () => {
    const [thcAct, setTh] = useState();
    const [totalThc, setMg] = useState();
    const [amountOfCanna, setGrC] = useState();
    const [producedButter, setGrB] = useState();
    const [result, setResult] = useState();

    const handleActiveChange = (event) => setTh(event.target.value);
    const handleThcChange = (event) => setMg(event.target.value);
    const handleCannaChange = (event) => setGrC(event.target.value);
    const handleButterChange = (event) => setGrB(event.target.value);

    const computeResult = () => {
        let valTh = thcAct ? thcAct : 0;
        let valTot = totalThc ? totalThc : alert('Please fill a VALID TOTAL THC value!');
        let valCan = amountOfCanna ? amountOfCanna : alert('Please fill a VALID AMOUNT OF CANNABIS value!');
        let valBut = producedButter ? producedButter : alert('Please fill a VALID PRODUCED BUTTER value!');
        let resultValue = (((+valTh + +valTot * 0.877) * +valCan)/+valBut).toFixed(2);
        setResult(resultValue);
    }

    return(
        <div className='Body'>
            <div>
                <div className='title'>
                    <h3 >CannaButter Potency Calculator</h3>
                </div>
            </div>
            <section className='flex-container' id='calc'>
                
                    <div className='flex-item-left' id='input'>
                        <Form>
                            <div>
                                <label id='label'>THC/mg</label><br/>
                                    <input 
                                    type='number' 
                                    placeholder='0.00mg'
                                    onChange={handleActiveChange}
                                    value={thcAct} />
                            </div>
                            <div>
                                <label id='label'>TOTAL THC/mg</label><br/>
                                    <input 
                                    type='number' 
                                    placeholder='0.00mg'
                                    onChange={handleThcChange}
                                    value={totalThc} />
                            </div>
                            <div>
                                <label id='label'>Amount of Cannabis/g</label><br/>
                                    <input 
                                    type='number' 
                                    placeholder='0.00g'
                                    onChange={handleCannaChange}
                                    value={amountOfCanna} />
                            </div>
                            <div>
                                <label id='label'>Produced Butter/g</label><br/>
                                    <input 
                                    type='number'
                                    placeholder='0.00g'
                                    onChange={handleButterChange} 
                                    value={producedButter} />
                            </div>
                        </Form>
                        <div id='button'>
                            <button className='button' onClick={computeResult}>Submit</button>
                        </div>
                    </div>
                    
                    <div className='flex-item-right' id='result'>
                        <div>
                            {
                                result?
                                <><p><b>The OPTIMAL POTENCY:</b> <br/><b className='numpar'>{result}mg of THC</b><br/> per gram of butter!</p></>
                                :
                                <><p><b>The OPTIMAL POTENCY:</b> <br/><b className='numpar'>0.00mg of THC</b><br/> per gram of butter!</p></>
                            }
                        </div>
                        <div id='arrow'>
                            <img src={arrow} alt='' />
                        </div>
                        <div>
                            <p><b>Remove 10% for accuracy</b></p>
                        </div>
                        <div id='arrow'>
                            <img src={arrow} alt='' />
                        </div>
                        <div>
                            <p>Final Approximation is <br/><b className='numpar'>{result?(result * 0.90).toFixed(2):(0.00).toFixed(2)}mg of THC</b><br/> per gram of butter.</p>
                        </div>
                    </div>
                    <div className='footNote'>
                    <p>Please support and subscribe to my <a href='http://www.youtube.com/channel/UC627LnTjnTPFwITyWguF0tg?sub_confirmation=1' target='_blank'>Youtube Channel</a></p>
                    </div>
                     
            </section>
        </div>

    )
};

export default Calculator;