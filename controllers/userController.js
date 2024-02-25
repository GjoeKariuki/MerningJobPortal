const User = require("../models/userModels")
const ErrorResponse = require("../utils/errorResponse")


// load all users
exports.allUsers = async(req,res,next) => {
    // pagination setup
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1
    const count = await User.find({}).estimatedDocumentCount()
    try {
        const users = await User.find().sort({createdAt: -1}).select('-pasword')
            .skip(pageSize * (page -1))
            .limit(pageSize)
        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count/pageSize),
            count
        })
        next()
    } catch (error) {
        return next(error)
    }
}


// show single user
exports.singleUser = async(req,res,next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next()
    } catch (error) {
        return  next(error)
    }
}

// edit
exports.editUser = async(req,res,next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
            success: true,
            user
        })
        next()
    } catch (error) {
        return  next(error)
    }
}
// delete
exports.deleteUser = async(req,res,next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "user deleted"
        })
        next()
    } catch (error) {
        return  next(error)
    }
}