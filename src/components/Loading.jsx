import React from 'react'

class Loading extends React.Component {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <i
                    className="pi pi-spin pi-spinner" 
                    style={{ fontSize: '2rem' }}
                >    
                </i>

                <p>{this.props.mensagem}</p>
            </div>
        )
    }
}
Loading.defaultProps = {
    mensagem: 'Carregando...'
}
export default Loading;