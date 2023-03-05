import { useState } from "react";

import Head from "next/head";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

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
            <Button>ADD</Button>
          </div>




          <article className={styles.listBuildings}>
          {
            buildingsList.length === 0 && (
              <span className={styles.emptyList}>Nenhum edifício cadastrado...</span>
            )
          }

          {
            buildingsList.map( building => (
              <section key={building.id} className={styles.listItem}>
                <button>
                  <div className={styles.tag}></div>
                  <span>
                    Edifício {building.number}
                  </span>
                </button>
              </section>
            ))

          }
          </article>



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