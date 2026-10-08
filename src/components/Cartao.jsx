const Cartao = (props) => {
    return (
        <div className="border-round border-1 surface-border p-3">
            <div className="text-sm text-500">
                {props.cabecalho}
            </div>

            <hr />

            <div>
                {props.children}
            </div>
        </div>
    )
}
export default Cartao;
