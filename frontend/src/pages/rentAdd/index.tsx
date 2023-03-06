import { FormEvent, useState, useEffect } from "react";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

import Head from "next/head";
import Router from "next/router";

import { setupAPIClient } from "@/services/api";
import { api } from "@/services/apiClient";

import { canSSRAuth } from "@/utils/canSSRAuth";

import { toast } from "react-toastify";

import styles from "./styles.module.scss";
import { Input } from "@/components/ui/input";

import { BuildingProps } from "../building";
import { TenantProps } from "../tenant";
import { ApartmentProps } from "../apartment";
import { LocatorProps } from "../locator";

interface PageProps{
  buildings: BuildingProps[];
  apartments: ApartmentProps[];
  tenants: TenantProps[];
  locators: LocatorProps[];
}

export default function ApartmentAdd({ buildings, apartments, tenants, locators }: PageProps){
  const [dtStart, setDtStart] = useState(new Date().toISOString().substr(0, 10));
  const [dtEnd, setDtEnd] = useState(new Date().toISOString().substr(0, 10));

  const [buildingsList, setBuildingsList] = useState(buildings ||  []);
  const [buildingSelected, setBuildingSelected] = useState(0);

  const [apartmentsList, setApartmentsList] = useState(apartments ||  []);
  const [apartmentSelected, setApartmentSelected] = useState(0);

  const [tenantsList, setTenantsList] = useState(tenants ||  []);
  const [tenantSelected, setTenantSelected] = useState(0);

  const [locatorsList, setLocatorsList] = useState(locators ||  []);
  const [locatorSelected, setLocatorSelected] = useState(0);

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

  function handleChangeLocator(e){
    setLocatorSelected(e.target.value);
  }

  useEffect(() => {
    //atualizar apartamentos de acordo com o edificio...
    async function loadApartments(){
      const id = buildingsList[buildingSelected].id;
      
      const response = await api.get("/building/apartments",{
          params:{
            id: id
          }
      });
      setApartmentsList(response.data);
      setApartmentSelected(0);
    }
      
    loadApartments();

  },[buildingSelected]);

  async function handleRegister(e: FormEvent){
    e.preventDefault();

    if( buildingsList.length === 0 ||
        apartmentsList.length === 0 ||
        tenantsList.length === 0 ||
        dtStart > dtEnd
      ){
      toast.warn("Dados inválidos!")
      return;
    }

    try {
      const apiClient = setupAPIClient();
      setLoading(true);
      
      await apiClient.post("/rent", {
        dt_start: dtStart,
        dt_end: dtEnd,
        id_locator: locatorsList[locatorSelected].id,
        id_tenant: tenantsList[tenantSelected].id,
        id_apartment: apartmentsList[apartmentSelected].id
      });

      setLoading(false);
      toast.success("Aluguel registrado com sucesso!");

      Router.push("/rent");
    } catch (err) {
      toast.error("Erro ao registrar aluguel!");
      console.log("ERRO AO REGISTRAR ALUGUEL ",err);
      setLoading(false);
    }
    
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

              <label>Edifícios</label>
              <select value={buildingSelected} onChange={handleChangeBuilding}>
                {
                  buildingsList.length ? (
                    buildingsList.map((building, index)=>{
                      return(
                        <option key={building.id} value={index}>
                          Edifício {building.number}
                        </option>
                      )
                    })
                  ) : (
                    <option value={0}>
                      Nenhum edifício cadastrado...
                    </option>
                  )
                }
              </select>

              <label>Apartamentos</label>
              <select value={apartmentSelected} onChange={handleChangeApartment}>
                {
                  apartmentsList.length ? (
                    apartmentsList.map((apartment, index)=>{
                      return(
                        <option key={apartment.id} value={index}>
                          Apartamento {apartment.floor}º andar, Nº {apartment.number}
                        </option>
                      )
                    })
                  ) : (
                    <option value={0}>
                      Nenhum apartamento disponível...
                    </option>
                  )
                }
              </select>

              <label>Locatários</label>
              <select value={tenantSelected} onChange={handleChangeTenant}>
                {
                  tenantsList.length ? (
                    tenantsList.map((tenant, index)=>{
                      return(
                        <option key={tenant.id} value={index}>
                          {tenant.name} - CPF: {tenant.cpf}
                        </option>
                      )
                    })
                  ) : (
                    <option value={0}>
                      Nenhum locatário cadastrado...
                    </option>
                  )
                }
              </select>

              <label>Locadores</label>
              <select value={locatorSelected} onChange={handleChangeLocator}>
                {
                  locatorsList.length ? (
                    locatorsList.map((locator, index)=>{
                      return(
                        <option key={locator.id} value={index}>
                          {locator.name}
                        </option>
                      )
                    })
                  ) : (
                    <option value={0}>
                      Nenhum locador cadastrado...
                    </option>
                  )
                }
              </select>

              <label>Data de Início</label>
              <Input 
                type="date" 
                placeholder="Data de início"
                onChange={(e) => {
                  setDtStart(e.target.value)
                }}
                value={dtStart}
                required
              />

              <label>Data de Término</label>
              <Input 
                type="date" 
                placeholder="Data de fim"
                onChange={(e) => {
                  setDtEnd(e.target.value)
                }}
                value={dtEnd}
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

  const responseLocators = await apiClient.get("/locators");

  return{
    props:{
      buildings: responseBuildings.data,
      apartments: responseApartments.data,
      tenants: responseTenants.data,
      locators: responseLocators.data
    }
  }
});