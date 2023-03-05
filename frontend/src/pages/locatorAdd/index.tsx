import { FormEvent, useState } from "react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

import Head from "next/head";
import Router from "next/router";

import { setupAPIClient } from "@/services/api";

import { canSSRAuth } from "@/utils/canSSRAuth";

import { toast } from "react-toastify";

import styles from "./styles.module.scss";
import { Input } from "@/components/ui/input";

export default function LocatorAdd(){
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent){
    e.preventDefault();

    if( name === ""){
      toast.warn("Nome inválido!")
      return;
    }
    try {
      const apiClient = setupAPIClient();
      setLoading(true);
      await apiClient.post("/locator", {
        name: name
      });
      setLoading(false);
      toast.success("Locador cadastrado com sucesso!");
      
      Router.push("/locator");
    } catch (err) {
      toast.error("Este Locador já está cadastrado!");
      console.log("ERRO AO CADASTRAR ",err);
      setLoading(false);
    }
    
  }
  
  return(
    <>
      <Head>
        <title>Biopark - Inserir Locador</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Inserir Locador</h1>

            <form className={styles.form} onSubmit={handleRegister}>
              <Input 
                type="text" 
                placeholder="Digite o nome" 
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                required
              />
              
              <Button 
                type="submit"
                loading={loading}
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props:{}
  }
});