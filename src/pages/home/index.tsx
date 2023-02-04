import { Button, Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'
import previewImage from '../../assets/app-preview.png'
import bgImage from '../../assets/bg-clock.png'

import { UsernameForm } from '@/components/UsernameForm'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'

export default function Home() {
  
  const router = useRouter()

  function goToDash(){
    router.push(`/agenda`)
  }
  return (
      <Container>
        <Hero>
          <Heading as="h1" size="4xl">
            Imunize
          </Heading>
          <Text size="xl">
          Organize sua agenda de vacinação em um único lugar prático e rápido.
          </Text>
          <Button onClick={goToDash}>Começar<ArrowRight /></Button>
        </Hero>

        <Preview>
          <Image
            src={bgImage}
            height={500}
            quality={100}
            priority
            alt="Calendário simbolizando aplicação em funcionamento"
          />
        </Preview>
      </Container>

  )
}