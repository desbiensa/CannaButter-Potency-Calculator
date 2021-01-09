import React, { useState } from 'react';
import styled from 'styled-components';
import imageBG from '../img/bg.png';
import arrow from '../img/arrow.png';
import './Calculator.scss';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Form = styled.div`
    background-image: URL(${imageBG});
    background-repeat: no-repeat;
    background-position: 50% 40%;
    background-size: 200px;
    
`;

const Box = styled.div`
      padding: 10px;       
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
            <div>
                <div className='text-center'>
                    <h3 className='text-danger'>CannaButter Potency Calculator</h3>
                </div>
            </div>
            <Container className='d-flex justify-content-center' id='calc'>
                <Row>
                    <Col id='input'>
                        <Form>
                            <Box>
                                <label id='label'>TOTAL THC/mg</label><br/>
                                    <input 
                                    type='number' 
                                    placeholder='0.00mg'
                                    onChange={handleThcChange}
                                    value={totalThc} />
                            </Box>
                            <Box>
                                <label id='label'>Amount of Cannabis/g</label><br/>
                                    <input 
                                    type='number' 
                                    placeholder='0.00g'
                                    onChange={handleCannaChange}
                                    value={amountOfCanna} />
                            </Box>
                            <Box>
                                <label id='label'>Produced Butter/g</label><br/>
                                    <input 
                                    type='number'
                                    placeholder='0.00g'
                                    onChange={handleButterChange} 
                                    value={producedButter} />
                            </Box>
                        </Form>
                        <div id='button'>
                            <Button onClick={computeResult}>Submit</Button>
                        </div>
                    </Col>
                    <Col>
                        <div id='result'>
                            <Row>
                                {
                                    result?
                                    <><p><b>The OPTIMAL POTENCY:</b> <br/><b>{result}mg</b> per gram of butter!</p></>
                                    :
                                    <><p><b>The OPTIMAL POTENCY:</b> <br/><b>0.00mg</b> per gram of butter!</p></>
                                }
                            </Row>
                            <Row id='arrow'>
                                <img src={arrow} />
                            </Row>
                            <Row>
                                <p><b>Remove 10% for accuracy</b></p>
                            </Row>
                            <Row id='arrow'>
                                <img src={arrow} />
                            </Row>
                            <Row>
                                <p>Final Approximation is <br/><b>{result?(result * 0.90).toFixed(2):(0.00).toFixed(2)}mg</b> per gram of butter.</p>
                            </Row>
                        </div>
                    </Col>
                </Row>
                
                
                
            </Container>
        </div>

    )
};

export default Calculator;