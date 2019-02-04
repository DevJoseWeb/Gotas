import React, {Component, Fragment} from 'react'
import PropTypes from "prop-types"
import {connect} from 'react-redux'

import moment from 'moment'
import Tooltip from '@material-ui/core/Tooltip'
import Button from "@material-ui/core/Button/Button"
import { withStyles } from '@material-ui/core/styles';

import { Collapse } from 'reactstrap'

import {filtrarChamado} from "./ChamadoAction"
import Pagination from './Pagination'
import CustomNoDataComponent from './ProtocoloNaoEncontrado'
import BuscaChamadoPresenter from "./buscachamado/BuscaChamadoPresenter"
import SelectionsColumnGroupChamado from './ChamadoTableGroupColumn'
import ColumnChooser from "./ColumnChooser"

import {APP_COLUMNS_CHAMADO_LIST} from "../../base"

import ReactTable from "react-table"
import 'react-table/react-table.css'
import '../../commom/template/custom.css'
import '../../commom/template/removeCheckbox.css'

import selectTableHOC from 'react-table/lib/hoc/selectTable'
import treeTableHOC from 'react-table/lib/hoc/treeTable'

const SelectTreeTable = selectTableHOC(treeTableHOC(ReactTable))

const popoverStyles =  theme => ({
    boxElementPad: {
        padding: "1px 2px 1px 16px",
        height:'auto'
    },

    formGroup: {
        marginTop: "4px",
    },
    formControl: {},
    checkbox: {
        width: "12px",
        height: "12px",
        marginRight: "5px"
    },
    checked: {},
    label: {
        fontSize: "15px",
        marginLeft: "5px",
        color: "green",
        fontFamily: "seriff"
    },
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing.unit * 2,
    },

});

const COLUMNS = [
    {
        accessor: 'id',
        fixed: "left",
        Header: 'Protocolo',
        show: true,
        minWidth: 120,
    },
    {
        accessor: 'solicitante',
        Header: 'Solicitante',
        minWidth: 160,
        show: true,
    },
    {
        accessor: 'assunto',
        Header: 'Assunto',
        minWidth: 330,
        show: true,
    },
    {        
        id: "dataHoraAbertura",
        Header: 'Data Abertura',
        accessor: d => {
            return moment(d.dataHoraAbertura)
                .local()
                .format("DD/MM/YYYY")
        },
        minWidth: 150,
        show: true,
    },
    {
        accessor: 'email',
        Header: 'E-mail',
        minWidth: 400,
        show: true,
    },
    {
        accessor: 'cliente.id',
        Header: 'Cód Cliente',
        minWidth: 120,
        show: true,
    },
    {
        accessor: 'cliente.nomeFantasia',
        Header: 'Nome Fantasia Cliente',
        minWidth: 250,
        show: true,
    },
    {
        accessor: 'cliente.razaoSocial',
        Header: 'Razão Social Cliente',
        minWidth: 250,
        show: true,
    },
    {
        accessor: 'funcionarioCadastro.id',
        Header: 'Cód. Func. Cadastro',
        minWidth: 220,
        show: true,
    },
    {
        accessor: 'funcionarioCadastro.nome',
        Header: 'Nome Func. Cadastro',
        minWidth: 220,
        show: true,
    },
    {
        accessor: 'funcionarioResponsavel.id',
        Header: 'Cód. Responsável',
        show: true,
    },
    {
        accessor: 'funcionarioResponsavel.nome',
        Header: 'Nome Responsável',
        show: true,
    },
    {
        accessor: 'meio.nome',
        Header: 'Meio',
        show: true,
    },
    {
        accessor: 'operacao.nome',
        Header: 'Operação',
        show: true,
    },
    {
        accessor: 'prioridade.nome',
        Header: 'Prioridade',
        show: true,
    },
    {
        accessor: 'sistema.id',
        Header: 'Cód. Sistema',
        show: true,
    },
    {
        accessor: 'sistema.nome',
        Header: 'Sistema',
        show: true,
    },
    {
        accessor: 'status.nome',
        Header: 'Status',
        show: true,
    },
    {
        accessor: 'tipo.nome',
        Header: 'Tipo',
        show: true,
    },
    {
        accessor: 'versaoSistema.id',
        Header: 'Cód. Versão',
        show: true,
    },
    {
        accessor: 'versaoSistema.nome',
        Header: 'Versão',
        show: true,
    },
]

