import { memo, useState} from "react";
import { FaUser } from "react-icons/fa";
import { FaRegFileCode } from "react-icons/fa";
import { MdInput } from "react-icons/md";
import "./submit.css";


function Submit({toastToggler,loadingToggler}){

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
        <div className="contentContainer">
            <form className="form-info">
                <div className="left-info">
                    {/* username */}
                    <label className="subContent">
                        <p>Username</p>
                        <div className="subContentDiv">
                            <FaUser style={{width:'20%',
                            color:'white',
                            fontSize:'3.5vmin',
                            borderTopLeftRadius:'5px',
                            borderBottomLeftRadius:'5px'}}/>
                            <input type="text" placeholder="Enter username" name="username"
                             onChange={usernameHandler} value={userName} style={{width:'80%',
                             height:'4vmin',
                             border:'none',
                             padding:'1vmin',
                             fontSize:'2.5vmin',
                             outline:'none',
                             borderBottomRightRadius:'5px',
                             borderTopRightRadius:'5px',
                             color:'white',
                             backgroundColor:'#20222b'}}/>
                        </div>
                        
                    </label>

                        {/* select menu */}
                    <div className="subContent">
                        <p>Select preferred Language</p>
                        <select onChange={onOptionChangeHandler} className="options">
                            <option>{lang}</option>
                            {options.map((option, index) => {
                                return (
                                    <option key={index}>
                                        {option}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                


                        {/* standred input */}
                    <label className="subContent">
                        <p>Standard input (stdin)</p>
                        <div className="subContentDiv" style={{flexDirection:'column', alignItems:'flex-start'}}>
                            <MdInput style={{color:'white',fontSize:'3.5vmin'}}/>
                            <textarea onChange={inputHandler} value={stdin} className="s-input"></textarea>
                        </div>
                       
                    </label>

                </div>
 
                <div className="right-info">
                     {/* source code */}
                    <label style={{display:'flex',flexDirection:'column',width:'90%'}}>
                        <p>Source code</p>
                        <FaRegFileCode  style={{color:'white',fontSize:'3.5vmin'}}/>
                        <textarea onChange={sourceCodeHandler} value={sourceCode} className="s-input" style={{minHeight:'61vmin',height:'fit-content'}}></textarea>
                    </label>
                </div>   

            </form>
            <button onClick={formSubmitHandler} className="btn-class">Submit</button>
        </div>
    )
}
export default memo(Submit);