"use client";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const Home = () => {
  interface Tool {
    id: string;
    name: string;
    checked: boolean;
    style: object;
    date: number;
  }

  const defaultInputTool = {
    id: "",
    name: "",
    checked: false,
    style: { textDecoration: "none" },
    date: Date.now(),
  };

  interface FormEvent extends React.FormEvent<HTMLFormElement> {}
  interface MouseEvent extends React.MouseEvent<HTMLButtonElement> {}
  interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}
  interface SelectEvent extends React.ChangeEvent<HTMLSelectElement> {}

  const [toolsList, setToolsList] = useState<Tool[]>([]);
  const [InputChange, setInputChange] = useState<Tool>(defaultInputTool);

  const handleInputChanges = (event: ChangeEvent) => {
    const newTool: Tool = {
      id: Math.random().toString().substring(2, 9),
      name: event.target.value,
      checked: false,
      style: { textDecoration: "none" },
      date: Date.now(),
    };
    setInputChange(newTool);
    console.log(InputChange);
  };

  const addToolToList = (event: FormEvent) => {
    event.preventDefault();

    setToolsList([...toolsList, InputChange]);
    setInputChange(defaultInputTool);

    console.log(toolsList);
  };

  const handleDeleteTool = (id: string) => {
    const newToolsList = toolsList.filter((tool) => tool.id !== id);
    setToolsList(newToolsList);
  };

  const deleteList = (event: MouseEvent) => {
    event.preventDefault();
    setToolsList([]);
  };

  const handleCheckedTool = (event: ChangeEvent, id: string) => {
    const newToolsList = toolsList.map((tool) => {
      if (tool.id === id) {
        tool.checked = event.target.checked;

        if (tool.checked === true) {
          tool.style = { textDecoration: "line-through" };
        } else {
          tool.style = { textDecoration: "none" };
        }
      }
      return tool;
    });
    setToolsList(newToolsList);
  };

  const handleSortList = (event: SelectEvent) => {
    const sortValue = event.target.value;
    const sortByType = (type: string) => {
      let sortedList = toolsList;
      if (type === "recent") {
        //reducir a un switch
        sortedList = toolsList.sort((a: Tool, b: Tool) => b.date - a.date);
      } else if (type === "old") {
        sortedList = toolsList.sort((a: Tool, b: Tool) => a.date - b.date);
      } else if (type === "AZ") {
        sortedList = toolsList.sort((a: Tool, b: Tool) =>
          a.name.localeCompare(b.name)
        );
      } else if (type === "ZA") {
        sortedList = toolsList.sort((a: Tool, b: Tool) =>
          b.name.localeCompare(a.name)
        );
      } else if (type === "pending") {
        toolsList.sort(
          (a: Tool, b: Tool) => Number(a.checked) - Number(b.checked)
        );
      } else if (type === "done") {
        toolsList.sort(
          (a: Tool, b: Tool) => Number(b.checked) - Number(a.checked)
        );
      }

      return sortedList;
    };
    setToolsList([...sortByType(sortValue)]);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={5}
    >
      <Box>
        <Typography variant="h6" color="initial">
          To Do List
        </Typography>
      </Box>

      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <form
          action=""
          onSubmit={addToolToList}
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <input
            value={InputChange.name}
            type="text"
            onChange={handleInputChanges}
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "3px",
            }}
          />
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
          >
            <button
              type="submit"
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                padding: "3px",
              }}
            >
              Add
            </button>
            <button
              onClick={deleteList}
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                padding: "3px",
              }}
            >
              Delete all
            </button>
            <select
              id="sortoptions"
              onChange={handleSortList}
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                padding: "3px",
              }}
            >
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

      <Box display={"flex"}>
        <ul style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          {toolsList.length > 0 &&
            toolsList.map(({ id, name, checked, style }) => (
              <li
                key={id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => handleCheckedTool(event, id)}
                />
                <p style={style}>{name}</p>
                <button
                  onClick={() => handleDeleteTool(id)}
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    padding: "3px",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </Box>
    </Box>
  );
};

export default Home;