function getNodes(data, node = []) {
    data.forEach((item) => {
        if (item.hasOwnProperty('_subRows') && item._subRows) {
            node = getNodes(item._subRows, node);
        } else {
            node.push(item._original);
        }
    });
    return node;
}

class ChamadoListaTable2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            columns: COLUMNS,
            selected: {},
            filtroChamado: this.props.filtroChamado,
            idResponsavel: this.props.idResponsavel,
            collapse: false,

            pivotBy: [],
            expanded: {},
            selectType: 'checkbox',
            selection: [],
            selectAll: false,

        };

        this.fetchData = this.fetchData.bind(this);
        this.presenter = new BuscaChamadoPresenter(this)

        this.toggle = this.toggle.bind(this);

    }


    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    toggleSelection = (key, shift, row) => {
        /*
          Implementation of how to manage the selection state is up to the developer.
          This implementation uses an array stored in the component state.
          Other implementations could use object keys, a Javascript Set, or Redux... etc.
        */
        // start off with the existing state
        if (this.state.selectType === 'radio') {
            let selection = [];
            if (selection.indexOf(key) < 0) selection.push(key);
            this.setState({ selection });
        } else {
            let selection = [
                ...this.state.selection
            ];
            const keyIndex = selection.indexOf(key);
            // check to see if the key exists
            if (keyIndex >= 0) {
                // it does exist so we will remove it using destructing
                selection = [
                    ...selection.slice(0, keyIndex),
                    ...selection.slice(keyIndex + 1)
                ]
            } else {
                // it does not exist so add it
                selection.push(key);
            }
            // update the state
            this.setState({ selection });

            this.props.selecionarProtocolosTransferencia(selection)
        }
    }

    toggleAll = () => {
        /*
          'toggleAll' is a tricky concept with any filterable table
          do you just select ALL the records that are in your data?
          OR
          do you only select ALL the records that are in the current filtered data?

          The latter makes more sense because 'selection' is a visual thing for the user.
          This is especially true if you are going to implement a set of external functions
          that act on the selected information (you would not want to DELETE the wrong thing!).

          So, to that end, access to the internals of ReactTable are required to get what is
          currently visible in the table (either on the current page or any other page).

          The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
          ReactTable and then get the internal state and the 'sortedData'.
          That can then be iterrated to get all the currently visible records and set
          the selection state.
        */
        const selectAll = this.state.selectAll ? false : true;
        const selection = [];
        if (selectAll) {
            // we need to get at the internals of ReactTable
            const wrappedInstance = this.selectTable.getWrappedInstance();
            // the 'sortedData' property contains the currently accessible records based on the filter and sort
            const currentRecords = wrappedInstance.getResolvedState().sortedData;
            // we need to get all the 'real' (original) records out to get at their IDs
            const nodes = getNodes(currentRecords);
            // we just push all the IDs onto the selection array
            nodes.forEach((item) => {
                selection.push(item.id);
            })
        }
        this.setState({ selectAll, selection })
        this.props.selecionarProtocolosTransferencia(selection)
    }

    isSelected = (key) => {
        /*
          Instead of passing our external selection state we provide an 'isSelected'
          callback and detect the selection state ourselves. This allows any implementation
          for selection (either an array, object keys, or even a Javascript Set object).
        */
        return this.state.selection.includes(key);
    }

    toggleColumn = n => {
        const cols = this.state.columns.map((col, i) => n===i? {...col, show: !col.show}: col)
        this.setState({
            columns: cols
        })
    }

    exibirChamado(chamado){
        this.props.dispatch(filtrarChamado(chamado))

        this.setState({
            loading: false
        });

    }


    fetchData(state, instance) {
        
        this.setState({ loading: true });
        this.presenter.carregarChamadoPorFiltroAvancado(this.state.filtroChamado, this.state.idResponsavel, state.page, state.pageSize, state.sorted)
    }

    toggleColumnChooser = (index) => {
        this.setState(
            prevState => {
                const columns1 = [];
                columns1.push(...this.state.columns);
                columns1[index].show = !columns1[index].show;
                if (columns1[index].columns) {
                    columns1[index].columns.forEach(item => {
                        item.show = !item.show
                    })
                }

                return {
                    columns: columns1,
                };
            }, () => {
                //this.mountEvents();
                localStorage.setItem(APP_COLUMNS_CHAMADO_LIST, JSON.stringify(this.state.columns));
            }
        );

    };

    componentDidUpdate(previousProps, previousState) {

        if (previousProps.filtroChamado !== this.props.filtroChamado) {
            this.setState({filtroChamado: this.props.filtroChamado})
        }

        if (previousProps.idResponsavel !== this.props.idResponsavel) {
            this.setState({idResponsavel: this.props.idResponsavel})
        }

    }

    retornaColunas() {

        let columns = this.state.columns.map(item => {
            if (item.id !== 'dataHoraAbertura') {
                return {value: item.accessor, label: item.Header}
            } else {
                return {value: 'dataHoraAbertura', label: 'Data Hora'}
            }
        })

        return columns
    }

    handlePivotBy(columns) {
        this.setState({pivotBy: columns})
    }

    onExpandedChange = (expanded) => {
        this.setState({ expanded });
    }
    
    render() {
        const { loading, pivotBy, expanded, selectType, selectAll } = this.state;

        const {
            onExpandedChange,
            isSelected,
            toggleSelection,
            toggleAll
        } = this;
        const extraProps =
            {
                selectAll,
                isSelected,
                toggleAll,
                toggleSelection,
                expanded,
                pivotBy,
                selectType,
                onExpandedChange
            }

        return (


            <div>

                <div className="text-right">
                    <div className="btn-group">
                        <Tooltip id="tooltip-columns_agrupar" title="Agrupar Colunas">
                            <Button size="small" variant="outlined" onClick={this.toggle} style={{backgroundColor:'white',height:'32px',padding:'2px',marginLeft:'5px'}} >
                                <i className="fas fa-th-large" />
                            </Button>
                        </Tooltip>
                        <ColumnChooser columns={this.state.columns} onColumnUpdate={this.toggleColumnChooser.bind(this)} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 m-b-5 m-t-5">
                        <Collapse isOpen={this.state.collapse}>
                            <div >
                                <SelectionsColumnGroupChamado columns={this.retornaColunas()} handleChange={this.handlePivotBy.bind(this)}/>
                            </div>
                        </Collapse>
                    </div>
                </div>

                {
                    this.props.listaChamado.content || this.props.listaChamado ?
                        <SelectTreeTable
                            PaginationComponent={Pagination}
                            resizable={false}
                            keyField='id'
                            {...extraProps}
                            ref={(r) => this.selectTable = r}
                            freezWhenExpanded={true}
                            columns={this.state.columns}
                            manual // Força a tabela a não ordenar e paginar automáticamente, para o processo ser feito do lado servidor
                            data={this.props.listaChamado.content || this.props.listaChamado}
                            pages={this.props.listaChamado.totalPages || 1} // Exibir o número total de páginas
                            loading={loading} // Exibir o carregamento
                            onFetchData={this.fetchData} // Solicitar novos dados a qualquer alteração
                            defaultPageSize={10}
                            className="-striped -highlight"
                            NoDataComponent={CustomNoDataComponent}
                            getTrGroupProps={(state, rowInfo, column, instance) => {
                                if (rowInfo !== undefined) {
                                    if (rowInfo.original) {
                                        return {
                                            onDoubleClick: (e, handleOriginal) => {
                                                console.log('It was in this row:', rowInfo)
                                                this.props.onRowClick(rowInfo.original)
                                            },
                                        }
                                    }
                                }}
                            }
                        />
                        : null
                }

                <br />
            </div>
        );
    }
}


ChamadoListaTable2.propTypes = {
    idResponsavel: PropTypes.number.isRequired,
    onRowClick: PropTypes.func.isRequired,
    filtroChamado: PropTypes.object.isRequired
};

const mapStateToProps = state => (
    {
        listaChamado: state.chamadoStore.listaChamado,
        chamadoNaoEncontrado: state.chamadoStore.chamadoNaoEncontrado
    }
)

export default connect(mapStateToProps)(withStyles(popoverStyles)(ChamadoListaTable2))