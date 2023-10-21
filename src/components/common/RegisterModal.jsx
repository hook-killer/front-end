import React, { useState } from "react";

function RegisterModal({ onCheckAccept, isAccepted, setIsAccpted }) {
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
  }
  const closeModal = () => {
    setOpenModal(false);
    setIsAccpted(false);
  }

  const onSubmitAccept = () => {
    closeModal();
    onCheckAccept();
  }

  return (
    <>
      <ModalForm openModal={showModal}>
        <h2>가입해 주셔서 감사합니다!</h2>
        <p>인증메일을 보내드렸습니다. 이메일 인증을 진행해주세요.</p>
        <p>이메일 인증을 완료하여야 서비스를 이용하실 수 있습니다!</p>
      </ModalForm>
      <ModalButton>
        <span onClick={closeModal} className={isAccepted ? 'yes' : 'no'}>메인으로 돌아가기</span>
      </ModalButton>
    </>
  )
}

export default RegisterModal;