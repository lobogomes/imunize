import { Button, Heading, Text, TextArea, TextInput } from "@ignite-ui/react";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { X } from "phosphor-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Header, Footer } from "./styles";

const usuarioFormSchema = z.object({
    usuarioName: z.string().transform((usuarioName) => usuarioName.toUpperCase()),
    sexo: z.string().transform((vacinaName) => vacinaName.toUpperCase()),
    dataNascimento: z.date(),
    logradouro: z.string(),
    numero: z.number(),
    setor: z.string(),
    cidade: z.string(),
    estado: z.string()
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
        console.log(data)
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
                    <TextInput {...register('usuarioName')} />
                </label>
                <label>
                    <Text size="sm">Sexo</Text>
                    <TextInput {...register('sexo')}  />
                </label>
                <label>
                    <Text size="sm">Data de nascimento</Text>
                    <TextInput type="date" {...register('dataNascimento')}  />
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
                    <TextInput {...register('estado')}  />
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