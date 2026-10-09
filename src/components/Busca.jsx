import React from "react";
import { Button } from '@primereact/ui/button'
import { InputText } from '@primereact/ui/inputtext'

const categorias = [
    { rotulo: 'Cafés', chave: 'catering.cafe' },
    { rotulo: 'Restaurantes', chave: 'catering.restaurant' },
    { rotulo: 'Parques', chave: 'leisure.park' },
    { rotulo: 'Farmácias', chave: 'healthcare.pharmacy' },
    { rotulo: 'Supermercados', chave: 'commercial.supermarket' },
    { rotulo: 'Museus', chave: 'entertainment.museum' }
]

class Busca extends React.Component {

    state = {
        categoria: null,
        raio: '1000',
        erro: null
    }

    onFormSubmit = (evento) => {
        evento.preventDefault()

        if (this.state.categoria === null) {
            this.setState({
                erro: 'Escolha uma categoria.'
            })
            return
        }

        const raioNumero = Number(this.state.raio)

        if (
            !Number.isInteger(raioNumero) ||
            raioNumero < 100 ||
            raioNumero > 5000
        ){
            this.setState({
                erro: 'Informe um raio inteiro entre 100 e 5000 metros.'
            })
            return
        }

        this.setState({
            erro: null
        })

        this.props.onBuscaRealizada(
            this.state.categoria,
            raioNumero
        )
    }

    render(){
        return (
            <form onSubmit={this.onFormSubmit}>
                <div>
                    {categorias.map((categoria) => (
                        <Button
                            key={categoria.chave}
                            type="button"
                            variant={
                                this.state.categoria === categoria.chave
                                    ? undefined
                                    : 'outlined'
                            }
                            pt-root-onClick={() =>
                                this.setState({
                                    categoria: categoria.chave
                                })
                            }
                        >
                            {categoria.rotulo}
                        </Button>
                    ))}
                </div>

                <InputText
                    value={this.state.raio}
                    pt-root-onChange={(evento) =>
                        this.setState({
                            raio: evento.target.value
                        })
                    }
                    pt-root-placeholder={this.props.dica}
                />

                <Button>
                    <i className="pi pi-search"></i>
                    Buscar
                </Button>

                {this.state.erro && (
                    <p style={{ color: 'red' }}>
                        {this.state.erro}
                    </p>
                )}
            </form>
        )
    }
}

Busca.defaultProps = {
    dica: 'Raio em metros (100 a 5000)'
} 
export default Busca;