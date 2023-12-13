const { Province } = require('../../db');

const PostProvinces = async (req, res) => {
    try {

        let provincias = req.body;
        provincias.forEach(async provincia => {
            let id = provincia.id;
            let name = provincia.nombre;
            let lon = provincia.centroide.lon.toFixed(3);
            let lat = provincia.centroide.lat.toFixed(3);

            let [province, created]= await Province.findOrCreate({
                where: { name },
                defaults : {
                    name,
                    provId: id,
                    lon,
                    lat
                }
            })
        })

        res.status(200).send({message: 'Provinces uploaded successfully'})
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).send({error:  error.message})
    }
}

module.exports = {
    PostProvinces
}