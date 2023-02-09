import { Button, Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'
import bgImage from '../../assets/preview.png'
import linesImage from '../../assets/lines-bg.png'
import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'

export default function Home() {
  
  const router = useRouter()

  function goToDash(){
    router.push(`/vacinas`)
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
            src={linesImage}
            height={800}
            quality={100}
            priority
            alt="Calendário simbolizando aplicação em funcionamento"
            
          />
        </Preview>
      </Container>

  )
}