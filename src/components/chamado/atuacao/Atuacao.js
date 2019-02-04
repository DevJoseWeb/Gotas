import React, { Component } from 'react'

class Atuacao extends Component {

  colorLabel(setor) {
    switch(setor) {
      case 1: //desenvolvimento
        return 'info' //azul-escuro
      case 2: //suporte
        return 'danger' //vermelho
      case 3: //comercial
        return 'warning'//laranja
      case 4: //Financeiro
        return 'primary'//roxo
      default:
        return 'megna' //verde
    }
  }

  // renderNaoPossuiAtuantes() {

  // }

  renderRows() {
    if (this.props.listaAtuacao.length === 0) return
    return (
      this.props.listaAtuacao.map((item) => (  
        <tr>
          <td>{item.idFuncionario}</td>
          <td>{item.nomeFuncionario}</td>
          <td align="right"><span className={`label label-light-${this.colorLabel(item.idSetor)}`}>{item.nomeSetor}</span></td>
        </tr>
      ))
    )
  }

  render() {
    return (
      <div className='card earning-widget'>
        <div className="card-header">
          <div className="card-actions">
            <a className="" data-action='collapse'><i className="ti-minus"></i></a>
            {/* <a className="btn-minimize" data-action="expand"><i className="mdi mdi-arrow-expand"></i></a> */}
          </div>
          <h4 className="card-title m-b-0">Atuantes no Chamado</h4>
        </div>

        <div className='card-body b-t collapse show' >
          <table className='table v-middle no-border'>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </div>

      </div>
    )
  }
}


export default (Atuacao)