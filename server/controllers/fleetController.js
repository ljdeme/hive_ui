const Fleet = require('../models/fleetModel')
const mongoose = require('mongoose')

const getFleets = async (req, res) => {
    const user_id = req.query.userid;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if 'page' query parameter is not provided
    const perPage = 8; // Number of items per page
  
    try {
      // Calculate the number of items to skip based on the current page and perPage
      const skip = (page - 1) * perPage;
  
      // Query the database with pagination
      const fleets = await Fleet.find({ userid: user_id })
        .skip(skip)
        .limit(perPage);
  
      if (!fleets || fleets.length === 0) {
        return res.status(404).json({ error: "No fleets found for this user." });
      }
  
      res.status(200).json(fleets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

// create a new user
const createFleet = async(req, res) => {
    const {ipaddress, name, userid} = req.body

    try{
        const fleet = await Fleet.create({ipaddress: ipaddress, name: name, userid: userid })
        return res.status(200).json(fleet)
    }
    catch(error){
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

const deleteFleet = async(req, res) => {
    const {name, id} = req.body

    try{
        const fleet = await Fleet.deleteOne({_id: id})
        return res.status(200).json(fleet)
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const updateFleet = async(req, res) => {
    const {fleetid, ipaddress_new, name_new, plugins_new, agents_new} = req.body
    filter = {_id : fleetid}
    update = {ipaddress : ipaddress_new, name : name_new, plugins: plugins_new, agents : agents_new}
    try {
        const fleet = await Fleet.findOneAndUpdate(filter, update, {
            new : true
        } )
        return res.status(200).json(fleet)
    }
    catch (error){
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports = {
    getFleets,
    createFleet,
    deleteFleet,
    updateFleet    
}