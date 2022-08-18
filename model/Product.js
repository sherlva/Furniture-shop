const { Schema, model } = require("mongoose");
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    img: {
        type: String,
        default: "/assets/images/collection/arrivals2.png",
    },
});
module.exports = model("products", productSchema);
