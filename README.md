[![build status](https://secure.travis-ci.org/nujii/architect-validator.png)](http://travis-ci.org/nujii/architect-validator)
# architect-validator

[validator](https://github.com/chriso/node-validator) plugin for 
[architect](https://github.com/c9/architect)

## Config Format

```json
{
  "packagePath": "./node_modules/architect-validator",
  "sanitize": true
}
```

## Usage

Validate that ssssshtuff

```js
module.exports = function (options, imports, register) {

  var validator = imports.validator;

  var obj = {
    email: "this isn't an email",
    name: "My name can be whatever"
  }

  validator(obj, function(key, value){
    // throw an exception or return false
    if (key == 'email') {
      return isEmail(value);
    }
  }, function(errors){
    // Errors come back as a list of kv's
    // errors == [{key: 'email', "My name can be whatever"}]
  });

};
```
