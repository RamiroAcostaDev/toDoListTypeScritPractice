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
  
  const [toolsList, setToolsList] = useState<Tool[]>([]);
  const [InputChange, setInputCange] = useState<Tool>({name:''});

  const handleInputChanges = (event:any)=>{
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

  const addToolToList=(event:any)=>{
    event.preventDefault();
    
      setToolsList([...toolsList, InputChange]);
      setInputCange({name:''})
   
    console.log(toolsList)
  }

  const handleDeleteTool = (id:string )=>{
    
      const newToolsList = toolsList.filter((tool)=> tool.id !== id);
      setToolsList(newToolsList);
    
    
  }
  
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={5}>
      
      <Box>
        <Typography variant="h6" color="initial">To Do List</Typography>
      </Box>

      <Box display = {"flex"} justifyContent={'center'} alignItems={'center'}>
        <form action="" onSubmit={addToolToList}  style={{display:'flex', gap: '10px'}}>
          <input value={InputChange && InputChange.name} type="text" onChange={handleInputChanges}/>
          <button type="submit">Add</button>
          <button >Delete</button>
        </form>
      </Box>

      <Box display = {"flex"}>
        <ul style={{display:'flex', gap: '10px', flexDirection:'column'}}>
          {toolsList && toolsList.map(({id, name, checked, style, date}, index)=>(
          
            
            <li key={index}>
              <input type='checkbox' />
              {name}
             {id && <button onClick={()=>handleDeleteTool(id)}>Delete</button>}
              </li>
            
          
          ))}
        </ul>
          
      </Box>

    </Box>
   
  );
}
