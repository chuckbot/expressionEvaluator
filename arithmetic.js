const factoring = (num) => {
  if (num < 0) {
    return -1
  } else if (num == 0) {
    return 1
  } else {
    return (num * factoring(num - 1));
  }
}

const stringExp = (expression, context) => {
  Object.keys(context).map(key => {
    const type = typeof context[key]
    if (expression.includes(key)) {
      if (type == 'string') expression = expression.replace(key, `'${context[key]}'`)
      else {
        expression = expression.replace(key, context[key])
      }
    }
  })

  if (expression.charAt(expression.length - 1) === '!') {
    expression = expression.slice(0, -1)
    expression = factoring(+expression)
  }

  const exp = Function(`return ${expression};`)();
  return exp;
}

const validateResult = result => {
  if (isNaN(result)) return
  if (typeof result === 'number') return true
}

const getTransition = (result, transitions) => {
  const isValidResult = validateResult(result)
  return isValidResult ? transitions.next : transitions.error
}

const getResult = data => {
  const {
    expression,
    save,
    transitions,
    context
  } = data
  let result

  try {
    result = stringExp(expression, context)
  } catch (error) {
    result = `Uncaught ${error.name}: ${error.message}`
  }

  const transition = getTransition(result, transitions);
  result = result.toString();

  return JSON.stringify({
    [save]: result,
    transition
  })
}

module.exports = getResult;