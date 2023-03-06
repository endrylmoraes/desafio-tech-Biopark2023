import { useState } from "react";

import { ModalTenant } from "@/components/ModalTenant";

import Head from "next/head";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

import { FiPlus, FiHome, FiUser } from "react-icons/fi";

import { setupAPIClient } from "@/services/api";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { TenantProps } from "../tenant";

import styles from "./styles.module.scss";

type RentProps = {
  id: string;
  dt_start: string;
  dt_end: string;
  locator: { 
    name: string; 
  }
  tenant: {
    id: string;
    name: string;
    age: number | string;
    email: string;
    cpf: string;
  }
  apartment:{
    floor: number | string;
    number: number | string;
    value: string;
    building: {
      number: number | string;
    }
  }
}

interface PageProps{
  rents: RentProps[];
}

export default function Rent({ rents }: PageProps){
  const [rentsList, setRentsList] = useState(rents || []);

  const [modalTenantData, setModalTenantData] = useState<TenantProps>();
  const [modalVisible, setModalVisible] = useState(false);

  async function handleOpenModal(tenant: TenantProps){
    const apiClient = setupAPIClient();
    
    setModalTenantData(tenant);

    setModalVisible(true);
  }

  function handleCloseModal(){
    setModalVisible(false);
  }

  function formatDate(dt: string) {
    const date = new Date(dt);

    const dia = date.getDate();
    const mes = date.getMonth() + 1; // adiciona 1 ao mês, pois janeiro é 0
    const ano = date.getFullYear();

    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano.toString()}`;
  }

  return(
    <>
      <Head>
        <title>Biopark - Aluguéis</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Aluguéis</h1>
            <Link href="/rentAdd">
              <Button>
                <FiPlus size={24} strokeWidth={3}/>
              </Button>
            </Link>
          </div>

          <table className={styles.rentsTable}>
            <thead>
              <tr>
                <th>Edifício</th>
                <th>Andar</th>
                <th>Apartamento</th>
                <th>Data</th>
                <th>Valor</th>
                <th>Locatário</th>
                <th>Locador</th>
              </tr>
            </thead>
            <tbody>
              {rentsList.length === 0 && (
                <tr>
                  <td colSpan={5}>Nenhum aluguel cadastrado...</td>
                </tr>
              )}
              {rentsList.map((rent) => (
                <tr key={rent.id}>
                  <td>{rent.apartment.building.number}</td>
                  <td>{rent.apartment.floor}</td>
                  <td>{rent.apartment.number}</td>
                  <td>
                  {`${formatDate(rent.dt_start)} até ${formatDate(rent.dt_end)}`}
                  </td>
                  <td>{parseFloat(rent.apartment.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || '0,00'}</td>
                  <td>
                    <Button onClick={()=>{handleOpenModal(rent.tenant)}} title={rent.tenant.name}>
                      <FiUser size={16} strokeWidth={3} />
                    </Button>
                  </td>
                  <td>{rent.locator.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {
            modalVisible && (
              <ModalTenant
                isOpen={modalVisible}
                onRequestClose={handleCloseModal}
                tenantData={modalTenantData}
              />
            )
          }

        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/rents");
    
  return{
      props:{
        rents: response.data
      }
  }
});