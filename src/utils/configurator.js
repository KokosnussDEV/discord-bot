"use strict";

let fs   = require("fs");
let path = require("path");

let log = require("./logger");

const packagefile = require("../../package.json");
const configPath  = path.resolve("config.json");

let validJson = function(obj){
    try { JSON.parse(obj); }
    catch (e){ return false; }
    return true;
};

let getconfig = function(){
    if (!fs.existsSync(configPath)){
        log.error("Config does not exist! Make sure you copy config.template.json and paste it as 'config.json'. Then configure it.");
        process.exit(1);
    }

    let jsondata;
    try { jsondata = fs.readFileSync(configPath); }
    catch (e){
        log.error("Cannot read config file: " + e);
        process.exit(1);
    }

    if (validJson(jsondata)) return JSON.parse(jsondata);

    else {
        log.error("Config is not valid JSON. Stopping...");
        process.exit(1);
    }
};

let getVersion = function(){ return packagefile.version; };
let getName    = function(){ return packagefile.name;    };

module.exports = {
    getConfig:  getconfig,
    getVersion: getVersion,
    getName:    getName
};
