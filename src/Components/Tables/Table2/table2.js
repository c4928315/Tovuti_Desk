import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../../../Hooks/useFetch';

const columns = [
  { field: 'id', headerName: 'id', headerClassName: 'custom-header', width: 70 },
  { field: 'due', headerName: 'due', headerClassName: 'custom-header', width: 100 },
  { field: 'ref', headerName: 'ref', headerClassName: 'custom-header', width: 100 },
  {
    field: 'status',
    headerName: 'status',
    headerClassName: 'custom-header',
    width: 140,
  },
  { field: 'location', headerName: 'location', headerClassName: 'custom-header', width: 170.6 },
  { field: 'priority', headerName: 'priority', headerClassName: 'custom-header', width: 171.5 },
  { field: 'assigned', headerName: 'assigned', headerClassName: 'custom-header', width: 170.6 },
  { field: 'asset', headerName: 'asset', headerClassName: 'custom-header', width: 170.6 },

];

export default function DataTable() {

    const {data} = useFetch("https://intra-deco.onrender.com/workOrder")

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