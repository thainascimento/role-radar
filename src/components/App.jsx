// const declara cnstante q é uma variavel que nao ser redefinida depois de declarada
const App = () => { // o () => {} é uma função arrow que é basicamente uma forma mais curta de se escrever uma função em javacsriopt
    const estiloSubtitulo = {
        fontSize: '18px'
    }

    const obterAno = () => {
        const dataAtual = new Date();
        return dataAtual.getFullYear();
    }
    return (
        <> 
        <h1 className="titulo">
            <i className="pi pi-map-marker"></i>{' '}
            RolêRadar
            </h1>

        <p style={estiloSubtitulo}> {/* subtitulo como PARAGRAFO, por isso a tag <p> e não <h2> */}
            Descubra o que existe perto de você
        </p>

        <footer> {/* o rodapé da página, que contém o copyright e o ano atual, que é obtido através da função obterAno() */}
            RolêRadar &copy; {obterAno()}
        </footer>
        </>
    )
}
export default App; // exporta o componente App para que ele possa ser usado em outros arquivos
