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

export default function TenantAdd(){
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent){
    e.preventDefault();

    if( name === "" ||
        age === "" || Number(age) < 0 ||
        email === "" ||
        cpf === ""
      ){
      toast.warn("Dados inválidos!")
      return;
    }
    try {
      const apiClient = setupAPIClient();
      setLoading(true);
      await apiClient.post("/tenant", {
        name: name,
        age: Number(age),
        email: email,
        cpf: cpf
      });
      setLoading(false);
      toast.success("Locatário cadastrado com sucesso!");

      Router.push("/tenant");
    } catch (err) {
      toast.error("Este locatário já está cadastrado!");
      console.log("ERRO AO CADASTRAR ",err);
      setLoading(false);
    }
    
  }
  
  return(
    <>
      <Head>
        <title>Biopark - Inserir Locatário</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Inserir Locatário</h1>

            <form className={styles.form} onSubmit={handleRegister}>
              
              <label>Nome</label>
              <Input 
                type="text" 
                placeholder="Digite o nome" 
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                required
              />

              <label>Idade</label>
              <Input 
                type="text" 
                placeholder="Digite a idade"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue)) { // verifica se a entrada contém apenas números
                    setAge(inputValue);
                  }
                }}
                value={age}
                required
              />

              <label>Email</label>
              <Input 
                type="email" 
                placeholder="Digite o email" 
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                required
              />
              
              <label>CPF</label>
              <Input 
                type="text" 
                placeholder="Digite o CPF"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue)) { // verifica se a entrada contém apenas números
                    setCpf(inputValue);
                  }
                }}
                value={cpf}
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