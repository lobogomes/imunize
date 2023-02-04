import { Navbar } from "@/components/Navbar";
import { Container, Box } from "./styles";
import { Button } from "@ignite-ui/react"
import { Plus } from "phosphor-react";
import { TableItems } from "@/components/TableItems";
import { useRouter } from "next/router";
import { useState } from "react";



export default function Alergias() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter()
    
    function handleOpenModal() {
        router.push(`/alergias/cadastro`)
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
            <Box>
                <TableItems />
            </Box>
            
        </>
    )
}