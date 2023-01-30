const ATMDeposit = ({ onChange, showInput, blockSubmit }) => {
    return (
        <div className="row" style={{display: showInput}}>
            <input type="number" onChange={onChange} />
            <input type="submit" disabled={blockSubmit} />
        </div>
    );
};

const Account = () => {
    const [accountState, setAccountState] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [atmMode, setAtmMode] = React.useState('');
    const [showInput, setShowInput] = React.useState('none');
    const [blockSubmit, setBlockSubmit] = React.useState(false);
    const handleChange = event => {
        console.log(`handlechange ${event.target.value}`);
        setAccountState(Number(event.target.value));
        if (atmMode !== 'deposit' && event.target.value > totalState)
            setBlockSubmit(true);
        else
            setBlockSubmit(false);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const newValue = atmMode === 'deposit' ? accountState + totalState : totalState - accountState;
        console.log(newValue);
        if (newValue > 0) 
            setTotalState(newValue);
        else {
            alert('Se solicitó mas dinero del albergado, cuenta en 0');
            setTotalState(0);
        }    
    }

    const updateAtmMode = event => {
        setAtmMode(event.target.value);
        const newInput = (event.target.value === '') ? 'none' : 'block';
        setShowInput(newInput);
    }


    return (
        <form onSubmit={handleSubmit} className='container'>
            <h2 className='row'>Account Balance {totalState}</h2>
            <select value={atmMode} onChange={updateAtmMode} className='row'>
                <option value=''>Select</option>
                <option value='deposit'>Deposit</option>
                <option value='cashback'>Cash Back</option>
            </select>
            <ATMDeposit onChange={handleChange} showInput={showInput} blockSubmit={blockSubmit} ></ATMDeposit>
        </form>
    );
};

ReactDOM.render(<Account />, document.getElementById('root') );