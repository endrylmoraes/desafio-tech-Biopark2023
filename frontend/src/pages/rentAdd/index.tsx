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


import { BuildingProps } from "../building";
import { TenantProps } from "../tenant";
import { ApartmentProps } from "../apartment";


interface PageProps{
  buildings: BuildingProps[];
  apartments: ApartmentProps[];
  tenants: TenantProps[];
}

export default function ApartmentAdd({ buildings, apartments, tenants }: PageProps){
  console.log("🚀 ~ file: index.tsx:31 ~ ApartmentAdd ~ tenants:", tenants)
  console.log("🚀 ~ file: index.tsx:31 ~ ApartmentAdd ~ apartments:", apartments)
  console.log("🚀 ~ file: index.tsx:31 ~ ApartmentAdd ~ buildings:", buildings)
  
  
  const [dtStart, setDtStart] = useState(new Date());
  const [dtEnd, setDtEnd] = useState(new Date());

  const [buildingsList, setBuildingsList] = useState(buildings ||  []);
  const [buildingSelected, setBuildingSelected] = useState(0);

  const [apartmentsList, setApartmentsList] = useState(apartments ||  []);
  const [apartmentSelected, setApartmentSelected] = useState(0);

  const [tenantsList, setTenantsList] = useState(tenants ||  []);
  const [tenantSelected, setTenantSelected] = useState(0);

  const [loading, setLoading] = useState(false);

  function handleChangeBuilding(e){
    setBuildingSelected(e.target.value);
  }

  function handleChangeTenant(e){
    setTenantSelected(e.target.value);
  }

  function handleChangeApartment(e){
    setApartmentSelected(e.target.value);
  }


  async function handleRegister(e: FormEvent){
    e.preventDefault();

    // if( floor === "" || Number(floor) < 0 ||
    //     number === "" || Number(number) < 0 ||
    //     value === "" || 
    //     buildingsList.length === 0
    //   ){
    //   toast.warn("Dados inválidos!")
    //   return;
    // }
    // try {
    //   const apiClient = setupAPIClient();
    //   setLoading(true);
      
    //   await apiClient.post("/apartment", {
    //     floor: Number(floor),
    //     number: Number(number),
    //     value: value,
    //     id_building: buildingsList[buildingSelected].id
    //   });
    //   setLoading(false);
    //   toast.success("Apartamento cadastrado com sucesso!");

    //   Router.push("/apartment");
    // } catch (err) {
    //   toast.error("Este apartamento já está cadastrado!");
    //   console.log("ERRO AO CADASTRAR ",err);
    //   setLoading(false);
    // }
    
  }

  return(
    <>
      <Head>
        <title>Biopark - Inserir Aluguel</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Inserir Aluguel</h1>

            <form className={styles.form} onSubmit={handleRegister}>

              <select value={buildingSelected} onChange={handleChangeBuilding}>
                {
                  buildingsList.map((building, index)=>{
                    return(
                      <option key={building.id} value={index}>
                        Edifício {building.number}
                      </option>
                    )
                  })
                }
              </select>

              <select value={apartmentSelected} onChange={handleChangeApartment}>
                {
                  apartmentsList.map((apartment, index)=>{
                    return(
                      <option key={apartment.id} value={index}>
                        Apartamento {apartment.floor}º andar, Nº {apartment.number}
                      </option>
                    )
                  })
                }
              </select>

              <select value={tenantSelected} onChange={handleChangeTenant}>
                {
                  tenantsList.map((tenant, index)=>{
                    return(
                      <option key={tenant.id} value={index}>
                        {tenant.name} - {tenant.cpf}
                      </option>
                    )
                  })
                }
              </select>
              
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

  const apiClient = setupAPIClient(ctx);
  
  const responseBuildings = await apiClient.get("/buildings");

  // Pegar a primeira carga de apartamentos baseada no 
  // primeiro edifício da response que é setado no state
  const buildingId = responseBuildings.data[0].id;
  const responseApartments = await apiClient.get("/building/apartments",{
    params:{
      id: buildingId
    }
  });

  const responseTenants = await apiClient.get("/tenants");

  return{
    props:{
      buildings: responseBuildings.data,
      apartments: responseApartments.data,
      tenants: responseTenants.data
    }
  }
});