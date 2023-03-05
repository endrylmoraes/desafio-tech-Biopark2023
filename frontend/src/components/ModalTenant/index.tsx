import Modal from "react-modal";
import styles from "./styles.module.scss";

import { FiX } from "react-icons/fi";

import { setupAPIClient } from "@/services/api";

import { TenantProps } from "../../pages/tenant";
import { useState } from "react";

interface ModalTenantProps{
  isOpen: boolean;
  onRequestClose: () => void;
  tenantData: TenantProps;
}

export function ModalTenant({ isOpen, onRequestClose, tenantData }: ModalTenantProps){
  
  const customStyles = {
    content:{
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e"
    }
  }
  
  const [modalVisible, setModalVisible] = useState(false);

  Modal.setAppElement("#__next");

  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className={styles.container}>
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
          style={{background: "transparent", border: 0}}
        >
          <FiX size={45} color="#EB0045" />
        </button> 

        <h2>Detalhes do Locatário</h2>
        
        <section key={tenantData.id} className={styles.section}>
          <div>
            <span>Nome: </span>
            <span className={styles.description}>{tenantData.name}</span>
          </div>
          <div>
            <span>Idade: </span>
            <span className={styles.description}>{tenantData.age}</span>
          </div>
          <div>
            <span>Email: </span>
            <span className={styles.description}>{tenantData.email}</span>
          </div>
          <div>
            <span>CPF: </span>
            <span className={styles.description}>{tenantData.cpf}</span>
          </div>
        </section>
      </div>
    </Modal>
  )
}