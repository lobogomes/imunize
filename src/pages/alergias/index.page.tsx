import { Navbar } from "@/components/Navbar";
import { Container, TableBox } from "./styles";
import { Button } from "@ignite-ui/react"
import { Pen, Plus, Trash } from "phosphor-react";
import { useRouter } from "next/router";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { api } from "@/api/api";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns } from "@mui/x-data-grid";
import { Box } from "@mui/material";



export default function Alergias() {

    /** rotas */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()

    function handleOpenModal() {
        router.push(`/alergias/cadastro`)
    }
    function handleCloseModal() {
        setIsModalOpen(false);
    }

    /** dados */
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/alergias/obter-todos')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                console.log(data)
            })
    }, []);


    const columns: GridColumns = [
        {
            field: 'id',
            headerName: 'ID',
            headerAlign: 'center',
            width: 30,
            editable: true
        },
        {
            field: 'nome',
            headerName: 'Nome',
            headerAlign: 'left',
            width: 950,
            editable: true
        },
        {
            field: 'actions',
            headerName: 'Ação',
            headerAlign: 'center',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem icon={<Pen color="white" size={20}/>} label="Edit"  onClick={() => { console.log('edit ' + params.id) }} />,
                <GridActionsCellItem icon={<Trash color="white" size={20}/>} label="Delete" onClick={() => { console.log('delete ' + params.id) }} />,
            ],
        },
    ];


    return (
        <>
            <Navbar></Navbar>
            <Container>
                <Button variant="secondary" type="submit" size="md" onClick={handleOpenModal}>
                    <Plus />
                    Cadastrar
                </Button>
            </Container>
            <TableBox  style={{ flexGrow: 1 }}>
                <DataGrid
                    sx={{
                        height: 650,
                        width: '100%',
                        color: 'white',
                    }}
                    rows={data}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}

                />
            </TableBox>
        </>
    )
}