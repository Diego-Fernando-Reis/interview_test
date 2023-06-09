import './style.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeUser } from '../../redux/userSlice';
import {useDispatch} from 'react-redux'
import Preloader from '../../components/Preloader';

function Login(){
  const [username, setUsername] = useState('');
  const [active, setActive] = useState(true)
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const navigateTo = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://dev.codeleap.co.uk/careers/?username=${username}`)
      .then(response => {
        if (Array.isArray(response.data.results) && response.data.results.length > 0 ) {
          dispatch(changeUser(username))
          navigateTo("/afterlogin");
        } else {
          setError('User does not exist');
          console.log(response.data.results)
        }
      })
      .catch(error => {
        console.error(error);
        if (!error.response) {
          setError('No response from server');
        } else if (error.response.status === 404) {
          setError('User does not exist');
        } else {
          setError('Error checking username');
        }
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setActive(!event.target.value);
  };

  useEffect(() => {
    const handleStartLoading = () => setIsLoading(true);
    const handleEndLoading = () => setIsLoading(false);

    window.addEventListener('beforeunload', handleStartLoading);
    window.addEventListener('load', handleEndLoading);

    return () => {
      window.removeEventListener('beforeunload', handleStartLoading);
      window.removeEventListener('load', handleEndLoading);
    };
  }, []);

  if(isLoading){
    return <Preloader />
  }else{
  return(
    <>
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='username'>
        <h3>Welcome to Codeleap network!</h3>
        <p>Please enter your username</p>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder='John Doe' onChange={handleUsernameChange}/>
          <div className="button">
            <button className={active ? 'disabled-button' : ''} disabled={active}>ENTER</button>
          </div>
        </form>
        <div className="error">{error}</div>
      </div>
    </>
  )}
}

export default Login;