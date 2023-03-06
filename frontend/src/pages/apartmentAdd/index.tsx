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

interface PageProps{
  buildings: BuildingProps[];
}

export default function ApartmentAdd({ buildings }: PageProps){
  const [floor, setFloor] = useState("");
  const [number, setNumber] = useState("");
  const [value, setValue] = useState("");

  const [buildingsList, setBuildingsList] = useState(buildings ||  []);
  const [buildingSelected, setBuildingSelected] = useState(0);

  const [loading, setLoading] = useState(false);

  function handleChangeBuilding(e){
    setBuildingSelected(e.target.value);
  }

  async function handleRegister(e: FormEvent){
    e.preventDefault();

    if( floor === "" || Number(floor) < 0 ||
        number === "" || Number(number) < 0 ||
        value === "" || 
        buildingsList.length === 0
      ){
      toast.warn("Dados inválidos!")
      return;
    }
    try {
      const apiClient = setupAPIClient();
      setLoading(true);
      
      await apiClient.post("/apartment", {
        floor: Number(floor),
        number: Number(number),
        value: value,
        id_building: buildingsList[buildingSelected].id
      });
      setLoading(false);
      toast.success("Apartamento cadastrado com sucesso!");

      Router.push("/apartment");
    } catch (err) {
      toast.error("Este apartamento já está cadastrado!");
      console.log("ERRO AO CADASTRAR ",err);
      setLoading(false);
    }
    
  }

  return(
    <>
      <Head>
        <title>Biopark - Inserir Apartamento</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Inserir Apartamento</h1>

            <form className={styles.form} onSubmit={handleRegister}>
              
              <label>Edifício</label>
              <select value={buildingSelected} onChange={handleChangeBuilding}>
                {
                  buildingsList.map((building, index)=>{
                    return(
                      <option key={building.id} value={index}>
                        {building.number}
                      </option>
                    )
                  })
                }
              </select>

              <label>Andar</label>
              <Input 
                type="text" 
                placeholder="Digite o andar"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue)) { // verifica se a entrada contém apenas números
                    setFloor(inputValue);
                  }
                }}
                value={floor}
                required
              />

              <label>Número</label>
              <Input 
                type="text" 
                placeholder="Digite o número"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue)) { // verifica se a entrada contém apenas números
                    setNumber(inputValue);
                  }
                }}
                value={number}
                required
              />

              <label>Valor</label>
              <Input 
                type="text" 
                placeholder="Digite o valor"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^[0-9]+([,\.][0-9]{0,2})?$/.test(inputValue) || inputValue === '' || e.key === 'Backspace' || e.key === 'Delete') { // verifica se a entrada contém apenas números e vírgulas e permite a tecla backspace e delete
                    setValue(inputValue);
                  }
                }}
                value={value}
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
  const response = await apiClient.get("/buildings");
  
  return{
      props:{
        buildings: response.data
      }
  }
});