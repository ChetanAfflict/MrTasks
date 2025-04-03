const  express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/studentDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const studentSchema=new mongoose.Schema({
    name:String,
    age:Number,
    course:String
});

const Student=mongoose.model("Student", studentSchema);

//create 
app.post("/students",async(req,res)=>{
    try{
        const student=new Student(req.body);
        await student.save();
        res.status(201).send(student);
    }catch(error){
        res.status(400).send(error);
    }
});

//get all 
app.get("/students",async(req,res)=>{
    const students=await Student.find();
    res.send(students);
});

//get one
app.get("/students/:id",async(req,res)=>{
   try{
    const student=await Student.findById(req.params.id);
    if(!student) return res.status(404).send();
    res.send(student);
   }catch(error){
    res.status(500).send(error);
   }
});


// Update student
app.put("/students/:id", async (req, res) => { 
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).send();
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete student
app.delete("/students/:id", async (req, res) => { 
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).send();
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});


