/* eslint-disable no-restricted-globals */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { FiRefreshCcw, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '../../server/api';

import './style.css';

const mySwal = withReactContent(Swal);

mySwal.mixin({
  customClass: {
    confirmButton: 'btn btn-danger',
  },
  buttonsStyling: false,
});

export default function ContributionCard(props) {
  const { name, id, endpoint } = props;

  function handleDelete() {
    mySwal
      .fire({
        title: <p>Você quer mesmo deletar?</p>,
        text: 'Isso não pode ser reversível',
        icon: 'warning',
      })
      .then((result) => {
        if (result.isConfirmed) {
          api.delete(`${endpoint}/${id}`).then((response) => {
            if (response.status === 200) {
              mySwal
                .fire({
                  title: <p>Deletado!</p>,
                  icon: 'success',
                })
                .then(() => {
                  window.location.reload();
                });
            }
          });
        }
      });
  }

  return (
    <Modal.Dialog className="custom-modal">
      <Modal.Header>
        <Link to={`/${endpoint}s/${id}`} className="name">
          {name}
        </Link>
        <div className="buttons-group">
          <Link to={`/${endpoint}s/${id}/edit`} className="update">
            <FiRefreshCcw size={18} />
            <small>Atualizar</small>
          </Link>
          <button type="button" className="del" onClick={handleDelete}>
            <FiXCircle size={18} />
            <small>Deletar</small>
          </button>
        </div>
      </Modal.Header>
    </Modal.Dialog>
  );
}
