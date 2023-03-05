import img from "../../../public/areabiopark.png";
import Image from "next/image";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Dashboard(){
  return(
    <>
      <h1>Bem vindo ao painel!</h1>
      <Image src={img} alt="Território Biopark" />
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props:{}
  }
});