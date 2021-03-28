module.exports = mongoose => {
    const Mobile = mongoose.model(
      "Mobile",
      mongoose.Schema(
        {
          brand: String,
          model: String,
          battery: String,
          colour: String
        },
        { timestamps: true }
      )
    );
  
    return Mobile;
  };