/*
 *  Copyright 2024 MFB Technologies, Inc.
 */

const { createDefaultEsmPreset } = require("ts-jest")

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  testEnvironment: "node",
  collectCoverageFrom: ["<rootDir>/src/**"],
  testMatch: ["<rootDir>/src/**/*.(spec|test).ts?(x)"],
  transform: {
    // TODO: finish transforms with babel to fix "SyntaxError: Cannot use import statement outside a module" error
    ...createDefaultEsmPreset().transform
  },
  moduleNameMapper: {
    "^(\\.\\.?\\/.+)\\.jsx?$": "$1"
  }
}
