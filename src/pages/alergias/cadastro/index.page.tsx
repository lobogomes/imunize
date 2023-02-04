import { Button, Heading, Text, TextArea, TextInput } from "@ignite-ui/react";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { X } from "phosphor-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Header, Footer } from "./styles";

const alergiaFormSchema = z.object({
    alergiaName: z.string().transform((usuarioName) => usuarioName.toUpperCase()),
})

type AlergiaFormData = z.infer<typeof alergiaFormSchema>

export default function CadastroAlergia() {

    const router = useRouter()
    function closeModal() {
        router.push(`/alergias`)
    }

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<AlergiaFormData>()

    async function create(data: AlergiaFormData) {
        console.log(data)
    }

    return (
        <Container>
            <Form as="form" onSubmit={handleSubmit(create)} >
                <Header>
                    <Heading>Cadastrar alergia</Heading>
                    <a onClick={closeModal}>
                        <X size={24} />
                    </a>
                </Header>
                <label>
                    <Text size="sm">Nome da alergia</Text>
                    <TextInput {...register('alergiaName')} />
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