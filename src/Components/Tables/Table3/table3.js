import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../../../Hooks/useFetch';
import "./table3.css"

const columns = [
  { field: 'id', headerName: 'id', headerClassName: 'custom-header', width: 70 },
  { field: 'refference', headerName: 'refference', headerClassName: 'custom-header', width: 170.6 },
  { field: 'recurrence', headerName: 'recurrence', headerClassName: 'custom-header', width: 170.6 },
  {
    field: 'location',
    headerName: 'location',
    headerClassName: 'custom-header',
    width: 170.6,
  },
  { field: 'asset', headerName: 'asset', headerClassName: 'custom-header', width: 170.6 },
  { field: 'fault', headerName: 'fault', headerClassName: 'custom-header', width: 170.6 },
  { field: 'status', headerName: 'status', headerClassName: 'custom-header', width: 170.6 },

];

export default function DataTable() {

    const {data} = useFetch("https://intra-deco.onrender.com/requests")

  return (
    <div style={{ height: "100%", width: '100%', backgroundColor: "white", borderRadius: "19px", overflow: "hidden"}}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7, 15, 20]}
        checkboxSelection
        className='mainTable'
      />
    </div>
  );
}