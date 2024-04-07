"use client"
import { Box, Typography, Container } from "@mui/material";
import {useState} from "react";

export default function Home() {
  //Types
  type Tool = {
    id: string,
    name: string,
    checked: boolean,
    style: object,
    date:number,
  }
  
  const [toolsList, setToolsList] = useState<Tool[]>([]);
  const [InputCange, setInputCange] = useState<Tool | null>(null);

  const handleInputChanges = (event:any)=>{
    const newTool: Tool ={
      id: Math.random().toString().substring(2,9),
      name: event.target.value,
      checked: false,
      style: {textDecoration: 'none'},
      date: Date.now()
    };
    setInputCange(newTool)
    console.log(InputCange)
  };

  const addToolToList=(event:any)=>{
    event.preventDefault();
    if (InputCange !== null) {
      setToolsList([...toolsList, InputCange]);
    }
    console.log(toolsList)
  }
  
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={5}>
      
      <Box>
        <Typography variant="h6" color="initial">To Do List</Typography>
      </Box>

      <Box display = {"flex"} justifyContent={'center'} alignItems={'center'}>
        <form action="" onSubmit={addToolToList}  style={{display:'flex', gap: '10px'}}>
          <input type="text" onChange={handleInputChanges}/>
          <button type="submit">Add</button>
          <button >Delete</button>
        </form>
      </Box>

      <Box display = {"flex"}>
        <ul style={{display:'flex', gap: '10px'}}>
          <input type='checkbox' />
          <li>Hola como estas</li>
          <button>Delete</button>
        </ul>
      </Box>

    </Box>
   
  );
}
