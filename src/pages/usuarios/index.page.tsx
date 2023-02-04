import { Navbar } from "@/components/Navbar";
import { Container, Box } from "./styles";
import { Button } from "@ignite-ui/react"
import { Plus } from "phosphor-react";
import { TableItems } from "@/components/TableItems";
import { useState } from "react";
import { useRouter } from "next/router";



export default function Users() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter()
    
    function handleOpenModal() {
        router.push(`/usuarios/cadastro`)
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