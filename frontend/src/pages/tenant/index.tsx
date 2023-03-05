import { useState } from "react";

import Head from "next/head";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";

import styles from "./styles.module.scss";

import { setupAPIClient } from "@/services/api";

import { canSSRAuth } from "@/utils/canSSRAuth";

type TenantProps = {
  id: string;
  name: string;
  age: number | string;
  email: string;
  cpf: string;
}

interface PageProps{
  tenants: TenantProps[];
}

export default function Tenant({ tenants }: PageProps){
  const [tenantsList, setTenantsList] = useState(tenants || []);

  return(
    <>
      <Head>
        <title>Biopark - Locatários</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Locatários</h1>
            <Link href="/tenantAdd">
              <Button>
                <FiPlus size={24} strokeWidth={3}/>
              </Button>
            </Link>
          </div>

          <table className={styles.tenantsTable}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Email</th>
                <th>CPF</th>
              </tr>
            </thead>
            <tbody>
              {tenantsList.length === 0 && (
                <tr>
                  <td colSpan={4}>Nenhum locatário cadastrado...</td>
                </tr>
              )}
              {tenantsList.map((tenant) => (
                <tr key={tenant.id}>
                  <td>{tenant.name}</td>
                  <td>{tenant.age}</td>
                  <td>{tenant.email}</td>
                  <td>{tenant.cpf}</td>
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

  const response = await apiClient.get("/tenants");
    
  return{
      props:{
        tenants: response.data
      }
  }
});