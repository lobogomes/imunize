import { Navbar } from "@/components/Navbar";
import { Container, ModalBox, TableBox } from "./styles";
import { Box, Button, Text } from "@ignite-ui/react"
import { Eye, Plus, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { api } from "@/api/api";
import { Dialog, Modal } from "@mui/material";

export default function Users() {

    /** rotas */
    const router = useRouter()
    function goToCadastro() {
        router.push(`/usuarios/cadastro`)
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

    /** dados modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dadosUser, setDadosUser] = useState([]);

    function handleOpen(id: any) {
        api.get('/usuarios/obter-por-id', { params: { id: id as number } })
            .then((response) => {
                setDadosUser(response.data)
                console.log(dadosUser)
            })
        setIsModalOpen(true)
    };
    const handleClose = () => { setIsModalOpen(false) };


    /** dados */
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
                <GridActionsCellItem icon={<Eye color="white" size={20} />} label="Edit" onClick={() => { handleOpen(params.id) }} />,
                <GridActionsCellItem icon={<Trash color="white" size={20} />} label="Delete" onClick={() => { console.log('delete ' + params.id) }} />,
            ],
        },
    ];

    return (
        <>
            <Navbar></Navbar>
            <Container>
                <Button variant="secondary" type="submit" size="md" onClick={goToCadastro}>
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
                    getRowId={(row) => row.id}
                />
            </TableBox>
            <Dialog
                open={isModalOpen}
                onClose={handleClose}
                fullWidth={true}
            >
                <ModalBox>
                    aaaaaaaaa
                </ModalBox>
            </Dialog>
        </>
    )
}