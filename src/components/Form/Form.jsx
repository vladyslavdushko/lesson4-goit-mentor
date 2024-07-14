import { FiSearch } from 'react-icons/fi';
import { useState } from "react";
import style from './Form.module.css'

export const Form = ({onSubmit}) => {
  const [query, setQuery] = useState('')
  
  const handleChange = (e) =>{
    setQuery(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!query.trim()){
      return alert("Wrong query!")
    }
    onSubmit(query)//місце виклику onHandleSubmit 
    setQuery('')
  }

  return( 
  <>
    <form className={style.form}       
    onSubmit={handleSubmit}
    >
    <button className={style.button} type="submit">
      <FiSearch size="16px" />
    </button>

    <input
      className={style.input}
      placeholder="What do you want to write?"
      name="search"
      required
      autoFocus
      value={query}
      onChange={handleChange}
    />
  </form>
  </>);
};
