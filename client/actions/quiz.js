import * as actionTypes from '../actionTypes'

const rand = (max) => Math.floor(max * Math.random())

const randElement = (arr) => arr[rand(arr.length)]

export const setAnswer = (answer) => ({
    type: actionTypes.SET_ANSWER,
    answer,
})

const setQuestion = (word) => ({
    type: actionTypes.SET_QUESTION,
    word,
})

export const nextQuestion = () => (dispatch, getState) => {
    const state = getState()
    const key = state.active.key
    const words = state.words[key]

    // avoid picking the same word again
    const oldWord = state.active.word
    let newWord = randElement(words)
    while (newWord == oldWord) {
        newWord = randElement(words)
    }

    dispatch(setQuestion(newWord))
}

const submitAnswer = (id, question, answer, correct) => ({
    type: actionTypes.SUBMIT_ANSWER,
    id,
    question,
    answer,
    correct,
})

export const sendAnswer = () => (dispatch, getState) => {
    const state = getState()
    const word = state.active.word
    const answer = state.active.answer

    // TODO: this assumes all questions are foreign
    const question = word.foreign
    // TODO: is this unicode safe
    const correct = answer.toLowerCase() == word.native

    dispatch(submitAnswer(word.id, question, answer, correct))
    dispatch(nextQuestion())
}