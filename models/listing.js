const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js")
const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
//    image: {
//     type: String,
//     default: "https://images.unsplash.com/photo-Ritt3R2EB_Q?auto=format&fit=crop&w=800&q=80",
//     set: (v) => v === "" ? "https://images.unsplash.com/photo-Ritt3R2EB_Q?auto=format&fit=crop&w=800&q=80" : v,
// },
// image: {
//     type: String,
//     default: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?...',
// },
image: {
    filename: { type: String, default: 'listingimage' },
    url: { 
        type: String, 
        default: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?...'
    }
},



    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }]
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    console.log("deleted listing",listing)
    if(listing){
      await Review.deleteMany({_id: {$in:listing.reviews}})  
    }
  
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
