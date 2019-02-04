
// import Enumeration from './utils/Enumeration'


// export const URL_BASE = 'http://192.168.0.22:8096';

export const URL_BASE = 'http://zaal.no-ip.info:8096'

export const URL_ENDPOINT_CLIENTE = 'cliente';
export const URL_ENDPOINT_CLIENTE_TELEFONE = 'telefone';
export const URL_ENDPOINT_CLIENTE_EMAIL = 'email';
export const URL_ENDPOINT_CLIENTE_INTEREACAO = 'interacao';
export const URL_ENDPOINT_LIBERACAO = 'liberacao';
export const URL_ENDPOINT_LIBERACAO_CHAVE = 'chave';
export const URL_ENDPOINT_FUNCIONARIO = 'funcionario';
export const URL_ENDPOINT_MEIO_CHAMADO = 'meiochamado';
export const URL_ENDPOINT_PRIORIDADE = 'prioridade';
export const URL_ENDPOINT_SETOR = 'setor';
export const URL_ENDPOINT_SISTEMA = 'sistema';
export const URL_ENDPOINT_VERSAOSISTEMA = 'versaosistema';
export const URL_ENDPOINT_OPERACAO = 'operacao';
export const URL_ENDPOINT_CHAMADO = 'chamado';
export const URL_ENDPOINT_ATUACAO = 'atuacao';
export const URL_ENDPOINT_CHAMADO_ANDAMENTOS = 'andamento';
export const URL_ENDPOINT_CHAMADO_FEEDBACK = 'feedback';
export const URL_ENDPOINT_CHAMADO_ATUACAO = 'atuacao';
export const URL_ENDPOINT_CHAMADO_TRANSFERENCIA = 'transferencia';
export const URL_ENDPOINT_CHAMADO_TRANSFERENCIA_SEGUINDO = 'seguindo';
export const URL_ENDPOINT_CATEGORIA_TEMPLATE_ANDAMENTO = 'categoriatemplate';
export const URL_ENDPOINT_TEMPLATE_ANDAMENTO = 'template';
export const URL_ENDPOINT_STATUS = 'status';
export const URL_ENDPOINT_TIPO = 'tipochamado';
export const URL_ENDPOINT_CHAMADO_TRANSFERENCIA_PENDENTE = 'pendente';
export const URL_ENDPOINT_NOTIFICACAO = 'notificacao';
export const URL_ENDPOINT_ATENDIMENTO = 'atendimento';
export const URL_ENDPOINT_TIPO_ATENDIMENTO = 'tipoatendimento';
export const URL_ENDPOINT_PENDENCIA_SETOR = 'pendenciasetor';
export const URL_ENDPOINT_ATENDIMENTO_HOJE = 'atendimentohoje';
export const URL_ENDPOINT_EXISTE_PENDENCIA = 'existependencia';

export const OPERACAO_CHAMADO_PENDENTE = '0';
export const userKeyLocalStorage = '_zaalatendimento_usertoken';
export const TEMPO_CACHE_CONSULTAS = 60;
export const ANDAMENTO_PREVISAO = 'PREVISAO';
export const ACAO_TRANSFERENCIA_CHAMADO = {
  Aceitar: 'ACEITO',
  Recusar: 'RECUSADO',
};

export const MODO_PESQUISA_CLIENTE = {
  Nome: 'nome',
  Cpf: 'cpf',
  Cnpj: 'cnpj',
  Grupo: 'grupo',
};

export const OPERACAO_ATENDIMENTO = {
  PENDENTE: 0,
  EM_ANALISE: 1,
  ANDAMENTO: 2,
  PAUSA: 3,
  CONCLUSAO: 4,
  REINICIO: 5,
  CANCELADA: 6,
  PREVISAO: 7,
  ANEXO_ARQUIVO: 8,
  MODIFICACAO_CHAMADO: 9,
};

export const SITUACAO_NOTIFICACAO = {
  TODAS: 'todas',
  VISUALIZADA: 'visualizada',
  NAO_VISUALIZADA: 'naovisualizada',
};

export const APP_COLUMNS_CHAMADO_LIST = '_app_columns_chamado_list'

/* export const ACAO_TRANSFERENCIA_CHAMADO = new Enumeration({
    aceitar: 'ACEITO',
    recusar: 'RECUSADO'
})
console.info(suits.has('aceitar')) // TRUE */

const numMinutesToStale = 60;
export const timeToStale = numMinutesToStale * 60 * 1000;

export const APP_LOAD_MORE_NOTIFICATIONS = '_load_more_notifications'