import {useTransition,useState} from 'react'
function Prueba() {
    const [isPending, startTransition] = useTransition();
    const [count, setCount] = useState(0);
   
    function handleClick() {
    
      setTimeout(startTransition(() => {
        setCount((oldCount) => oldCount + 1);
      }),15000)
    }
   
    return (
      <div>
        <span>Current count: {count}</span>
   
        {isPending && <strong> Cargando</strong>}
   
        <button onClick={handleClick}>Increment</button>
      </div>
    );
  }
  export default Prueba;