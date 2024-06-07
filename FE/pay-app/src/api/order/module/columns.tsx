import { Link, Typography } from '@mui/material'
import { GridRow, GridColDef } from '@mui/x-data-grid'
import { ProductColumn } from '../model/productColumn';

interface CellType {
    row: ProductColumn;
}

export default function ProductColumns():GridColDef[] {
    return(
        [
            {
                flex: 0.04,
                minWidth: 30,
                sortable: false,
                field: 'id',
                headerName: 'No.',
                renderCell: ({ row }: CellType) =>
                    <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.id}</Typography>

            },
            {
                flex: 0.04,
                minWidth: 30,
                sortable: false,
                field: 'title',
                headerName: 'title',
                renderCell: ({ row }: CellType) =>
                    <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>
                        {/* <Link href={`${PG.BOARD}/detail/${row.id}`} > {row.title}</Link>  */}
                    </Typography>
            },
            {
                flex: 0.04,
                minWidth: 30,
                sortable: false,
                field: 'description',
                headerName: 'description',
                renderCell: ({ row }: CellType) =>
                <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.description}</Typography>
            },
            {
                flex: 0.04,
                minWidth: 30,
                sortable: false,
                field: 'articles',
                headerName: 'articles',
                renderCell: ({ row }: CellType) =>
                    <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.articles}</Typography>
            },
            {
                flex: 0.04,
                minWidth: 30,
                sortable: false,
                field: 'postdate',
                headerName: 'postdate',
                renderCell: ({ row }: CellType) =>
                    <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.postdate}</Typography>
            },
            {
                flex: 0.04,
                minWidth: 30,
                sortable: false,
                field: 'modDate',
                headerName: 'modDate',
                renderCell: ({ row }: CellType) =>
                    <Typography textAlign="center" sx={{ fontSize: "1.2rem" }}>  {row.modDate}</Typography>
            },

        ]
    );
}