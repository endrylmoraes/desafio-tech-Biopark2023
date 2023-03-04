import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";

import logoImg from "../../public/biopark-logo.svg";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Biopark - Login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Biopark" />
        
        <div className={styles.login}>
          <form>
            <Input 
              placeholder="Digite seu email"
              type="text"
            />

            <Input 
              placeholder="Digite sua senha"
              type="password"
            />

            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>

            <Link href="/signup" className={styles.text}>
              Não possui uma conta? Cadastre-se
            </Link>
            
          </form>
        </div>
      </div>
    </>
  )
}