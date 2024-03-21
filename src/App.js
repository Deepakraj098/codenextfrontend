import { useState, useCallback } from 'react';
import './App.css';
import Submit from './component/submit';
import Toast from './component/toast';
import Loading from './component/loading';
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
    {isLoading&&<Loading />}
    {toastVisibility&&<Toast msg={toastMessage} />}
    {pageState===1&&<Submit toastToggler={toastToggler} loadingToggler={loadingToggler} updatePageState={updatePageState}/>}
   </div>
  );
}

export default App;
