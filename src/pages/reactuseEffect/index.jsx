import React, { useState, useEffect } from 'react'

function Page() {
    const [age, setage] = useState(18)
    const [money, setmoney] = useState(1000)

    useEffect(() => {
        console.log('我被执行了');
        console.log(age,' ', money);
        setTimeout(log, 3000);
    },[age]);

    function log(){
        console.log(age);
    }
    return (
        <div>
            <h1>{age}</h1>
            <h2>{money}</h2>
            <button onClick={e => setage(age + 1)}>长大</button>
            <button onClick={e => setmoney(money + 1000)}>变有钱</button>
            <button onClick={log}>test</button>
        </div>
    )
}

function UseEffectTest() {
    const [show, setshow] = useState(true)
    return (
        <div>
            <h1>{show}</h1>
            <button onClick={e => setshow(!show)}>切换状态</button>
            {show && <Page/>}
        </div>
    )
}

export default UseEffectTest;