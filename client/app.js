import _ from 'lodash';

const array = [1];
const other = _.concat(array, 2, [3], [[4]]);

alert(other); // [1, 2, 3, [4]]
