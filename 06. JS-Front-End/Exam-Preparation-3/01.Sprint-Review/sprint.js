function sprintReview(judgeInput) {
    const lines = Number(judgeInput.shift());
    const input = judgeInput.slice(0, lines);
    const commands = judgeInput.slice(lines);
    const sprintBoard = input
        .reduce((board, line) => {
            const [assignee, taskId, title, status, points] = line.split(':');
            if (!board.hasOwnProperty(assignee)) {
                board[assignee] = [];
            }

            board[assignee].push({ taskId, title, status, points: Number(points) });
            return board;
        }, {});

    const commandParser = {
        'Add New': addNewTask,
        'Change Status': changeStatus,
        'Remove Task': removeTask,
    }

    commands
        .forEach((line) => {
            const commandTokens = line.split(':');
            commandParser[commandTokens[0]](...commandTokens.slice(1));
        });

    const toDoPoints = getTotalPointsForStatus('ToDo');
    const inProgresPoints = getTotalPointsForStatus('In Progress');
    const codeReviewPoints = getTotalPointsForStatus('Code Review');
    const donePoints = getTotalPointsForStatus('Done');
    console.log(`ToDo: ${toDoPoints}pts`);
    console.log(`In Progress: ${inProgresPoints}pts`);
    console.log(`Code Review: ${codeReviewPoints}pts`);
    console.log(`Done Points: ${donePoints}pts`);
    const unfinishedPointsSum = toDoPoints + inProgresPoints + codeReviewPoints;

    if (donePoints >= unfinishedPointsSum) {
        console.log('Sprint was successful!');
    } else {
        console.log('Sprint was unsuccessful...')
    }

    function addNewTask(assignee, taskId, title, status, points) {
        if (checkIfAssigneeExists(assignee)) {
            sprintBoard[assignee].push({ taskId, title, status, points: Number(points) })
        }
    }

    function changeStatus(assignee, taskId, newStatus) {
        if (checkIfAssigneeExists(assignee) && checkIfTaskIdExists(assignee, taskId)) {
            const task = sprintBoard[assignee].find((t) => t.taskId === taskId);
            task.status = newStatus;
        }
    }

    function removeTask(assignee, index) {
        index = Number(index);
        if (checkIfAssigneeExists(assignee) && checkIfIndexIsValid(sprintBoard[assignee], index)) {
            sprintBoard[assignee].splice(index, 1);
        }
    }

    function checkIfAssigneeExists(assignee) {
        const isExisting = sprintBoard.hasOwnProperty(assignee);
        if (!isExisting) {
            console.log(`Assignee ${assignee} does not exist on the board!`);
        }

        return isExisting;
    }

    function checkIfTaskIdExists(assignee, taskId) {
        const assigneeTasks = sprintBoard[assignee];
        const isExisting = assigneeTasks.some((task) => task.taskId === taskId);

        if (!isExisting) {
            console.log(`Task with ID ${taskId} does not exist for ${assignee}!`);
        }

        return isExisting;
    }

    function checkIfIndexIsValid(tasks, index) {
        const isValid = index >= 0 && index < tasks.length;
        if (!isValid) {
            console.log('Index is out of range!');
        }

        return isValid;
    }

    function getTotalPointsForStatus(status) {
        return Object.values(sprintBoard)
            .reduce((totalPointsSum, tasks) => {
                return totalPointsSum + tasks
                    .filter((t) => t.status === status)
                    .map((t) => t.points)
                    .reduce((a, b) => a + b, 0);
            }, 0);
    }
}

sprintReview([
    '5',
    'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
    'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
    'Peter:BOP-1211:POC:Code Review:5',
    'Georgi:BOP-1212:Investigation Task:Done:2',
    'Mariya:BOP-1213:New Account Page:In Progress:13',
    'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
    'Change Status:Peter:BOP-1290:ToDo',
    'Remove Task:Mariya:1',
    'Remove Task:Joro:1',
    ]);