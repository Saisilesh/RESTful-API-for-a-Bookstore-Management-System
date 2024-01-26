import user from "../model/user-model";

import jwt  from "jsonwebtoken";

export const signup  = async(req,res,next) => {
    const {name,email,password} = req.body; //destructuring the data
    //finding if the user already exists
    let existingUser;
    try {
        existingUser = await user.findOne({email});
    }
    catch (err){
        return console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message: "User already exist"});

    }
    //else we are creating the new user
    const newUser = new user({
        name,
        email,
        password,
    });

    try {
        await newUser.save(); //helps to save the values 
    }
    catch(err) {
        return console.log(err);
    }

    return res.status(201).json({newUser});
};

export const login = async(req,res,next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
      }
      const existUser = await user.findOne({ email });
      //compare password with hashedpassword
      if (existUser && password == existUser.password) {
        const accessToken = jwt.sign(
          {
            existUser: {
              username: existUser.username,
              email: existUser.email,
              id: existUser.id,
            },
          },
          "farmhouseAI",
          { expiresIn: "30m" }
        );
        res.status(200).json({ accessToken });
      } else {
        res.status(401);
        throw new Error("email or password is not valid");
      }
}