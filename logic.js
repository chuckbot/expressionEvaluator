const stringExp = (expression, context) => {
    Object.keys(context).map(key => {
        const type = typeof context[key]
        if (expression.includes(key)) {
            if (type == 'string') expression = expression.replace(key, `'${context[key]}'`);
            else {
                expression = expression.replace(key, context[key]);
            };
        };
    });

    const exp = Function(`return ${expression};`)();
    return exp;

};

const getTransition = (result, transitions) => {
    if (result == true) return transitions.isTrue;
    else if (result == false) return transitions.isFalse;
    else {
        return transitions.isError;
    }
};

const getResult = data => {
    const {
        expression,
        save,
        transitions,
        context
    } = data;
    let result;

    try {
        result = stringExp(expression, context);
    } catch (error) {
        result = `Uncaught ${error.name}: ${error.message}`
    }

    const transition = getTransition(result, transitions);
    result = result.toString();

    return JSON.stringify({
        [save]: result,
        transition
    });
};

module.exports = getResult;