const router = require("express").Router(); //express router
let Employee = require("../models/employee.model"); // require the model

//first route
router.route("/").get((req, res) => {
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const mobileNumber = req.body.mobileNumber;

  const newEmployee = new Employee({
    firstName,
    lastName,
    dob,
    gender,
    mobileNumber,
  });
  newEmployee
    .save()
    .then(() => res.json("Employee added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => res.json(employee))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json("Employee deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.dob = Date.parse(req.body.dob);
      employee.gender = req.body.gender;
      employee.mobileNumber = Number(req.body.mobileNumber);

      employee
        .save()
        .then(() => res.json("Employee updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
