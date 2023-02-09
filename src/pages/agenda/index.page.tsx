import { Navbar } from "@/components/Navbar";
import { Container, Filter, Form, ModalBox, TableBox } from "./styles";
import { Button, Checkbox, Heading, Text, TextInput } from "@ignite-ui/react"
import { ArrowCircleDown, Plus, Trash } from "phosphor-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { api } from "@/api/api";
import { Dialog } from "@mui/material";

const filterFormSchema = z.object({
    situacao: z.string(),
    filtrarHoje: z.boolean(),
})

type FilterFormData = z.infer<typeof filterFormSchema>

export default function Agenda() {

    /** filtros */
    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, errors }
    } = useForm<FilterFormData>()

    const [requestBody, setRequestBody] = useState({
        filtrarSituacao: false,
        situacao: 'string',
        filtrarDataAtual: false
    })

    async function filterItems(data: FilterFormData) {
        console.log(data)
        setRequestBody({
            filtrarSituacao: data.situacao == '' ? false : true,
            situacao: data.situacao,
            filtrarDataAtual: data.filtrarHoje

        })
        console.log(requestBody)
        api.post('/agendas/obter-todos', {
            filtrarSituacao: data.situacao == '' ? false : true,
            situacao: data.situacao,
            filtrarDataAtual: data.filtrarHoje
        })
            .then((response) => {
                setData(response.data)
                console.log(response.data)
            })
    }

    /** rotas */
    const router = useRouter()
    function goToCadastro() {
        router.push(`/agenda/cadastro`)
    }

    /** dados */
    const [data, setData] = useState([])

    useEffect(() => {
        api.post('/agendas/obter-todos', requestBody)
            .then((response) => {
                setData(response.data)
                console.log(response.status)
            })
    }, [])

    const columns: GridColumns = [
        { field: 'id', headerName: 'ID', width: 30 },
        { field: 'data', headerName: 'Data Agendada', type: 'date', width: 150 },
        { field: 'situacao', headerName: 'Situação', width: 150 },
        { field: 'data_situacao', headerName: 'Data Situação', type: 'date', width: 150 },
        { field: 'observacoes', headerName: 'Observações', width: 300 },
        {
            field: 'actions',
            headerName: 'Ação',
            headerAlign: 'center',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem icon={<ArrowCircleDown color="white" size={20} />} label="Edit" onClick={() => { handleOpen(params.id) }} />,
                <GridActionsCellItem icon={<Trash color="white" size={20} />} label="Delete" onClick={() => { console.log('delete ' + params.id) }} />,
            ],
        },
    ];

    /** modal */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idAgenda, setIdAgenda] = useState(0);

    function handleOpen(id: any) {
        setIdAgenda(id as number)
        setIsModalOpen(true)
    };

    const handleClose = () => { setIsModalOpen(false) };

    function atualizarAgenda(data: any){
        api.get('/agendas/atualizar-status', { params: { id: data.id, situacao: data.situacao } })
        .then((response) => {
        })
    }

    return (
        <>
            <Navbar></Navbar>
            <Container>
                <Button variant="secondary" type="submit" size="md" onClick={goToCadastro}>
                    <Plus />
                    Cadastrar
                </Button>
            </Container>
            <Filter>
                <Form as="form" onSubmit={handleSubmit(filterItems)}>
                    <div>
                        <Controller
                            name="filtrarHoje"
                            control={control}
                            render={({ field }) => {
                                return (<Checkbox
                                    onCheckedChange={(checked) => {
                                        field.onChange(checked == true)
                                        console.log(field.value)
                                    }}
                                    checked={field.value}

                                />
                                )
                            }}
                        />
                        <Text size="sm">Filtrar por Hoje</Text>
                    </div>
                    <label>
                        <Text size="sm">Situação</Text>
                        <TextInput width={800} {...register('situacao')} />
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
            <Dialog
                open={isModalOpen}
                onClose={handleClose}
            >
                <ModalBox>
                    <Heading as="h1" size="md">Status Agenda</Heading>
                    <div>
                    <Checkbox /> <Text size='sm'>Concluída</Text>
                    </div>
                    <div><Checkbox /> <Text size='sm'>Cancelada</Text></div>
                    <Button onClick={atualizarAgenda}>Atualizar</Button>
                </ModalBox>
            </Dialog>
        </>
    )
}