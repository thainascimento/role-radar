import Cartao from "./Cartao";

const estiloNumero = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#1565c0',
    color: 'white'
}    

const formatarDistancia = (distancia) => {
    if (distancia < 1000) {
        return `${Math.round(distancia)} m`
    }

    return `${(distancia / 1000).toFixed(1).replace('.', ',')} km`     
}

const Lugar = ({ numero, nome, endereco, distancia }) => {
    return (
        <Cartao cabecalho={formatarDistancia(distancia)}>
            <div>
                <span style={estiloNumero}>
                    {numero}
                </span>
                <strong>{nome || 'Sem nome'}</strong>
                <p>{endereco}</p>
            </div>
        </Cartao>
    )

}
export default Lugar;