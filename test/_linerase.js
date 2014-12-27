// Generated by CoffeeScript 1.8.0
(function() {
  var assert, parseString, _cropName, _linerase;

  _linerase = (require('../lib/onvif'))._linerase;

  _cropName = (require('../lib/onvif'))._cropName;

  assert = require('assert');

  parseString = (require('xml2js')).parseString;

  describe('linerase function', function() {
    it('should handle tag', function(done) {
      return parseString('<a><b>text</b><c>text</c></a>', function(err, result) {
        assert.deepEqual(_linerase(result), {
          a: {
            b: 'text',
            c: 'text'
          }
        });
        return done();
      });
    });
    it('should handle multiply tags', function(done) {
      return parseString('<a><b>text</b><b>text</b></a>', function(err, result) {
        assert.deepEqual(_linerase(result), {
          a: {
            b: ['text', 'text']
          }
        });
        return done();
      });
    });
    it('should handle multiply tags deeply', function(done) {
      return parseString('<a><b><c>text</c><d>t</d></b><b><c>text</c><d>t</d></b></a>', function(err, result) {
        assert.deepEqual(_linerase(result), {
          a: {
            b: [
              {
                c: 'text',
                d: 't'
              }, {
                c: 'text',
                d: 't'
              }
            ]
          }
        });
        return done();
      });
    });
    it('should remove xml namespaces', function(done) {
      return parseString('<ns:a><q:b>text</q:b><c>text</c></ns:a>', function(err, result) {
        assert.deepEqual(_linerase(result), {
          a: {
            b: 'text',
            c: 'text'
          }
        });
        return done();
      });
    });
    return it('should camelcase names', function(done) {
      return parseString('<ns:Abc><q:ABC>text</q:ABC><abc>text</abc></ns:Abc>', function(err, result) {
        assert.deepEqual(_linerase(result), {
          abc: {
            ABC: 'text',
            abc: 'text'
          }
        });
        return done();
      });
    });
  });

  describe('crop function', function() {
    it('should remove xml namespaces', function() {
      return assert.equal(_cropName('ns:name'), 'name');
    });
    return it('should camelcase name remaining uppercase words', function() {
      assert.equal(_cropName('Abc'), 'abc');
      assert.equal(_cropName('ABC'), 'ABC');
      return assert.equal(_cropName('abc'), 'abc');
    });
  });

}).call(this);

//# sourceMappingURL=_linerase.js.map
