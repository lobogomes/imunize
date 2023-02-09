import { Navbar } from "@/components/Navbar";
import { Container, Filter, Form, TableBox } from "./styles";
import { Button, Text, TextInput } from "@ignite-ui/react"
import { ArrowCircleDown, Pen, Plus, Trash } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridActionsCellItem, GridColDef, GridColumns } from "@mui/x-data-grid";
import { api } from "@/api/api";

const filterFormSchema = z.object({
    vacinaName: z.string().transform((vacinaName) => vacinaName.toLowerCase()),
    situacaoEnum: z.enum([
        "Agendado", "Realizado", "Cancelado"
    ]),
    dataAgendada: z.date(),
    dataRealizada: z.date()
})

type FilterFormData = z.infer<typeof filterFormSchema>

export default function Agenda() {

    /** filtros */
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<FilterFormData>()
    async function filterItems(data: FilterFormData) {
        console.log(data)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()

    /** rotas */
    function handleOpenModal() {
        router.push(`/agenda/cadastro`)
    }
    function handleCloseModal() {
        setIsModalOpen(false);
    }

    /** dados */
    const [data, setData] = useState([])

    useEffect(() => {
        api.get('/agendas/obter-todos')
            .then((response) => {
                setData(response.data)
                console.log(data)
            })
    }, [])

    const columns: GridColumns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'data', headerName: 'Data Agendada', type: 'date', width: 150 },
        { field: 'situacao', headerName: 'Situação', width: 150 },
        { field: 'data_situacao', headerName: 'Data Situação', type: 'date', width: 150 },
        { field: 'observacoes', headerName: 'Observações', width: 300 },
        { field: 'vacina.titulo', headerName: 'Vacina', width: 150 },
        {
            field: 'actions',
            headerName: 'Ação',
            headerAlign: 'center',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem icon={<ArrowCircleDown color="white" size={20}/>} label="Edit"  onClick={() => { console.log('edit ' + params.id) }} />,
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
            <Filter>
                <Form as="form" >
                    <label>
                        <Text size="sm">Vacina</Text>
                        <TextInput />
                    </label>
                    <label>
                        <Text size="sm">Situação</Text>
                        <TextInput />
                    </label>
                    <label>
                        <Text size="sm">Data Agendada</Text>
                        <TextInput type="date" />
                    </label>
                    <label>
                        <Text size="sm">Data Realizada</Text>
                        <TextInput type="date" />
                    </label>
                    <Button type="submit" size="md" >
                        Pesquisar
                    </Button>
                </Form>

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
            </Filter>

        </>
    )
}