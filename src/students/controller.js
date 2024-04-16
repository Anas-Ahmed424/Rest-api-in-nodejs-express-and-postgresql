const pool = require("../../db");
const queries = require('./queries');

const getStudents = (req,res) => {
    console.log("----- In Students Get API" )
    pool.query(queries.getStudents, (error, results) => {

        if (error) throw error;
        res.status(200).json(results.rows);
        console.log(results.rows)
    });
};

const getStudentByAge = (req, res) => {
    // const age = parseInt(req.params.age);
    const {age} = req.body;
    console.log("----- In Students get by age api" )
    pool.query(queries.getStudentByAge, [age], (error, results) => {

        if (error) throw error;
        res.status(200).json(results.rows);
        console.log(results.rows)

    });
};

const getStudentById = (req, res) => {
    console.log("----- In Students Get by id API" )
    const id = parseInt(req.params.id);
    console.log(typeof(req.params.id));
    pool.query(queries.getStudentById, [id], (error, results) => {

        if (error) throw error;
        res.status(200).json(results.rows);

    });
};

const getStudentByCount = (req,res) => {
    // const {count, id} = req.body;
    pool.query(queries.getStudents, (error, results) => {

        if (error) throw error;
        res.status(200).json({count: results.rows.length});
        console.log(results.rows);
        // console.log("count =", results.rows.length)
    });
};




//     for (count=0,count<=length.id,count++);
//     {
//        console.log(count)
//     }

//     }

//     }
// }

const addStudent = (req,res) => {
    const {name, email, age, dob } = req.body;
    //check if email exists
    console.log("----")
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            console.log("Email already exists.")
            res.send("Email already exists.");
        }
        else{
            console.log("Creating in DB now")
            //add student to db
            pool.query(
                queries.addStudent,
                [name, email, age, dob],
                (error, results) => {
                    if (error) throw error;
                res.status(201).send("Student Created Successfully!");

            } );

        }

    });
};

const postStudentByAge = (req,res) => {
    const { lower_age, higher_age } = req.body;
    //check if email exists
    console.log(lower_age)
    console.log(higher_age)
    pool.query(queries.postStudentByAge, [age], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);

    });
};


const getStudentByName = (req,res) => {
    const { name } = req.body;
    console.log("--> Inside Get By Name Api")
    console.log("Name :- ", name)
    console.log("Name :- ", `%${name}%`)
    pool.query(queries.getStudentByName, [`%${name}%`], (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
    });
};

const getStudentByDob =(req,res) => {
    const { age, is_range, lower_range_dob, higher_range_dob } = req.body;
    console.log(age)
    console.log(lower_range_dob)
    console.log(higher_range_dob)
    console.log(is_range)

    if(is_range ===  true){
        console.log("inside if")
        // query  -> data fetch based on lower and higher range
        pool.query(queries.getStudentByDob, [lower_range_dob, higher_range_dob], (error, results) => {
        res.status(200).json(results.rows);

    });
    }
    else{
        console.log("inside else")

        // age 2012
        let lower_range_dob = `${age}-01-01`
        let higher_range_dob = `${age + 1}-01-01`
        console.log(lower_range_dob)
        console.log(higher_range_dob)
        //  query  -> data fetch based on age
        pool.query(queries.getStudentByDob, [lower_range_dob, higher_range_dob], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        })
    }
 };

const getStudentByEmail = (req,res)  => {
    console.log("----> inside email")
    const {email} = req.body;
    pool.query(queries.getStudentByEmail, [email], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        console.log(results.rows)
    })
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) =>{
        const noStudentFound = !results.rows.length;
        console.log("----> checking if students exits", noStudentFound)
        if (noStudentFound) {
            res.send("Student does not exist in the database");
        } else{
            pool.query(queries.removeStudent, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Student removed successfully.");
            });

        }

    });
}



const updateStudent = (req,res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        console.log(results.rows)
        if (noStudentFound) {
            res.send("Student does not exist in the database");
        };


            pool.query(queries.updateStudent, [name, id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Student updated successfully.");
            });

    });
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
    getStudentByAge,
    postStudentByAge,
    getStudentByName,
    getStudentByDob,
    getStudentByCount,
    getStudentByEmail,
};

