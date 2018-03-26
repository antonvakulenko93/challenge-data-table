var React = require('react');
var ReactPivot = require('react-pivot');
var createReactClass = require('create-react-class');

var rows = require('./data.json');

var defaultCol = ['date', 'host'];

function reduce (row, memo) {
  memo.displays = row.type == 'display' ? (memo.displays || 0) + 1 : memo.displays;
  memo.loads = row.type == 'load' ? (memo.loads || 0) + 1 : memo.loads;
  memo.impressions = row.type == 'impression' ? (memo.impressions || 0) + 1 : memo.impressions;
  memo.loadRate = (memo.loads / memo.impressions * 100).toFixed(1);
  memo.displayRate = (memo.displays / memo.loads * 100).toFixed(1);
  
  return memo
}

var dimensions = [
  {value: 'host', title: 'host'},
  {value: 'date', title: 'date'}
]

var calculations = [
  { title: 'Displays', value: 'displays' },
  { title: 'Impressions', value: 'impressions' },
  { title: 'Loads', value: 'loads' },
  { title: 'Load Rate', value: 'loadRate',
    template: (val) => `${val}%`
  }, {
    title: 'Display Rate', value: 'displayRate',
    template: (val) => `${val}%`
  }
]

module.exports = createReactClass({
  render () {
    return <div>
      <ReactPivot rows={rows}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
        activeDimensions={defaultCol}/>,
    </div>
   
  }
})
