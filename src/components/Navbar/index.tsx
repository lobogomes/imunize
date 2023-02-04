
import { Heading } from '@ignite-ui/react'
import { ActiveLink } from '../ActiveLink';
import styles from './styles.module.scss'

export function Navbar() {


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Heading as="h1" size="3xl">imunize</Heading>
                <nav>
                    <ActiveLink href="/agenda" activeClassName={styles.active}><a>Agenda</a></ActiveLink>
                    <ActiveLink href="/usuarios" activeClassName={styles.active}><a>Usuários</a></ActiveLink>
                    <ActiveLink href="/vacinas" activeClassName={styles.active}><a>Vacinas</a></ActiveLink>
                    <ActiveLink href="/alergias" activeClassName={styles.active}><a>Alergias</a></ActiveLink>
                </nav>
            </div>
        </header>
    );
}