import { useState } from "react";

import { ModalTenant } from "@/components/ModalTenant";

import Head from "next/head";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

import { FiPlus, FiHome, FiUser } from "react-icons/fi";

import styles from "./styles.module.scss";

import { setupAPIClient } from "@/services/api";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { TenantProps } from "../tenant";

export type ApartmentProps = {
  id: string;
  floor: number | string;
  number: number | string;
  available: boolean;
  value: string;
  building: {
    number: number;
  };
}

interface PageProps{
  apartments: ApartmentProps[];
}

export default function Apartment({ apartments }: PageProps){
  const [apartmentsList, setApartmentsList] = useState(apartments || []);

  const [modalTenantData, setModalTenantData] = useState<TenantProps>();
  const [modalVisible, setModalVisible] = useState(false);

  async function handleOpenModal(idAP: string){
    const apiClient = setupAPIClient();
    
    const response = await apiClient.get("/rent/tenant", {
      params: {
        id: idAP
      }
    })
    
    setModalTenantData(response.data.tenant);

    setModalVisible(true);
  }

  function handleCloseModal(){
    setModalVisible(false);
  }

  return(
    <>
      <Head>
        <title>Biopark - Apartamentos</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Apartamentos</h1>
            <Link href="/apartmentAdd">
              <Button>
                <FiPlus size={24} strokeWidth={3}/>
              </Button>
            </Link>
          </div>

          <table className={styles.apartmentsTable}>
            <thead>
              <tr>
                <th>Edifício</th>
                <th>Andar</th>
                <th>Apartamento</th>
                <th>Valor</th>
                <th>Locatário</th>
              </tr>
            </thead>
            <tbody>
              {apartmentsList.length === 0 && (
                <tr>
                  <td colSpan={5}>Nenhum apartamento cadastrado...</td>
                </tr>
              )}
              {apartmentsList.map((apartment) => (
                <tr key={apartment.id}>
                  <td>{apartment.building.number}</td>
                  <td>{apartment.floor}</td>
                  <td>{apartment.number}</td>
                  <td>{parseFloat(apartment.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || '0,00'}</td>
                  <td>
                    {
                      apartment.available ? (
                          <span>
                            Disponível
                            <Button>
                              <FiHome size={16} strokeWidth={3} />
                            </Button>
                          </span>
                      ) : (
                        <span>
                          Alugado &nbsp;&nbsp;
                          <Button onClick={()=>{handleOpenModal(apartment.id)}}>
                            <FiUser size={16} strokeWidth={3} />
                          </Button>
                        </span>
                      )
                    }
                  </td>
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

  const response = await apiClient.get("/apartments");
    
  return{
      props:{
        apartments: response.data
      }
  }
});