"use client"
import { Box, Typography} from "@mui/material";
import {useState} from "react";

export default function Home() {
  //Types
  type Tool = {
    id?: string ,
    name: string,
    checked?: boolean,
    style?: object,
    date?:number,
}
  
type FormEvent = React.FormEvent<HTMLFormElement>
type MouseEvent = React.MouseEvent<HTMLButtonElement>
type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type SelectEvent = React.ChangeEvent<HTMLSelectElement>

const [toolsList, setToolsList] = useState<Tool[]>([]);
const [InputChange, setInputCange] = useState<Tool>({name:''});

  const handleInputChanges = (event:ChangeEvent)=>{
    const newTool: Tool ={
      id: Math.random().toString().substring(2,9),
      name: event.target.value,
      checked: false,
      style: {textDecoration: 'none'},
      date: Date.now()
    };
    setInputCange(newTool)
    console.log(InputChange)
};

const addToolToList=(event: FormEvent)=>{
    event.preventDefault();
    
      setToolsList([...toolsList, InputChange]);
      setInputCange({name:''})
   
    console.log(toolsList)
}

const handleDeleteTool = (id:string )=>{
      const newToolsList = toolsList.filter((tool)=> tool.id !== id);
      setToolsList(newToolsList);
}
  
const deleteList = ()=>{
      setToolsList([]);
}

const handleCheckedTool = (event: ChangeEvent, id : string)=>{
  const newToolsList = toolsList.map((tool)=>{
    if (tool.id === id){
      tool.checked = event.target.checked;
    
    if(tool.checked === true){
      tool.style = {textDecoration: 'line-through'}
    }else{
      tool.style = {textDecoration: 'none'}
    }
  }
    return tool
  })
  setToolsList(newToolsList);
}

const handleSortList = (event: SelectEvent)=>{
  const sortValue = event.target.value;
  if (sortValue === 'recent'){
    const sortedList = toolsList.sort((a: any,b: any)=> b.date - a.date);
    setToolsList([...sortedList]);
  }
  if (sortValue === 'old'){
    const sortedList = toolsList.sort((a: any,b: any)=> a.date - b.date);
    setToolsList([...sortedList]);
  }
  if (sortValue === 'AZ'){
    const sortedList = toolsList.sort((a: any,b: any)=> a.name.localeCompare(b.name));
    setToolsList([...sortedList]);
  }
  if (sortValue === 'ZA'){
    const sortedList = toolsList.sort((a: any,b: any)=> b.name.localeCompare(a.namek));
    setToolsList([...sortedList]);
  }
  if (sortValue === 'pending'){
    const sortedList = toolsList.sort((a: any,b: any)=> a.checked - b.checked);
    setToolsList([...sortedList]);
  }
  if (sortValue === 'done'){
    const sortedList = toolsList.sort((a: any,b: any)=> b.checked - a.checked);
    setToolsList([...sortedList]);
  }
  

}



  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={5}>
      
      <Box>
        <Typography variant="h6" color="initial">To Do List</Typography>
      </Box>

      <Box display = {"flex"} justifyContent={'center'} alignItems={'center'} >
        <form action="" onSubmit={addToolToList}  style={{display:'flex', gap: '10px', flexDirection:'column'}} >
          <input value={InputChange && InputChange.name} type="text" onChange={handleInputChanges} style={{border:'1px solid black', borderRadius: '5px', padding: '3px'}}/>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3}>
            <button type="submit" style={{border:'1px solid black', borderRadius: '5px', padding: '3px'}}>Add</button>
            <button onClick={deleteList} style={{border:'1px solid black', borderRadius: '5px', padding: '3px'}}>Delete all</button>
            <select id="sortoptions" onChange={handleSortList} style={{border:'1px solid black', borderRadius: '5px', padding: '3px'}}>
              
              <option value="old">Mas antiguas</option>

              <option value="recent">Mas recientes</option>

              <option value="AZ">A-Z</option>

              <option value="ZA">Z-A</option>

              <option value="pending">Tareas pendientes</option>

              <option value="done">Tareas completadas</option>

            </select>
          </Box>

        </form>
      </Box>

      <Box display = {"flex"}>
        <ul style={{display:'flex', gap: '10px', flexDirection:'column'}}>
          {toolsList && toolsList.map(({id, name, checked, style}, index)=>(
          
            
            <li key={index} style={{display: 'flex', justifyContent:'center', alignItems: 'center', gap: '10px'}}>
              {id && <input type='checkbox' checked={checked} onChange={(event)=>handleCheckedTool(event, id)}/>}
              <p style={style}>{name}</p>
             
             {id && <button onClick={()=>handleDeleteTool(id)} style={{border:'1px solid black', borderRadius: '5px', padding: '3px'}}>Delete</button>}
              </li>
            
          
          ))}
        </ul>
          
      </Box>

    </Box>
   
  );
}
