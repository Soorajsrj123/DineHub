import Owner from '../Models/OwnerModel.js'
import User from '../Models/UserModel.js'

export const getOwners=async(req,res)=>{

    try {

        const Owners= await Owner.find()
        console.log(Owners,"all owners");
        if(!Owners) return res.status(204).send("No content available")
        return res.status(200).json({message:"success",AllOwners:Owners})

    } catch (error) {
        res.send(404).json({error:error})
    }

}

export const ActivateOwner=async(req,res)=>{

try {
   
   const id=req.params.id
  
    const dbresponse=await Owner.findByIdAndUpdate(id,{isBlocked:false})
    console.log(dbresponse,"db res");
    if(dbresponse) {
        let allOwner=await Owner.find({})
        res.status(200).send({data:allOwner})
    }
} catch (error) {
    res.status(404).json({error:error})
}

}

export const BlockOwner=async(req,res)=>{
   
try {
   
   const id=req.params.id
  
    const dbresponse=await Owner.findByIdAndUpdate(id,{isBlocked:true})
    console.log(dbresponse,"db res");
    if(dbresponse) {
        let allOwner=await Owner.find({})
        res.status(200).send({data:allOwner})
    }
} catch (error) {
    res.status(404).json({error:error})
}

}

export const getUsers=async(req,res)=>{
    try {
        console.log("here comes the call");
        const dbresponse=await User.find({})
        console.log(dbresponse,"ress>>>>>");
        if(!dbresponse) return res.status(200).json({message:"data not found",status:false})
        return res.status(200).json({message:"success",status:true,AllUsers:dbresponse})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
}