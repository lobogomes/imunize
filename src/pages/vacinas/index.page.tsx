import { Navbar } from "@/components/Navbar";
import { Container, LoadData, TableBox, } from "./styles";
import { Button, Text } from "@ignite-ui/react"
import { Pen, Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns } from "@mui/x-data-grid";
import { api } from "@/api/api";



export default function Vacinas() {

    /** rotas */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()

    function handleOpenModal() {
        router.push(`/vacinas/cadastro`)
    }
    function handleCloseModal() {
        setIsModalOpen(false);
    }

    /** dados */
    const [data, setData] = useState([])

    useEffect(() => {
        api.get('/vacinas/obter-todos')
            .then((response) => {
                setData(response.data)
                console.log(data)
            })
    }, [])

    const columns: GridColumns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'titulo', headerName: 'Título', width: 400 },
        { field: 'descricao', headerName: 'Descrição', width: 170 },
        { field: 'doses', headerName: 'Doses', width: 100 },
        { field: 'periodicidade', headerName: 'Periodicidade', width: 130 },
        { field: 'intervalo', headerName: 'Intervalo', width: 130 },
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
            <TableBox>
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