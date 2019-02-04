import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PendenciaFinanceira from "../components/cliente/PendenciaFinanceira"
import MensagemPendenciaFinanceira from "../components/cliente/MensagemPendenciaFinanceira"

configure({ adapter: new Adapter() });

describe('Test Suite Pendencia Financeira', () => {

    test('Verificar se estado comPendencia igual a true exibe a mensagem de Cliente com Pendencia', () => {
        const idCliente = 0;
        const wrapper = shallow(<PendenciaFinanceira idCliente={idCliente} />);

        // Verifica estado inicial do componente
        expect(wrapper.contains(
            <div/>
        )).toEqual(true);

        // Defini o novo estado do componente
        wrapper.setState({ comPendencia: true });

        //Após estado atualizado verificar se rendererizou o componente corretemente
        expect(wrapper.contains(
            <MensagemPendenciaFinanceira />
        )).toEqual(true);

    });
});