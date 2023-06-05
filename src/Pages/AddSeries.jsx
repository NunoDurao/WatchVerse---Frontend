/* eslint-disable react/prop-types */
import {useState} from 'react';

import seriesService from '../Services/series.service';

function AddSerie(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");  


  const handleSubmit = (e) =>{
    e.preventDefault();

    const requestBody = {title, description};

    seriesService.createSerie(requestBody)
    .then(()=>{
        setTitle("");
        setDescription("");
        props.refreshSeries();
    })
    .catch((error)=>console.log(error));
  }


  return (
    <div className="add-serie">
      <h3>Add serie</h3>
 
      <form onSubmit={handleSubmit}>      
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
 
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
 
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddSerie;