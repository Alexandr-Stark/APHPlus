
import {React, useState} from 'react';
import { useHttp } from '../../hooks/http.hook';

function Regpage() {
  const [form, setForm] = useState({email: '', password:'', passwordConfirmation:''});
  const { loading, request} = useHttp();

  function changeHandler(event){
    setForm({...form, [event.target.name]: event.target.value})
  }

  async function serverAction(){
      try {
          await request('api/auth/sign-up', 'POST', {...form});
      // eslint-disable-next-line no-empty
      } catch (e) {
        
      }
  }

  return <div>
      <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" onChange={changeHandler}/>
      </div>
      <div>
          <label htmlFor="name">First Name</label>
          <input type="text" name="name" onChange={changeHandler}/>
      </div>
      <div>
          <label htmlFor="surname">Last Name</label>
          <input type="text" name="surname" onChange={changeHandler}/>
      </div>
      <div>
          <label htmlFor="surname">Nickname</label>
          <input type="text" name="nickname" onChange={changeHandler}/>
      </div>
      <div>
          <label htmlFor="birthday">Birthday</label>
          <input type="date" name="birthday" onChange={changeHandler}/>
      </div>
      <div>
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" onChange={changeHandler}/>
      </div>
      <div>
          <label htmlFor="password">Password</label>
          <input type="password"  name="password" onChange={changeHandler}/>
      </div>
      <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input type="password"  name="passwordConfirmation" onChange={changeHandler}/>
      </div>
      <div>
          <button onClick={serverAction} disable={loading}>Sign Up</button>
      </div>
  </div>;
}

export default Regpage;
