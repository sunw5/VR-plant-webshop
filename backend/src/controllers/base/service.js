module.exports = (model, populateList = []) => {
  return {
    create: (entityData) => {
      delete entityData._id;
      const entity = new model(entityData);
      const error = entity.validateSync();
      if (!error) {
        return entity.save();
      }
      throw new Error(error);
    },

    findAll: () => {
      return model.find().sort({"_id":1}).populate([...populateList]).select("-__v");
    }, 

    findOne: (id) => model.findById(id).populate([...populateList]).select("-__v"),

    update: (id, updateData) => {
      const newEntity = new model(updateData);
      const error = newEntity.validateSync();
      if (!error) {
        return model.findByIdAndUpdate(id, updateData, { new: true })
      }
      throw new Error(error);
    },
      

    delete: (id) => {
      return model.findByIdAndRemove(id);
    },
  };
};
