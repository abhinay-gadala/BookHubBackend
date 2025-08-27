
import clientModel from "../models/clientsModel.js";

export const postClient = async (req, res) => {
   const { title, imageUrl, author, rating, status } = req.body;

    try {
        const existingUser = await clientModel.findOne({ title });
        if (existingUser) {
            return res.status(401).json({ message: "Book already exists" });
        }

        const newClient = new clientModel({ title, imageUrl, author, rating, status });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getClients = async (req, res) => {
    try {
        const clients = await clientModel.find();
        if (!clients || clients.length === 0) {
            return res.status(404).json({ message: "No clients found" });
        }
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deletewishlist = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedClient = await clientModel.findByIdAndDelete(id);
        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: "Client deleted successfully" });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}