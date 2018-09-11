import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import { bindActionCreators } from 'redux'
import MainSection from '../components/MainSection'
import { getCompletedTodoCount } from '../selectors'
import { unstable_track as track } from "schedule/tracking";

const mapStateToProps = state => ({
  todosCount: state.todos.length,
  completedCount: getCompletedTodoCount(state)
})

const trackActions = object =>
  Object.keys(object).reduce( (memo, name) => {
    const action = object[name];
    memo[name] = (...args) => track(name, performance.now(), () => action(...args));
    return memo;
  }, {} );

const mapDispatchToProps = dispatch => ({
  actions: trackActions(bindActionCreators(TodoActions, dispatch))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection)

