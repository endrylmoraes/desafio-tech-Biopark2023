import { useContext, FormEvent, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/home.module.scss";

import logoImg from "../../public/logo-biopark-branco.webp";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import { AuthContext } from "../contexts/AuthContext";

import { toast } from "react-toastify";

import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === "" || password === ""){
      toast.warn("Você deve preencher todos os campos");
      return;
    }

    setLoading(true); // altera para loading enquanto loga

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false); // retorna ao estado de loading falso
  }

  return (
    <>
      <Head>
        <title>Biopark - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Biopark" priority/>

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input 
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
            />

            <Input 
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>
          
          <Link href="/signup" className={styles.text}>
              Não possui uma conta? Cadastre-se
          </Link>

        </div>
      </div>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props:{}
  }
});