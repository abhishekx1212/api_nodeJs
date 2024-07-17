const user = require("../model/usrTbl");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getData = (req,res)=>{
  let { token } = req.cookies;
  if(token){
  var decoded = jwt.verify(token, "it's private");
  console.log(decoded);
  return res.status(200).send(decoded)
}else{
  console.log("token not found!!");
  return res.status(500).send("token not found!!") 
}
}

const login = async (req, res) => {
  try {
    const { UserName, email, password } = req.body;
    let User = await user.findOne({ UserName: UserName });
    if (User) {
      const match = await bcrypt.compare(password, User.password);
      if (match) {
        console.log("login successfully");
        let payload = {
          UserName: User.UserName,
          email: User.email,
        };

        var token = jwt.sign(payload, "it's private");
        console.log(token);
        return res.status(200).cookie("token", token).send("login sucessfully");
      } else {
        console.log("wrong password");
        return res.status(500).send("wrong password");
      }
    } else {
      console.log("wrong Username");
      return res.status(500).send("wrong Username");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const { UserName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    let data = await user.create({ UserName, email, password: hashedPassword });
    console.log("data inserted..");
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send('User not created'); // Redirecting back to signin page on error
  }
};

const dataUpdate = async(req,res)=>{
  let id = req.params.id;
  let { UserName, email, password } = req.body;
  try {
    let data = await user.findByIdAndUpdate(id, { UserName, email, password }); 
    console.log("Data Updated");
    return res.status(200).send(`data updated ${data}`);
  } catch (error) {
    console.log(error);
    return  res.status(500).send(error);
  }
}

const deleteData = async (req, res) => {
  let id = req.params.id;
  try {
    let data = await user.findByIdAndDelete(id);
    console.log("Data deleted");
    return res.status(200).send(`data deleted ${data}`);
  } catch (error) {
    console.log(error);
    return res.status(500).res.send(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send('cookie cleared');
};

module.exports = { create, login, logout, dataUpdate, deleteData, getData };
