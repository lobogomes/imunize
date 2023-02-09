import { api } from "@/api/api";
import { Button, Heading, Text, TextArea, TextInput } from "@ignite-ui/react";
import { Container } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import { X } from "phosphor-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Header, Footer } from "./styles";

const vacinaFormSchema = z.object({
    titulo: z.string(),
    intervalo: z.number(),
    periodicidade: z.number(),
    doses: z.number(),
    descricao: z.string()
})

type vacinaFormData = z.infer<typeof vacinaFormSchema>

export default function CadastroVacina() {

    const router = useRouter()

    function closeModal() {
        router.push(`/vacinas`)
    }
    
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<vacinaFormData>()

    async function create(data: vacinaFormData) {
        api.post('/vacinas/criar', data).then(response => console.log(response))
        router.push(`/vacinas`)
    }
    return (
        <Container>
            <Form as="form" onSubmit={handleSubmit(create)}>
                <Header>
                    <Heading>Cadastrar vacina</Heading>
                    <a onClick={closeModal}>
                        <X size={24} />
                    </a>
                </Header>
                <label>
                    <Text size="sm">Título</Text>
                    <TextInput {...register('titulo')}  />
                </label>
                <label>
                    <Text size="sm">Intervalo</Text>
                    <TextInput type="number" {...register('intervalo')} />
                </label>
                <label>
                    <Text size="sm">Periodicidade</Text>
                    <TextInput type="number" {...register('periodicidade')} />
                </label>
                <label>
                    <Text size="sm">Doses</Text>
                    <TextInput type="number" {...register('doses')} />
                </label>
                <label>
                    <Text size="sm">Descrição</Text>
                    <TextArea {...register('descricao')} />
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