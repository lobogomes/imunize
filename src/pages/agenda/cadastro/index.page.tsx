import { Button, Heading, Text, TextArea, TextInput } from "@ignite-ui/react";
import { Container } from "@mui/system";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { Form, Header, Footer } from "./styles";
import { z } from "zod";
import React from 'react';
import Modal from 'react-modal';
import { useRouter } from "next/router";


const agendaFormSchema = z.object({
    usuarioName: z.string().transform((usuarioName) => usuarioName.toUpperCase()),
    vacinaName: z.string().transform((vacinaName) => vacinaName.toUpperCase()),
    dataAgendada: z.date(),
    observacao: z.string()
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
        console.log(data)
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
                        <Text size="sm">Nome do paciente</Text>
                        <TextInput {...register('usuarioName')} />
                    </label>
                    <label>
                        <Text size="sm">Vacina</Text>
                        <TextInput  {...register('vacinaName')} />
                    </label>
                    <label>
                        <Text size="sm">Data e Horário</Text>
                        <TextInput type="datetime-local"  {...register('dataAgendada')} />
                    </label>
                    <label>
                        <Text size="sm">Observação</Text>
                        <TextArea {...register('observacao')} />
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