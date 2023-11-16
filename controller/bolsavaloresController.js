const listarAcoes = async (req, res) =>
{
    const response = await fetch('http://brapi.dev/api/quote/list?token=' + process.env.TOKEN_API);

    const data = await response.json();

    res.status(200).json([data]);
}

const listarAcaoNome = async (req, res) => 
{
    const response = await fetch('http://brapi.dev/api/quote/' + req.params.acao +'?token=' + process.env.TOKEN_API);

    const data = await response.json();

    res.status(200).json([data]);
}

module.exports = {listarAcaoNome, listarAcoes}