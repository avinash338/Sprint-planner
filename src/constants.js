export const constants = {
    initialTask: {
        task: '',
        assignee: '',
        hrs: 0
    },
    initialCapacity: {
        name: '',
        days: 0
    },
    initialNote: {
        note: ''
    },
    initialDetails: {
        team_name: '',
        sprint_name: "",
        start_date: "",
        end_date: ""
    }
}

export const initialResult = {
    tasks: [constants.initialTask],
    capacities: [constants.initialCapacity],
    details: constants.initialDetails,
    notes: [constants.initialNote]
}