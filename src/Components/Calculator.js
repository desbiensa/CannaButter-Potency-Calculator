import React, { useState } from 'react';
import styled from 'styled-components';
import imageBG from '../img/bg.png';
import arrow from '../img/arrow.png';
import classes from './Calculator.module.scss';

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
        let resultValue = (((((+valTot - +valTh) * 0.877) + +valTh) * +valCan)/+valBut).toFixed(2);
        setResult(resultValue);
    }

    return(
        <div className={classes.Body}>
            <div>
                <div className={classes.Title}>
                    <h3 >CannaButter THC Calculator</h3>
                </div>
            </div>
            <section className={classes.flexContainer}>
                
                    <div className={classes.flexitemleft}>
                        <Form className={classes.Forma}>
                            <div>
                                <label id='label'>THC/mg</label>
                                <div className={classes.helpTip}>
                                    <p>The amount of considered <b>active THC</b> in the Marijuana. Which is equivalent to approximately between 1 to 4%. Note, oils and edibles will have the same value as the TOTAL THC, cause its state has to be active.</p>
                                </div><br/>
                                    <input 
                                    type='number' 
                                    placeholder='0.00mg'
                                    onChange={handleActiveChange}
                                    value={thcAct} />
                            </div>
                            <div>
                                <label id='label'>
                                    TOTAL THC/mg
                                </label>
                                <div className={classes.helpTip}>
                                    <p>The totality of consumable, <b>inactive and active</b> THC in the Raw Marijuana buds.</p>
                                </div>
                                <br/>
                                    <input 
                                    type='number' 
                                    placeholder='0.00mg'
                                    onChange={handleThcChange}
                                    value={totalThc} />
                            </div>
                            <div>
                                <label id='label'>Amount of Cannabis/g</label>
                                <div className={classes.helpTip}>
                                    <p>The amount of Cannabis (dried flower) in gram, used to produce the CannaButter.</p>
                                </div><br/>
                                    <input 
                                    type='number' 
                                    placeholder='0.00g'
                                    onChange={handleCannaChange}
                                    value={amountOfCanna} />
                            </div>
                            <div>
                                <label id='label'>Produced Butter/g</label>
                                <div className={classes.helpTip}>
                                    <p>The <b>final product</b>, your output of CannaButter once completed. See the tutorial <a href='https://youtu.be/3XnVOfpBoAk' rel='noreferrer' target='_blank'>How to make CannaButter</a> for reference.</p>
                                </div><br/>
                                    <input 
                                    type='number'
                                    placeholder='0.00g'
                                    onChange={handleButterChange} 
                                    value={producedButter} />
                            </div>
                        </Form>
                        <div>
                            <button className={classes.Button} onClick={computeResult}>Submit</button>
                        </div>
                    </div>
                    
                    <div className={classes.flexItemRight} id='result'>
                        <div>
                            {
                                result?
                                <><p><b>The OPTIMAL POTENCY:</b> <br/><b className={classes.numpar}>{result}mg of THC</b><br/> per gram of butter!</p></>
                                :
                                <><p><b>The OPTIMAL POTENCY:</b> <br/><b className={classes.numpar}>0.00mg of THC</b><br/> per gram of butter!</p></>
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
                            <p>Final Approximation is <br/><b className={classes.numpar}>{result?(result * 0.90).toFixed(2):(0.00).toFixed(2)}mg of THC</b><br/> per gram of butter.</p>
                        </div>
                    </div>
                    <div className={classes.footNote}>
                    <p>Please <b>support</b> and <b>subscribe</b> to my <b><a href='http://www.youtube.com/channel/UC627LnTjnTPFwITyWguF0tg?sub_confirmation=1' target='_blank' rel='noreferrer' className={classes.linkY}>Youtube Channel</a></b></p>
                    </div>
                     
            </section>
        </div>

    )
};

export default Calculator;