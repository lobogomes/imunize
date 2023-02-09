import { api } from "@/api/api";
import { Button, Heading, Text, TextArea, TextInput } from "@ignite-ui/react";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { X } from "phosphor-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Header, Footer } from "./styles";

const usuarioFormSchema = z.object({
    nome: z.string(),
    sexo: z.string(),
    dt_nasc: z.date(),
    logradouro: z.string(),
    numero: z.number(),
    setor: z.string(),
    cidade: z.string(),
    uf: z.string()
})

type usuarioFormData = z.infer<typeof usuarioFormSchema>

export default function CadastroUsuario() {

    const router = useRouter()
    function closeModal() {
        router.push(`/usuarios`)
    }
    
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<usuarioFormData>()

    async function create(data: usuarioFormData) {
        api.post('/usuarios/criar', data).then(response => console.log(response))
        router.push(`/usuarios`)
    }

    return (
        <Container>
            <Form as="form" onSubmit={handleSubmit(create)}>
                <Header>
                    <Heading>Cadastrar usuário</Heading>
                    <a onClick={closeModal}>
                        <X size={24} />
                    </a>
                </Header>
                <label>
                    <Text size="sm">Nome</Text>
                    <TextInput {...register('nome')} />
                </label>
                <label>
                    <Text size="sm">Sexo</Text>
                    <TextInput maxLength={1} {...register('sexo')}  />
                </label>
                <label>
                    <Text size="sm">Data de nascimento</Text>
                    <TextInput type="date" {...register('dt_nasc')}  />
                </label>
                <label>
                    <Text size="sm">Logradouro</Text>
                    <TextInput {...register('logradouro')}  />
                </label>
                <label>
                    <Text size="sm">Numero</Text>
                    <TextInput type="number" {...register('numero')} />
                </label>
                <label>
                    <Text size="sm">Setor</Text>
                    <TextInput {...register('setor')}  />
                </label>
                <label>
                    <Text size="sm">Cidade</Text>
                    <TextInput {...register('cidade')}  />
                </label>
                <label>
                    <Text size="sm">Estado</Text>
                    <TextInput maxLength={2} {...register('uf')}  />
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