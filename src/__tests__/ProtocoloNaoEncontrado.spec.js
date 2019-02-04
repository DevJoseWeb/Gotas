import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProtocoloNaoEncontrado from '../components/chamado/ProtocoloNaoEncontrado'

configure({ adapter: new Adapter() });

describe('Test Suite Protocolo não encontrado', () => {

    test('Verificar se componente de protocolo não encontrado está renderizando a mensagem', () => {
        const wrapper = shallow(<ProtocoloNaoEncontrado />);

        expect(wrapper.contains(
            <div className="rt-noData">Protocolo(s) não econtrado(s)</div>
        )).toEqual(true);

    });
});