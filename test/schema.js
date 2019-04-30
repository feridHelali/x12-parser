const { X12schema } = require('../index');
const assert = require('assert');

const schema = {
    "start": "CLP", // What segment starts the group
    "terminators": ["SE"], // What segment ends the group
    "name": "2100", // What is the name of the group
    "groups": [ // Nested groups
        {
            "start": "SVC",
            "name": "2110",
        }
    ]
}

describe('X12schema', function () {
    describe('#constructor()', function () {
        const testSchema = new X12schema('005010X221A1', schema, true)
        it('Should return an instance of X12schema', function () {
            assert(testSchema instanceof X12schema);
        });
        it('Should be able to get version', function () {
            assert.strictEqual(testSchema.version, '005010X221A1');
        });
        it('Should be able to get schema', function () {
            assert.deepStrictEqual(testSchema.schema, schema);
        });
        it('Should be able to get default', function () {
            assert.strictEqual(testSchema.default, true);
        });
    });
    describe('#verifySchema()', function () {
        it('Should return the schema if valid', function () {
            assert.deepStrictEqual(X12schema.verifySchema(schema), schema)
        });
        it('Should require a start of the group', function () {
            assert.throws(() => X12schema.verifySchema('garbage', Error));
        });
        it('Should verify all nested groups have a start', function () {
            const testSchema = {...schema};
            delete testSchema.groups[0].start;
            assert.throws(() => X12schema.verifySchema(testSchema, Error));
        });
    });
});