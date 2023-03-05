import Image from "next/image";
import territorioBiopark from "../../../public/territorio-biopark.png";

import Head from "next/head";

import { Header } from "../../components/Header";

import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Dashboard(){
  return(
    <>
      <Head>
        <title>Biopark - Dashboard</title>
      </Head>
      <div>
        <Header/>
        <h1>Bem vindo ao painel!</h1>
        <Image src={territorioBiopark} alt="Território Biopark" />
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props:{}
  }
});