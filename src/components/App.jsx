import Creditos from "./Creditos";
import React from "react";
import Loading from "./Loading";
import Cartao from "./Cartao";
import MeuPonto from "./MeuPonto";

class App extends React.Component {

    state = {
        latitude: null,
        longitude: null,
        horarioLocalizacao: null,
        mensagemDeErro: null
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

    componentDidMount() { // método do ciclo de vida do React que é chamado quando o componente é montado
        this.obterLocalizacao()
    }

    render() {

        const estiloSubtitulo = {
            fontSize: '18px'
        }

        const obterAno = () => {
            const dataAtual = new Date();
            return dataAtual.getFullYear();
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
                <Cartao cabecalho="Você está aqui">
                    <MeuPonto
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        horarioLocalizacao={this.state.horarioLocalizacao}
                        onAtualizar={this.obterLocalizacao}
                    />
                </Cartao>
            )
        }

        return (
            <>
                <h1 className="titulo">
                    <i className="pi pi-map-marker"></i>{' '}
                    RolêRadar
                </h1>

                <p style={estiloSubtitulo}>
                    Descubra o que existe perto de você
                </p>

                <Creditos />

                {conteudo}

                <footer>
                    RolêRadar &copy; {obterAno()}
                </footer>
            </>
        )
    }
}

export default App;