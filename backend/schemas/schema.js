import createSchema from 'part:@sanity/base/schema-creator';
import publication from './publication';
import nugget from './nugget';
import topics from './topics';
import person from './person';

export default createSchema({
  name: 'default',
  types: [
    nugget,
    topics,
    person,
    publication,
    term,
]
})