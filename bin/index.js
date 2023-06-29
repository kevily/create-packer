#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTemp_1 = require("./clis/createTemp");
const commander_1 = require("commander");
commander_1.program.argument('<dirname>', 'Create project.', dirname => createTemp_1.createTemp(dirname)).parse(process.argv);
