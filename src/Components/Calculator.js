import React, { useState } from 'react';
import styled from 'styled-components';
import imageBG from '../img/bg.png';

const Form = styled.div`
    background-image: URL(${imageBG});
    background-repeat: no-repeat;
    background-position: 50% 40%;
    background-size: 200px;
`;

const Box = styled.div`
      padding: 10px;
      p {
        white-space: nowrap;
      } 
`;



const Calculator = () => {
    const [totalThc, setMg] = useState();
    const [amountOfCanna, setGrC] = useState();
    const [producedButter, setGrB] = useState();
    const [result, setResult] = useState();

    const handleThcChange = (event) => setMg(event.target.value);
    const handleCannaChange = (event) => setGrC(event.target.value);
    const handleButterChange = (event) => setGrB(event.target.value);

    const computeResult = () => {
        let resultValue = ((totalThc * amountOfCanna)/producedButter).toFixed(2);
        setResult(resultValue);
    }

    return(
        <div>
            <h1>Canna Butter Potency Calculator</h1>
            <Form>
                <Box>
                    <label>TOTAL THC/mg</label><br/>
                        <input 
                        type='float' 
                        placeholder='0.0'
                        onChange={handleThcChange}
                        value={totalThc} />
                </Box>
                <Box>
                    <label>Amount of Cannabis/g</label><br/>
                        <input 
                        type='number' 
                        placeholder='0'
                        onChange={handleCannaChange}
                        value={amountOfCanna} />
                </Box>
                <Box>
                    <label>Produced Butter/g</label><br/>
                        <input 
                        type='number'
                        placeholder='0'
                        onChange={handleButterChange} 
                        value={producedButter} />
                </Box>
            </Form>
            <button onClick={computeResult}>Submit</button>
          
            <Box>
                <h3>The OPTIMAL POTENCY is: {result?(result).toFixed(2):(0.00).toFixed(2)}mg per gram of butter!</h3>
                <p>Remove 5% to 10% for more accuracy</p>
                <p>Final Approximation is <b>{result?(result * 0.95).toFixed(2):(0.00).toFixed(2)}mg</b> per gram of butter.</p>
            </Box>
            
        </div>
    )
};

export default Calculator;