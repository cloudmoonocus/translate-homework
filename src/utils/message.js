const message = {
    success: (msg) => {
        ElMessage({
            message: msg,
            grouping: true,
            showClose: true,
            type: 'success',
        })
    },
    warning: (msg) => {
        ElMessage({
            message: msg,
            grouping: true,
            showClose: true,
            dangerouslyUseHTMLString: true,
            type: 'warning',
        })
    },
    message: (msg) => {
        ElMessage({
            message: msg,
            grouping: true,
            showClose: true,
            type: 'message',
        })
    },
    error: (msg) => {
        ElMessage({
            message: msg,
            grouping: true,
            showClose: true,
            type: 'error',
        })
    },
    close: () => {
        ElMessage.closeAll()
    },
}

export default message
