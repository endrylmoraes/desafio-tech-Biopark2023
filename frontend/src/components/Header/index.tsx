import { useContext } from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

import { FiLogOut } from "react-icons/fi";

import { AuthContext } from "../../contexts/AuthContext";

export function Header(){

    const { signOut } = useContext(AuthContext);

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image src="/logo.svg" alt="Logo Biopark" width={190} height={60} priority/>
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/building">
                        Edifícios
                    </Link>

                    <Link href="/apartment">
                        Apartamentos
                    </Link>

                    <Link href="/tenant">
                        Locatários
                    </Link>

                    <Link href="/locator">
                        Locadores
                    </Link>

                    <Link href="/rent">
                        Aluguéis
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#FFF" size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}