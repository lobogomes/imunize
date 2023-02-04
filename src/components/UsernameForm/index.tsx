import { Button, TextInput, Text } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormAnnotation } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'

const usernameFormSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'O usuário pode ter apenas letras e hifens.',
        })
        .transform((username) => username.toLowerCase())
})

type UsernameFormData = z.infer<typeof usernameFormSchema>

export function UsernameForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UsernameFormData>({
        resolver: zodResolver(usernameFormSchema)
    })

    const router = useRouter()
    
    async function handlePreRegister(data: UsernameFormData) {
        const { username } = data
        router.push(`/agenda/`)
    }

    return (
        <>
        <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
            <TextInput size="sm" prefix="imunize.com/" placeholder="seu-usuário" {...register('username')} />
            <Button size="sm" type="submit">
                Começar
                <ArrowRight />
            </Button>
        </Form>
        <FormAnnotation>
        <Text>
          {errors.username
            ? errors.username.message
            : ''}
        </Text>
      </FormAnnotation>
      </>
    )
}


