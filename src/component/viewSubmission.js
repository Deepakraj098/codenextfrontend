import { useEffect, useState,memo } from "react";
import './viewSubmission.css';

function ViewSubmission({toastToggler,loadingToggler})
{
    const [data,setData]=useState([]);

    useEffect(()=>{
        console.log('Hello');
        loadingToggler();
        fetch(`${process.env.REACT_APP_SERVER_URL}/form/getSubmission`)
        .then(response=>{
            if(response.status===200)
            {
                response.json().then(jsonResponse=>{
                    loadingToggler();
                    console.log(jsonResponse.data);
                    setData(jsonResponse.data);
                });
            }
            else
            {
                toastToggler('Error! Can not fetch Data');
                loadingToggler();
            }
        })
        .catch(error=>{
            toastToggler('Error! Can not fetch Data');
            loadingToggler();
        });
    },[]);

    return(data.length===0?
    <div style={{fontSize:'3vmin',color:'white'}}>
        No Submission has been made yet
    </div>:
    <table >
        <thead>
            <tr>
                <th>User Name</th>
                <th>Language</th>
                <th>stdin</th>
                <th>Time Stamp</th>
                <th>Code</th>
            </tr>
        </thead>
        <tbody>
            {data.map((entry,index)=>{
                return(
                    <tr key={index} id='TableRow'>
                        <td>{entry.UserName}</td>
                        <td>{entry.language}</td>
                        <td style={{textAlign:'left'}}>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {entry.stdin}
                            </div>
                        </td>
                        <td>{entry.timeStamp}</td>
                        <td style={{textAlign:'left'}}>
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {entry.code.length > 100 ? entry.code.substring(0, 100) + '...' : entry.code}
                            </div>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>)
}
export default memo(ViewSubmission);