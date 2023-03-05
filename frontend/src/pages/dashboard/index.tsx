import Image from "next/image";
import territorioBiopark from "../../../public/territorio-biopark.png";
import styles from "./styles.module.scss";

import Head from "next/head";

import { Header } from "../../components/Header";

import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Dashboard(){
  return(
    <>
      <Head>
        <title>Biopark - Território</title>
      </Head>
      <div>
        <Header/>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Território do Biopark</h1>
            <Image src={territorioBiopark} alt="Território Biopark" />
          </div>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props:{}
  }
});