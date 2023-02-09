import { Button, Heading, Text, TextArea, TextInput } from "@ignite-ui/react";
import { Container } from "@mui/system";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { Form, Header, Footer } from "./styles";
import { z } from "zod";
import React from 'react';
import Modal from 'react-modal';
import { useRouter } from "next/router";
import { api } from "@/api/api";


const agendaFormSchema = z.object({
    usuarioId: z.number(),
    vacinaId: z.number(),
    data: z.date(),
    observacoes: z.string()
})

type AgendaFormData = z.infer<typeof agendaFormSchema>


export default function CadastroAgenda() {

    const router = useRouter()
    function closeModal() {
        router.push(`/agenda`)
    }

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<AgendaFormData>()

    async function create(data: AgendaFormData) {
        api.post('/agendas/criar', data).then(response => console.log(response))
        router.push(`/agenda`)
    }

    return (

            <Container>
                <Form as="form" onSubmit={handleSubmit(create)}>
                    <Header>
                        <Heading>Novo agendamento</Heading>
                        <a onClick={closeModal}>
                            <X size={24} />
                        </a>
                    </Header>
                    <label>
                        <Text size="sm">ID do Paciente</Text>
                        <TextInput type="number" min={0} {...register('usuarioId')} />
                    </label>
                    <label>
                        <Text size="sm">ID da Vacina</Text>
                        <TextInput type="number" min={0} {...register('vacinaId')} />
                    </label>
                    <label>
                        <Text size="sm">Data e Horário</Text>
                        <TextInput type="datetime-local"  {...register('data')} />
                    </label>
                    <label>
                        <Text size="sm">Observação</Text>
                        <TextArea {...register('observacoes')} />
                    </label>
                    <Footer>
                        <Button variant="tertiary" type="reset" onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button type="submit">
                            Cadastrar
                        </Button>
                    </Footer>
                </Form>
            </Container>
  
    )
}