import { combineReducers } from 'redux'

import ClienteReducer from './cliente/clienteReducer'
import FuncionarioReducer from './funcionario/funcionarioReducer'
import MeioChamadoReducer from './meiochamado/meiochamadoReducer'
import OperacaoReducer from './operacao/operacaoReducer'
import PrioridadeReducer from './prioridade/prioridadeReducer'
import SetorReducer from './setor/setorReducer'
import SistemaReducer from './sistema/sistemaReducer'
import VersaoSistemaReducer from './versaosistema/versaosistemaReducer'
import ChamadoReducer from './chamado/ChamadoReducer'
import AndamentoReducer from './chamado/andamento/AndamentoReducer'
import AuthReducer from "./auth/AuthReducer"
import TransferenciaReducer from './chamado/transferencia/TransferenciaReducer'
import FeedbackReducer from "./chamado/feedback/FeedbackReducer"
import NotificacaoReducer from "./chamado/notificacao/NotificacaoReducer"
import { reducer as toastrReducer } from 'react-redux-toastr'
import LoadingReducer from "./LoadingReducer"
import AtuacaoReducer from "./chamado/atuacao/AtuacaoReducer"
import PendenciaSetorReducer from './pendenciasetor/PendenciaSetorReducer'

const rootReducer = combineReducers({
    clienteStore: ClienteReducer,
    funcionarioStore: FuncionarioReducer,
    meiochamadoStore: MeioChamadoReducer,
    prioridadeStore: PrioridadeReducer,
    setorStore: SetorReducer,
    sistemaStore: SistemaReducer,
    versaosistemaStore: VersaoSistemaReducer,
    operacaoStore: OperacaoReducer,
    chamadoStore: ChamadoReducer,
    andamentoStore: AndamentoReducer,
    authStore: AuthReducer,
    transferenciaStore: TransferenciaReducer,
    feedbackStore: FeedbackReducer,
    notificacaoStore: NotificacaoReducer,
    toastr: toastrReducer,
    loadingStore: LoadingReducer,
    atuacaoStore: AtuacaoReducer,
    pendenciaSetorStore: PendenciaSetorReducer,
})

export default rootReducer