import React, {Component} from 'react'

import UploadFile from "./uploadFile/UploadFile"
import Gallery from 'react-grid-gallery'
import ChamadoPresenter from './ChamadoPresenter'

import {URL_BASE, URL_ENDPOINT_CHAMADO} from "../../base"

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ChamadoAnexos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: [],
            currentImage: 0,
            selectAllChecked: false,
            renderExclusao: false,
            modal: false
        };

        this.onSelectImage = this.onSelectImage.bind(this);
        this.getSelectedImages = this.getSelectedImages.bind(this);
        this.onClickSelectAll = this.onClickSelectAll.bind(this);
        this.uploadConcluido = this.uploadConcluido.bind(this);
        this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
        this.toggle = this.toggle.bind(this);

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    /*componentDidUpdate(previousProps, previousState) {

        const {classes, columns} = this.props;

        if (previousProps.chamado !== this.props.chamado) {
            this.presenter.carregarAnexoChamado(this.props.chamado.id)
        }
    }*/

    componentDidMount() {
        this.presenter = new ChamadoPresenter(this)
        this.presenter.carregarAnexoChamado(this.props.chamado.id)
    }

    exibirAnexos(listaAnexos) {
        this.setState({
            images: listaAnexos
        });
    }

    recarregarAnexos() {
        this.presenter.carregarAnexoChamado(this.props.chamado.id)
        this.setState({
            renderExclusao: false
        })
        this.toggle()
    }

    uploadConcluido() {
        this.presenter.carregarAnexoChamado(this.props.chamado.id)
    }

    allImagesSelected(images) {
        var f = images.filter(
            function (img) {
                return img.isSelected === true;
            }
        );
        return f.length === images.length;
    }

    onSelectImage(index, image) {
        var images = this.state.images.slice();
        var img = images[index];
        if(img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else {
            img.isSelected = true;
        }

        this.setState({
            images: images,
            renderExclusao: this.getSelectedImages().length > 0
        });

        if(this.allImagesSelected(images)){
            this.setState({
                selectAllChecked: true
            });
        }
        else {
            this.setState({
                selectAllChecked: false
            });
        }
    }

    getSelectedImages() {
        var selected = [];

        for(var i = 0; i < this.state.images.length; i++) {
            if (this.state.images[i].isSelected === true)
                selected.push(i);
        }

        return selected;
    }

    onClickSelectAll() {
        var selectAllChecked = !this.state.selectAllChecked;
        this.setState({
            selectAllChecked: selectAllChecked
        });

        var images = this.state.images.slice();
        if(selectAllChecked){
            for(let i = 0; i < this.state.images.length; i++)
                images[i].isSelected = true;
        }
        else {
            for(let i = 0; i < this.state.images.length; i++)
                images[i].isSelected = false;

        }
        this.setState({
            images: images
        });
    }

    downloadFile() {
        var images = this.state.images.slice();

        if (images[this.state.currentImage].imgExtensao !== 'image') {
             setTimeout(() => {
                 const response = {
                     file: images[this.state.currentImage].imgUri,
                 };
             window.open(response.file);
           }, 100);
        }
    }

    onCurrentImageChange(index) {
        this.setState({ currentImage: index });
    }

    excluirAnexo() {
        let anexoList = []

        this.state.images.map(item => {
            if (item.isSelected) {
                anexoList.push(item.imgName)
            }
            return null;
        })

        if (anexoList.length > 0) {
            this.presenter.excluirAnexoChamado(this.props.chamado.id, anexoList)
        }
    }

    renderModal() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Exclusão de Anexo</ModalHeader>
                    <ModalBody>
                        {this.getSelectedImages().length === 1 ? 'Este anexo será apagado deste protocolo.'
                                                               : 'Estes anexos serão apagados deste protocolo.'}

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.excluirAnexo.bind(this)}>Confirmar</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    renderBtnExcluir() {
        if (this.state.renderExclusao) {
            return (
                <button onClick={this.toggle} type="button" className="btn btn-danger btn-rounded">Excluir Anexo</button>
            )
        }
        return null
    }

    render() {
        return (
            <div>
                <UploadFile uploadConcluido={this.uploadConcluido} url={`${URL_BASE}/${URL_ENDPOINT_CHAMADO}/${this.props.chamado.id}/anexo`} chave="arquivos" />

                <div style={{
                    display: "block",
                    minHeight: "1px",
                    padding: "5px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
                    <Gallery
                        images={this.state.images}
                        onClickImage={this.downloadFile.bind(this)}
                        onSelectImage={this.onSelectImage}
                        currentImageWillChange={this.onCurrentImageChange}
                        showLightboxThumbnails={true}/>
                </div>

                <br />

                {this.renderBtnExcluir()}
                {this.renderModal()}

            </div>
        );
    }
}

export default ChamadoAnexos;