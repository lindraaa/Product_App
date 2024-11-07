import Product from "../models/product_model.js"
import mongoose from "mongoose";

export const getProducts= async (req, res) => {
    try {
        const products = await Product.find({})
        if (products.length == 0) res.send("No available products");
        res.status(201).json({ success: true, data: products })
    }catch(err){
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const addProduct =  async (req, res) => {
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" })
    }
    else {
        const newProduct = new Product(product)
        try {
            await newProduct.save()
            res.status(201).json({ success: true, data: newProduct })
        } catch (err) {
            console.log("Errror in creating data", err.message)
            res.status(500).json({ success: false, message: "Server Error" })

        }
    }
}
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){//product check is not valid
        return res.status(404).json({success: false, message:"Invalid Product ID"});
    }
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" })

        } else {
            return res.status(200).json({ success: true, message: "Product Deleted" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" })
    }

}
export const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const productdetails = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){//product check is not valid
        return res.status(404).json({success: false, message:"Invalid Product ID"});
    }
    try{
        await Product.findByIdAndUpdate(id,productdetails,{new:true})
        res.status(200).json({ success: true, message: "Product Updated" })
    }catch(err){
        res.status(404).json({success:false, message:"Server Error"})

    }
}