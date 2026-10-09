import Creditos from "./Creditos";
import React from "react";
import Loading from "./Loading";
import Cartao from "./Cartao";
import MeuPonto from "./MeuPonto";
import geoapifyClient from "../utils/geoapifyClient";
import Busca from "./Busca";
import ListaLugares from "./ListaLugares";
import MapaRadar from "./MapaRadar";

class App extends React.Component {

    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null,
        lugares: null,
        buscando: false,
        erroBusca: null,
        raioBuscado: null
    }

    obterLocalizacao = () => {
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                this.setState({
                    latitude: posicao.coords.latitude,
                    longitude: posicao.coords.longitude,
                    horarioLocalizacao: Date.now(),
                    mensagemDeErro: null
                })
            },
            (erro) => {
                console.error(erro)

                this.setState({
                    mensagemDeErro: "Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página."
                })
            }
        )
    }

    componentDidMount() {
        this.obterLocalizacao()
    }

    onBuscaRealizada = (categoria, raio) => {

        this.setState({
            buscando: true,
            erroBusca: null,
            raioBuscado: raio
        })

        geoapifyClient.get('/places', {
            params: {
                categories: categoria,
                filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
                bias: `proximity:${this.state.longitude},${this.state.latitude}`,
                limit: 20
            }
        })
        .then((resposta) => {
            this.setState({
                lugares: resposta.data.features,
                buscando: false
            })
        })
        .catch((erro) => {
            console.error(erro)

            this.setState({
                buscando: false,
                erroBusca: 'Não foi possível consultar os lugares. Tente novamente.'
            })
        })
    }

    render() {

        const estiloSubtitulo = {
            fontSize: '18px'
        }

        const obterAno = () => {
            const dataAtual = new Date()
            return dataAtual.getFullYear()
        }

        let conteudo

        if (this.state.mensagemDeErro) {
            conteudo = (
                <p>{this.state.mensagemDeErro}</p>
            )
        }
        else if (this.state.latitude === null) {
            conteudo = (
                <Loading mensagem="Aguardando permissão de localização..." />
            )
        }
        else {
            conteudo = (
                <>
                    <Cartao cabecalho="Você está aqui">
                        <MeuPonto
                            latitude={this.state.latitude}
                            longitude={this.state.longitude}
                            horarioLocalizacao={this.state.horarioLocalizacao}
                            onAtualizar={this.obterLocalizacao}
                        />
                    </Cartao>

                    <Cartao cabecalho="O que você procura?">
                        <Busca
                            onBuscaRealizada={this.onBuscaRealizada}
                        />
                    </Cartao>
                </>
            )
        }

        let resultadoBusca = null

        if (this.state.buscando) {
            resultadoBusca = (
                <Loading mensagem="Procurando lugares..." />
            )
        }
        else if (this.state.erroBusca) {
            resultadoBusca = (
                <p>{this.state.erroBusca}</p>
            )
        }
        else if (
            this.state.lugares !== null &&
            this.state.lugares.length === 0
        ) {
            resultadoBusca = (
                <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>
            )
        }
        else if (this.state.lugares !== null) {

            const quantidade = this.state.lugares.length

            const resumo = quantidade === 1
                ? `1 lugar encontrado em até ${this.state.raioBuscado} m`
                : `${quantidade} lugares encontrados em até ${this.state.raioBuscado} m`

            resultadoBusca = (
                <>
                    <strong>{resumo}</strong>

                    <Cartao cabecalho="Radar">
                        <MapaRadar
                            latitude={this.state.latitude}
                            longitude={this.state.longitude}
                            lugares={this.state.lugares}
                        />
                    </Cartao>

                    <ListaLugares
                        lugares={this.state.lugares}
                    />
                </>
            )
        }

        return (
            <div className="grid">
                <div 
                className="col-12"
                style={{ textAlign: 'center' }}
                >
                    
                    <h1 className="titulo">
                        <i className="pi pi-map-marker"></i>{' '}
                        RolêRadar
                    </h1>

                    <p style={estiloSubtitulo}>
                        Descubra o que existe perto de você
                    </p>

                    <Creditos />
                </div>

                <div className="col-12 lg:col-6">
                    {conteudo}
                </div>

                <div className="col-12 lg:col-6">
                    {resultadoBusca}
                </div>

                <div className="col-12"
                style={{ textAlign: 'center' }}>
                    <footer>
                        RolêRadar &copy; {obterAno()}
                    </footer>
                </div>

            </div>
        )
    }
}

export default App;