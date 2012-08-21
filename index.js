
module.exports = function(options, imports, register) {

  var _ = require('underscore');
  var sanitizer = require('validator').sanitize;

  options = _.defaults(options, {sanitize: true});

  var validate = function(data, reduce, done, sanitize) {
    
    if (_.isUndefined(sanitize)) {
      sanitize = options.sanitize;
    }

    var errors =
      _.chain(data)
        .map(function(value, key) {
          if(sanitize) {
            value = sanitizer(value).xss();  
          }
          return {key: key, value: value};
        })
        .reduce(function(memo, input) {
          try {
            var result = reduce(input.key, input.value);
            if (result == false) memo.push(input);
          }
          catch(e) {
            if (!memo) memo=[];
            memo.push(input);
          }
          return memo;
        }, false)
        .value();

    done(errors);
  }

  register(null, {validator: validate});
}
