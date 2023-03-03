const Hotel = require('../models/hotelModel.js')
const Room = require('../models/roomModel.js')

async function creteHotel(req, res, next) {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        return res.status(200).send({ status: true, data: savedHotel });
    } catch (err) {
        next(err)
    }
}



async function UpdateHotel(req, res, next) {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        return res.status(200).send({ status: true, data: updateHotel });
    } catch (err) {
        next(err)
    }
}



async function deleteHotel(req, res, next) {
    try {
        const isDeleted = await Hotel.findByIdAndDelete(req.params.id)

        if (!isDeleted) { return res.status(404).send({ status: false, message: "data not found" }); }

        return res.status(200).send({ status: true, message: "hotel is deleted" });
    } catch (err) {
        next(err)
    }

}



async function getHotel(req, res, next) {

    try {

        const hotel = await Hotel.findById(req.params.id)

        // console.log(hotel);

        if (!hotel) { return res.status(404).send({ status: false, message: "data not found" }); }

        return res.status(200).send({ status: true, data: hotel });

    } catch (err) {
        next(err)
    }

}



async function getAllHotels(req, res, next) {

    const { min, max, ...others } = req.query;
    // console.log(req.query);

    try {
        const allHotels = await Hotel.find(
            {
                ...others,
                cheapestPrice: { $gt: min || 1, $lt: max || 999 },
            })
            .limit(req.query.limit);


        res.status(200).json(allHotels);
    } catch (err) {
        next(err);
    }
};


async function getHotelRooms(req, res, next) {
    try {
        const hotel = await Hotel.findById(req.params.id);
        // console.log("hotel");
        // console.log(hotel);
        const list = await Promise.all(hotel.rooms.map((roomId) => {
            return Room.findById(roomId);
        })
        );
        // console.log(list);

        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}



async function countByCity(req, res, next) {

    try {
        // here aggregation pipeline is used to manupulate thedata

        const list = await Hotel.aggregate([
            { $group: { _id: "$city", count: { $count: {} } } },
            { $sort: { count: -1, city: -1 } }
        ]);
        // console.log(list);

        res.status(200).json(list);

    } catch (err) {
        next(err);
    }
}


async function countByType(req, res, next) {
    try {
        // const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        // const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        // const resortCount = await Hotel.countDocuments({ type: "resort" });
        // const villaCount = await Hotel.countDocuments({ type: "villa" });
        // const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        const list = await Hotel.aggregate([
            { $group: { _id: "$type", count: { $count: {} } } },
        ])

        // console.log(list);

        res.status(200).json(
            list
            // [
            // { type: "hotel", count: hotelCount },
            // { type: "apartments", count: apartmentCount },
            // { type: "resorts", count: resortCount },
            // { type: "villas", count: villaCount },
            // { type: "cabins", count: cabinCount },
            // ]
        );


    } catch (err) {
        next(err);
    }
}

module.exports = {
    creteHotel, UpdateHotel, deleteHotel, getHotel, getAllHotels, getHotelRooms, countByCity, countByType
}

