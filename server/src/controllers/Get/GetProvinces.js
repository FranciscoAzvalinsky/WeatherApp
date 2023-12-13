const { Province } = require('../../db')

const GetProvinces = async (req, res) => {
    
    try {
        let provinces = await Province.findAll()

        if (provinces){
            res.status(200).send(provinces)
        }
        else {
            res.status(404).send({message: 'Provinces not found'})
        }
    } catch (error) {
        console.log(error.message)
        console.log(error.stack)
        res.status(500).send({message: error.message})
    }
}

module.exports = {GetProvinces}