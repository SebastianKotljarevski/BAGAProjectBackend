/*
* Objects
* Router for getting all static objects from the database
*/

// Load dependencies
const express               = require("express");
const router                = new express.Router();
const dbHandler             = require('../src/dbWrapper.js');
const projectHandler        = require('../src/handleProjects.js');
const jwtAuth               = require('../src/jwtAuthentication.js');


// get all projects
router.get("/all", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(projectHandler.getProjects,
        [user._id]);

    res.json(data);
});

// get specific project
router.get("/id/:projectId", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(projectHandler.getProject,
        [req.params.projectId, user._id]);

    res.json(data);
});

//get specific project data
router.get("/data/:projectId", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(projectHandler.getProjectData,
        [req.params.projectId, user._id]);

    res.json(data);
});

//get specific project info
router.get("/info/:projectId", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(projectHandler.getProjectInfo,
        [req.params.projectId, user._id]);

    res.json(data);
});

//insert new project
router.post("/insert", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(projectHandler.insertProject,
        [req.body, user._id]);

    res.json(data);
});

//delete project
router.get("/delete/:projectId", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(projectHandler.deleteProject,
        [req.params.projectId, user._id]);

    res.json(data);
});

//update project info
router.post("/update/info/:projectId", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(projectHandler.updateProject,
        [req.body, req.params.projectId, user._id]);

    res.json(data);
});

//update project data
router.post("/update/data/:projectId", async (req, res) => {
    let user = jwtAuth.verify(req.query.token);
    let data = await dbHandler.dbConnectPipe(projectHandler.updateProjectData,
        [req.body, req.params.projectId, user._id]);

    res.json(data);
});

module.exports = router;
