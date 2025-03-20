import collegeInfoModel from "../../models/collegeModels/collegeInfo.model";
module.exports.choices = (req,res,next) => {
  const user = req.user;
  if(user.advRank){
    const choices = collegeInfoModel.find().select('collegeName branches : {branchDetails}');
    res.status(200).json({success:true,choices:choices});
  }
}