import { memo, useState} from "react";

function Submit({toastToggler,loadingToggler,updatePageState}){

    const [lang,setData]=useState('Please choose one option');
    const [userName, setUsername]=useState('');
    const [stdin,setInput]=useState('');
    const [sourceCode,setSourcecode]=useState('');

    const options = [
        "C++",
        "java",
        "JavaScript",
        "Python",
    ];

    const onOptionChangeHandler = (event) => {
        setData(event.target.value);
        console.log(
            "User Selected Value - ",
            event.target.value
        );
    }

    function usernameHandler(e){
        setUsername(e.target.value);
    
    }

    function inputHandler(e){
        setInput(e.target.value);
    }

    function sourceCodeHandler(e){
        setSourcecode(e.target.value);
    }

    function formSubmitHandler(event){
        event.preventDefault();
        if(userName===''||stdin===''||sourceCode===''||lang==='')
        {
            toastToggler('Error! Form fields can not be empty');
            return;
        }
        loadingToggler();
        fetch(`${process.env.REACT_APP_SERVER_URL}/form/submitCode`,{
            method: "POST",
            mode:'cors',
            body: JSON.stringify({userName:userName,lang:lang,stdin:stdin,code:sourceCode}),
            headers: {
            "Content-Type": "application/json"
            }
        }).then(response=>{
            if(response.status===500)
            {
                toastToggler('Error! Cannot save form data');
            }
            else
            {
                toastToggler('Data of the form has been saved successfully');
            }
            loadingToggler();
        }).catch(error=>{
            loadingToggler();
            toastToggler('Error! Cannot save form data');
        });
    }

    return (
        <div className="contenContainer">
            <form>

                {/* username */}
                <label>
                    <p>Username<sup>*</sup></p>
                    <input type="text" placeholder="Enter username" name="username" onChange={usernameHandler} value={userName}>
                    </input>
                </label>

                    {/* select menu */}
                <select onChange={onOptionChangeHandler}>
                    <option>{lang}</option>
                    {options.map((option, index) => {
                        return (
                            <option key={index}>
                                {option}
                            </option>
                        );
                    })}
                 </select>


                    {/* standred input */}
                 <label>
                    <p>standard input (stdin)</p>
                    <textarea rows="4" cols="50" onChange={inputHandler} value={stdin}></textarea>
                 </label>


                    {/* source code */}
                 <label>
                    <p>sourcec code</p>
                    <textarea rows="4" cols="50" onChange={sourceCodeHandler} value={sourceCode}></textarea>
                 </label>

                 <button onClick={formSubmitHandler}>Submit</button>

            </form>
        </div>
    )
}
export default memo(Submit);