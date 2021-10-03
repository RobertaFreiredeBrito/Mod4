const validaID = async (req, res, next) => {
    const { id } = req.params;

    if(!schema.prisma.Types.ObjectId.isValid(id)){
        res.status(400).send({error: "Id Inválido"});
        return;
    }

    try {
        const cadastro = await Cadastro.findById(id);
        if(!cadastro){
            return res.status(404).send({message: "Cadastro não cadastrado"});
        }
        res.cadastro = cadastro
    } catch (err) {
        return res.status(500).send({ error: err});
    }

    next();
}

module.exports = { validaID };