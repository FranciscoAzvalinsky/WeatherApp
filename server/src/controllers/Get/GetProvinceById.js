const { Province } = require('../../db')

const GetProvinceById = async (req, res) => {
    const {id} = req.params

    try {
        let province = await Province.findOne({where: {provId: id}})

        if (province){
            res.status(200).send(province)
        }
        else {
            res.status(404).send({message: 'Province not found'})
        }
    } catch (error) {
        console.log(error.message)
        console.log(error.stack)
        res.status(500).send({message: error.message})
    }
}

module.exports = {GetProvinceById}