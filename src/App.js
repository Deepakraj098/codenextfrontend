import { useState, useCallback } from 'react';
import './App.css';
import Submit from './component/submit';
import Toast from './component/toast';
import Loading from './component/loading';
import ViewSubmission from './component/viewSubmission';
function App() {
  const [pageState,setPage]=useState(1);
  const [toastVisibility,toggleToast]=useState(false);
  const [toastMessage,setToastMsg]=useState('');
  const [isLoading,setLoading]=useState(false);

  const updatePageState=useCallback((page)=>{
    setPage(page);
  },[setPage]);

  const toastToggler=useCallback((msg)=>
  {
    toggleToast(true);
    setToastMsg(msg);
    setTimeout(()=>{
      toggleToast(false);
    },3000);
  },[toggleToast,setToastMsg]);

  const loadingToggler=useCallback(()=>
  {
    setLoading(val=>!val);
  },[setLoading]);

  return (
   <div id='mainScreen'>
    
      <header>
        <div className='nav-btn' onClick={()=>{updatePageState(1)}}>Submit Code</div>
        <div className='nav-btn' onClick={()=>{updatePageState(2)}}>View Submission</div>
      </header>
      <div id='subScreen'>
      {isLoading&&<Loading />}
      {toastVisibility&&<Toast msg={toastMessage} />}
      {pageState===1&&<Submit toastToggler={toastToggler} loadingToggler={loadingToggler}  />}
      {pageState===2&&<ViewSubmission toastToggler={toastToggler} loadingToggler={loadingToggler}  />}
      </div>
   </div>
  );
}

export default App;
