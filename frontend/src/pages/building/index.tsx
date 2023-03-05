import { useState } from "react";

import Head from "next/head";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

import { FiPlus } from "react-icons/fi";

import styles from "./styles.module.scss";

import { setupAPIClient } from "@/services/api";

import { canSSRAuth } from "@/utils/canSSRAuth";

type BuildingProps = {
  id: string;
  number: number | string;
}

interface PageProps{
  buildings: BuildingProps[];
}

export default function Apartment({ buildings }: PageProps){
  const [buildingsList, setBuildingsList] = useState(buildings || []);

  async function getBuildings(){
    const apiClient = setupAPIClient();

    const response = await apiClient.get("/buildings");

    setBuildingsList(response.data);
  }

  return(
    <>
      <Head>
        <title>Biopark - Território</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Edifícios</h1>
            <Button>
              <FiPlus size={24} strokeWidth={3}/>
            </Button>
          </div>




          <table className={styles.buildingsTable}>
            <thead>
              <tr>
                <th>Número</th>
              </tr>
            </thead>
            <tbody>
              {buildingsList.length === 0 && (
                <tr>
                  <td colSpan={2}>Nenhum edifício cadastrado...</td>
                </tr>
              )}
              {buildingsList.map((building) => (
                <tr key={building.id}>
                  <td>{building.number}</td>
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

  const response = await apiClient.get("/buildings");

  //console.log(response.data);
  
  return{
      props:{
        buildings: response.data
      }
  }
});