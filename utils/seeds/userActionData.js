const addActions = (count, code, achievementCode) => {
  const actions = []
  for (let x = 0; x < count; x += 1) {
    const action = {
      actionCode: code,
    }

    if (achievementCode) action.achievementCode = achievementCode
    actions.push(action)
  }
  return actions
}

module.exports = [
  ...addActions(15, 'AL001'),
  ...addActions(3, 'AL002'),
  ...addActions(3, 'AL003'),
  ...addActions(2, 'AL004'),
  ...addActions(2, 'AL005'),
  ...addActions(4, 'FA001'),
  ...addActions(1, 'LI001'),
  ...addActions(1, 'SP001'),
  ...addActions(1, 'AC001', 'YR001'),
  ...addActions(1, 'AC101', 'AL001'),
  ...addActions(1, 'AC102', 'AL002'),
  ...addActions(1, 'AC103', 'AL003'),
  ...addActions(1, 'AC104', 'AL004'),
  ...addActions(1, 'AC105', 'AL005'),
  ...addActions(1, 'AC106', 'AL006'),
]
