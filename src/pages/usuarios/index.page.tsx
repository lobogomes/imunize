import { Navbar } from "@/components/Navbar";
import { Container, TableBox } from "./styles";
import { Button } from "@ignite-ui/react"
import { Eye, Pen, Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns } from "@mui/x-data-grid";
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { api } from "@/api/api";


export default function Users() {

    /** rotas */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()

    function handleOpenModal() {
        router.push(`/usuarios/cadastro`)
    }
    function handleCloseModal() {
        setIsModalOpen(false);
    }

    /** dados */
    const [data, setData] = useState([])

    useEffect(() => {
        api.get('/usuarios/obter-todos')
            .then((response) => {
                setData(response.data)
                console.log(data)
            })
    }, [])

    const columns: GridColumns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'nome', headerName: 'Nome', width: 230 },
        { field: 'data_nascimento', headerName: 'Data Nasc', type: 'date', width: 100 },
        { field: 'sexo', headerName: 'Sexo', width: 30 },
        { field: 'logradouro', headerName: 'Logradouro', width: 150 },
        { field: 'numero', headerName: 'Número', width: 70 },
        { field: 'setor', headerName: 'Setor', width: 150 },
        { field: 'cidade', headerName: 'Cidade', width: 150 },
        { field: 'uf', headerName: 'UF', width: 50 },
        {
            field: 'actions',
            headerName: 'Ação',
            headerAlign: 'center',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem icon={<Eye color="white" size={20}/>} label="Edit"  onClick={() => { console.log('edit ' + params.id) }} />,
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