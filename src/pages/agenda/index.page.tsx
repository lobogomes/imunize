import { Navbar } from "@/components/Navbar";
import { Container, Filter, Form } from "./styles";
import { Button, Text, TextInput } from "@ignite-ui/react"
import { Plus } from "phosphor-react";
import { TableItems } from "@/components/TableItems";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { useState } from "react";
import CadastroAgenda from "./cadastro/index.page";
import { useRouter } from "next/router";

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
    
    function handleOpenModal() {
        router.push(`/agenda/cadastro`)
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }

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

                <TableItems />
            </Filter>
            
        </>
    )
}