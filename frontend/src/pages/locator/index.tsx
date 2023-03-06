import { useState } from "react";

import Head from "next/head";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";

import styles from "./styles.module.scss";

import { setupAPIClient } from "@/services/api";

import { canSSRAuth } from "@/utils/canSSRAuth";

export type LocatorProps = {
  id: string;
  name: string;
  age: number | string;
  email: string;
  cpf: string;
}

interface PageProps{
  locators: LocatorProps[];
}

export default function Locator({ locators }: PageProps){
  const [locatorsList, setLocatorsList] = useState(locators || []);

  return(
    <>
      <Head>
        <title>Biopark - Locadores</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Locadores</h1>
            <Link href="/locatorAdd">
              <Button>
                <FiPlus size={24} strokeWidth={3}/>
              </Button>
            </Link>
          </div>

          <table className={styles.locatorsTable}>
            <thead>
              <tr>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {locatorsList.length === 0 && (
                <tr>
                  <td>Nenhum locador cadastrado...</td>
                </tr>
              )}
              {locatorsList.map((locator) => (
                <tr key={locator.id}>
                  <td>{locator.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/locators");
    
  return{
      props:{
        locators: response.data
      }
  }
});