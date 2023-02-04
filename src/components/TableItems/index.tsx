import { CheckSquare, Trash } from "phosphor-react";
import { TableBox } from "./styles";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },

  ];
  
  const rows = [
    { id: 1,  age: 35 },
    { id: 2,  age: 42 },
    { id: 3, age: 45 },
    { id: 4,  age: 16 },
    { id: 5, age: null },
    { id: 6,  age: 150 },
    { id: 7, age: 44 },
    { id: 8, age: 36 },
    { id: 9, age: 65 },
  ];
  
  export function TableItems() {
    return (
      <TableBox>
        
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          
        />
      
      </TableBox>
    );
  }
