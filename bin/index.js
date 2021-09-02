#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Create_1 = require("./clis/Create");
const commander_1 = require("commander");
const create = new Create_1.Create();
commander_1.program.option('-c [dirname]', 'Create project.').parse(process.argv);
const options = commander_1.program.opts();
if (options.c) {
    let dirname = '';
    if (options.c !== true) {
        dirname = options.c;
    }
    create.onCreate(dirname);
}
