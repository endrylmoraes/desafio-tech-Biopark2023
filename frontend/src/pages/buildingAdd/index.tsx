import { FormEvent, useState } from "react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

import Head from "next/head";
import Router from "next/router";

import { setupAPIClient } from "@/services/api";

import { canSSRAuth } from "@/utils/canSSRAuth";

import { toast } from "react-toastify";

import styles from "./styles.module.scss";

export default function buildingAdd(){
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent){
    e.preventDefault();

    if(number === "" || Number(number) < 0){
      toast.warn("Número inválido!")
      return;
    }
    try {
      const apiClient = setupAPIClient();
      setLoading(true);
      await apiClient.post("/building", {
        number: Number(number)
      });
      setLoading(false);
      toast.success("Edifício cadastrado com sucesso!");
      setNumber("");
      Router.push("/building");
    } catch (err) {
      toast.error("Este edifício já está cadastrado!");
      console.log("ERRO AO CADASTRAR ",err);
      setLoading(false);
    }
    
  }
  
  return(
    <>
      <Head>
        <title>Biopark - Inserir Edifício</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Inserir Edifício</h1>

            <form className={styles.form} onSubmit={handleRegister}>
              <input 
                type="text" 
                placeholder="Digite o número do edifício" 
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                value={number}
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